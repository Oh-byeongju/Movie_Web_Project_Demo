/*
  23-03-17 마이페이지에 있는 영화 관련 메소드 생성(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.CommentInfoDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.error.exception.BusinessException;
import com.movie.Spring_backend.error.exception.ErrorCode;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.MovieCommentMapper;
import com.movie.Spring_backend.mapper.MovieMapper;
import com.movie.Spring_backend.repository.CommentInfoRepository;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.repository.MovieMemberRepository;
import com.movie.Spring_backend.repository.MovieRepository;
import com.movie.Spring_backend.util.SecurityUtil;
import io.netty.channel.SimpleUserEventChannelHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.sql.Array;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MyPageMovieService {

    private final MovieInfoRepository movieInfoRepository;
    private final MovieRepository movieRepository;
    private final MovieMemberRepository movieMemberRepository;
    private final CommentInfoRepository commentInfoRepository;
    private final MovieMapper movieMapper;
    private final MovieCommentMapper movieCommentMapper;
    private final JwtValidCheck jwtValidCheck;

    // 사용자가 관람평을 작성할 수 있는 영화 목록을 불러오는 메소드
    @Transactional
    public List<MovieDto> MoviePossibleGet(HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // authentication 객체에서 아이디 확보
        String currentMemberId = SecurityUtil.getCurrentMemberId();

        // JPA를 사용하기 위해 현재 아이디를 entity형으로 변환
        MemberEntity member = MemberEntity.builder().uid(currentMemberId).build();

        // 사용자의 관람이 끝난 영화 정보를 조회
        List<MovieInfoEntity> MovieInfos = movieInfoRepository.findMemberPossible(member);

        // 관람이 끝난 영화가 없을 경우 예외처리
        if (MovieInfos.isEmpty()) {
            throw new MovieNotFoundException("관람된 영화 정보가 없습니다.");
        }

        // 사용자가 작성한 관람평 목록 조회
        List<MovieMemberEntity> MovieMembers = movieMemberRepository.findByUmcommentIsNotNullAndMember(member);

        // 관람평을 이미 적은 영화의 ID 추출
        List<Long> MovieIDCheck = new ArrayList<>();
        for (MovieMemberEntity MM : MovieMembers) {
            MovieIDCheck.add(MM.getMovie().getMid());
        }

        // 관람이 끝난 영화 정보들 중 관람평을 작성하지 않은 영화 ID를 HashSet으로 변환(중복 제거)
        Set<Long> MovieID = new HashSet<>();
        for (MovieInfoEntity MI : MovieInfos) {
            if (!MovieIDCheck.contains(MI.getMovie().getMid())) {
                MovieID.add(MI.getMovie().getMid());
            }
        }

        // 관람평을 작성하지 않은 영화 ID를 이용하여 영화 튜플 검색 (관람객 평점 기준으로 내림차순)
        List<MovieEntity> Movies = movieRepository.findMoviesScoreDESC(MovieID);

        // 영화 테이블에서 현재 예매가 가능한 영화들 조회
        List<MovieEntity> MovieReserve = movieRepository.findShowMoviesReserve();

        // 예매가 가능한 영화들의 전체 예매 횟수(예매율 계산시 나누기 할때 사용)
        float cnt = 0;
        for (MovieEntity m : MovieReserve) {
            cnt += m.getCntReserve();
        }
        // 람다식에서 사용하기 위해 final 선언
        final float Cnt = cnt;

        // 예매가 가능한 영화 ID를 List로 변환
        // Mapper에서 Screen true, false를 위해 사용
        MovieIDCheck.clear();
        for (MovieEntity M : MovieReserve) {
            MovieIDCheck.add(M.getMid());
        }

        return Movies.stream().map(Movie ->
                movieMapper.toDtoMyPage(Movie, MovieIDCheck.contains(Movie.getMid()), Cnt)).collect(Collectors.toList());
    }

    // 사용자가 마이페이지에서 관람평을 작성할 경우 실행되는 메소드
    @Transactional
    public void MovieCommentWrite(Map<String, String> requestMap, HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // authentication 객체에서 아이디 확보
        String currentMemberId = SecurityUtil.getCurrentMemberId();

        // requestMap 안에 정보를 추출
        String Movie_id = requestMap.get("mid");
        String Movie_comment = requestMap.get("mcomment");
        String Movie_score = requestMap.get("mscore");

        // JPA를 사용하기 위해 현재 아이디와 Movie_id를 entity형으로 변환
        MemberEntity member = MemberEntity.builder().uid(currentMemberId).build();
        MovieEntity movie = MovieEntity.builder().mid(Long.valueOf(Movie_id)).build();

        // MovieMember table에 튜플의 존재 여부를 먼저 파악
        MovieMemberEntity MovieMember = movieMemberRepository.findByMovieAndMember(movie, member).orElse(null);

        // MovieMember table에 이미 작성한 관람평이 존재할 경우 예외처리
        if (MovieMember != null && MovieMember.getUmcomment() != null) {
            throw new BusinessException("작성된 관람평이 존재합니다.", ErrorCode.COMMENT_IS_EXIST);
        }

        // 현재 시간을 sql에 사용할 수 있게 매핑
        Date nowDate = new Date();
        SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String day = DateFormat.format(nowDate);

        // 관람평을 쓰는 사용자가 영화에 대한 좋아요 기록이 있을 경우
        if (MovieMember != null && MovieMember.getUmlike() != null) {
            // MovieMember 테이블의 내용을 update
            movieMemberRepository.MovieCommentUpdate(Integer.parseInt(Movie_score), Movie_comment, member, movie);
        }
        // 관람평을 쓰는 사용자가 영화에 대한 좋아요 기록이 없을 경우
        else {
            // 튜플 생성 후 삽입
            MovieMember = MovieMemberEntity.builder()
                    .umcomment(Movie_comment)
                    .umscore(Integer.valueOf(Movie_score))
                    .umcommenttime(day)
                    .movie(movie)
                    .member(member).build();
            movieMemberRepository.save(MovieMember);
        }
    }

    // 마이페이지에서 작성한 관람평을 조회하는 메소드
    @Transactional
    public List<CommentInfoDto> MovieCommentSearch(HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // authentication 객체에서 아이디 확보
        String currentMemberId = SecurityUtil.getCurrentMemberId();

        // JPA를 사용하기 위해 현재 아이디를 entity형으로 변환
        MemberEntity member = MemberEntity.builder().uid(currentMemberId).build();

        // 사용자가 작성한 관람평 목록 조회(영화 내용까지 들고옴)
        List<MovieMemberEntity> MovieMembers = movieMemberRepository.findByUmcommentIsNotNullAndMemberOrderByUmcommenttimeDesc(member);

        // 사용자가 좋아요 누른 영화 관람평 검색
        List<CommentInfoEntity> CommentLikes = commentInfoRepository.findByMember(member);

        // 좋아요 누른 관람평 목록의 관람평 기본키를 List로 변환
        List<Long> CommentLikeList = new ArrayList<>();
        for (CommentInfoEntity CI : CommentLikes) {
            CommentLikeList.add(CI.getMoviemember().getUmid());
        }

        // 관람평 목록과 좋아요 기록을 mapping 후 리턴
        return MovieMembers.stream().map(MovieMember ->
                movieCommentMapper.toDtoMyPage(MovieMember, CommentLikeList.contains(MovieMember.getUmid()))).collect(Collectors.toList());
    }

    // 사용자가 좋아요 누른 영화 불러오는 메소드
    @Transactional
    public List<MovieDto> MovieLikeGet(HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // authentication 객체에서 아이디 확보
        String currentMemberId = SecurityUtil.getCurrentMemberId();

        // JPA를 사용하기 위해 현재 아이디를 entity형으로 변환
        MemberEntity member = MemberEntity.builder().uid(currentMemberId).build();

        // 사용자가 좋아요 누른 영화 목록 검색
        List<MovieEntity> Movies = movieRepository.findMemberLikeMovieDESC(member);

        // 영화 테이블에서 현재 예매가 가능한 영화들 조회
        List<MovieEntity> MovieReserve = movieRepository.findShowMoviesReserve();

        // 예매가 가능한 영화들의 전체 예매 횟수(예매율 계산시 나누기 할때 사용)
        float cnt = 0;
        for (MovieEntity m : MovieReserve) {
            cnt += m.getCntReserve();
        }
        // 람다식에서 사용하기 위해 final 선언
        final float Cnt = cnt;

        // 예매가 가능한 영화 ID를 List로 변환
        // Mapper에서 Screen true, false를 위해 사용
        List<Long> MovieIDCheck = new ArrayList<>();
        for (MovieEntity M : MovieReserve) {
            MovieIDCheck.add(M.getMid());
        }

        return Movies.stream().map(Movie ->
                movieMapper.toDtoMyPage(Movie, MovieIDCheck.contains(Movie.getMid()), Cnt)).collect(Collectors.toList());
    }
}



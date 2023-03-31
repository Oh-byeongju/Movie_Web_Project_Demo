/*
  23-03-27 관리자 페이지 사용자 관리 구현(오병주)
  23-03-28 ~ 30 관리자 페이지 사용자 예매 현황 구현(오병주)
  23-03-31 관리자 페이지 관람평 관리 구현(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.*;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.exceptionlist.IdDuplicateException;
import com.movie.Spring_backend.exceptionlist.MovieCommentNotFoundException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.MovieCommentMapper;
import com.movie.Spring_backend.mapper.MovieMapper;
import com.movie.Spring_backend.mapper.ReservationMapper;
import com.movie.Spring_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ManagerMemberService {

    private final MemberRepository memberRepository;
    private final MovieRepository movieRepository;
    private final TheaterRepository theaterRepository;
    private final ReservationRepository reservationRepository;
    private final MovieMemberRepository movieMemberRepository;
    private final MovieMapper movieMapper;
    private final ReservationMapper reservationMapper;
    private final MovieCommentMapper movieCommentMapper;
    private final JwtValidCheck jwtValidCheck;

    // 유저 조회 메소드
    @Transactional
    public List<MemberDto> AllMemberSearch(HttpServletRequest request, Map<String, String> requestMap) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        List<MemberEntity> Members;
        // 사용자를 이름순으로 정렬후 조회(검색된 단어 포함)
        if (requestMap.get("sort").equals("name")) {
            Members = memberRepository.findByUidContainingOrderByUnameAsc(requestMap.get("search"));
        }
        // 사용자를 가입순으로 정렬후 조회(검색된 단어 포함)
        else {
            Members = memberRepository.findByUidContainingOrderByUjoindateAsc(requestMap.get("search"));
        }

        // 필요한 정보를 dto로 매핑 후 리턴
        return Members.stream().map(member -> MemberDto.builder()
                        .uid(member.getUid())
                        .uname(member.getUname())
                        .uemail(member.getUemail())
                        .utel(member.getUtel())
                        .uaddr(member.getUaddr())
                        .uaddrsecond(member.getUaddrsecond())
                        .ubirth(member.getUbirth())
                        .ujoindate(member.getUjoindate()).build()).collect(Collectors.toList());
    }

    // 유저 추방 메소드
    @Transactional
    public void DropMember(HttpServletRequest request, String uid) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 사용자 테이블에서 사용자 제거(연관된 DB 내용은 CascadeType.REMOVE 때문에 연쇄 삭제)
        memberRepository.deleteById(uid);
    }

    // 전체 영화 불러오는 메소드
    @Transactional
    public List<MovieDto> AllMovieSearch(HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 영화 테이블에 존재하는 모든 영화 검색(개봉일순으로 오름차순)
        List<MovieEntity> Movies = movieRepository.findAllByOrderByMdateAsc();

        // 영화 테이블에서 현재 예매가 가능한 영화들 조회
        List<MovieEntity> MoviePossible = movieRepository.findShowMoviesReserve();

        // 예매가 가능한 영화들의 전체 예매 횟수(예매율 계산시 나누기 할때 사용)
        float cnt = 0;
        for (MovieEntity m : Movies) {
            cnt += m.getCntReserve();
        }

        // 람다식에서 사용하기 위해 final 선언
        final float Cnt = cnt;

        // 예매가 가능한 영화의 기본키를 List로 변환
        List<Long> MoviePossibleList = new ArrayList<>();
        for (MovieEntity m : MoviePossible) {
            MoviePossibleList.add(m.getMid());
        }

        // 위에서 검색한 영화 목록과 예매 가능 여부, 전체 예매 횟수를 mapping 후 리턴
        return Movies.stream().map(movie ->
                movieMapper.toDtoManagerReserve(movie, MoviePossibleList.contains(movie.getMid()), Cnt)).collect(Collectors.toList());
    }

    // 전체 극장 불러오는 메소드
    @Transactional
    public List<TheaterDto> AllTheaterSearch(HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 모든 극장 검색
        List<TheaterEntity> Theaters = theaterRepository.findAll();

        // 검색한 극장 리턴
        return Theaters.stream().map(theater -> TheaterDto.builder()
                        .tid(theater.getTid())
                        .tname(theater.getTname())
                        .taddr(theater.getTaddr())
                        .tarea(theater.getTarea()).build()).collect(Collectors.toList());
    }

    // 특정 영화의 예매기록을 불러오는 메소드
    @Transactional
    public Page<ReservationDto> MovieReserveSearch(HttpServletRequest request, Long mid, Integer page, Integer size) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, size);

        // JPA 사용을 위한 형 변환
        MovieEntity movie = MovieEntity.builder().mid(mid).build();

        // 특정 영화의 모든 예매기록 검색(예매일 순으로 내림차순)
        Page<ReservationEntity> Reservations = reservationRepository.findManagerReserveMovie(movie, PageInfo);

        // 예매기록을 매핑 후 리턴
        return Reservations.map(reservationMapper::ManagerListMappingMovie);
    }

    // 특정 극장의 예매기록을 불러오는 메소드
    @Transactional
    public Page<ReservationDto> TheaterReserveSearch(HttpServletRequest request, Long tid, Integer page, Integer size) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, size);

        // JPA 사용을 위한 형 변환
        TheaterEntity theater = TheaterEntity.builder().tid(tid).build();

        // 특정 극장의 예매기록 검색(예매일 순으로 내림차순)
        Page<ReservationEntity> Reservations = reservationRepository.findManagerReserveTheater(theater, PageInfo);

        // 예매기록을 매핑 후 리턴
        return Reservations.map(reservationMapper::ManagerListMappingTheater);
    }

    // 특정 영화에 있는 관람평을 가져오는 메소드
    @Transactional
    public Page<CommentInfoDto> MovieCommentSearch(HttpServletRequest request, Long mid, Integer page, Integer size) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 페이지네이션을 위한 정보
        PageRequest PageInfo = PageRequest.of(page, size);

        // 영화 id 정보를 entity 형으로 변환
        MovieEntity movie = MovieEntity.builder().mid(mid).build();

        // 영화 id를 기반으로 MovieMember table 검색(최신순)
        Page<MovieMemberEntity> MovieMembers = movieMemberRepository.findByMovieAndUmcommentIsNotNullOrderByUmcommenttimeDesc(movie, PageInfo);

        // 관람평 목록과 좋아요 기록을 mapping 후 리턴
        return MovieMembers.map(MovieMember -> movieCommentMapper.toDto(MovieMember, false));
    }
}

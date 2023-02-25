/*
  23-02-09 로그인한 유저가 영화에 관련된 행위를 할때 사용되는 Service 구현(오병주)
  23-02-13 관람평 작성 메소드 구현(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.CommentInfoDto;
import com.movie.Spring_backend.entity.CommentInfoEntity;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieMemberEntity;
import com.movie.Spring_backend.exceptionlist.MovieCommentNotFoundException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.repository.CommentInfoRepository;
import com.movie.Spring_backend.repository.MovieMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class MovieMemberService {

    private final MovieMemberRepository movieMemberRepository;
    private final CommentInfoRepository commentInfoRepository;
    private final JwtValidCheck jwtValidCheck;

    // 사용자가 영화 좋아요를 누를 때 실행되는 메소드
    @Transactional
    public void MovieLikeUpdate(Map<String, String> requestMap, HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 안에 정보를 추출
        String User_id = requestMap.get("uid");
        String Movie_id = requestMap.get("mid");
        String like = requestMap.get("mlike");

        // JPA를 사용하기 위해 Movie_id 와 User_id 를 entity형으로 변환
        MovieEntity movie = MovieEntity.builder().mid(Long.valueOf(Movie_id)).build();
        MemberEntity member = MemberEntity.builder().uid(User_id).build();

        // like가 true면 이미 튜플이 존재하므로 update 쿼리 실행
        if (like.equals("true")) {
            movieMemberRepository.MovieLikeChangeFalse(member, movie);
        }
        else {
            // like가 거짓이면 튜플의 존재 여부를 먼저 파악
            MovieMemberEntity MovieMember = movieMemberRepository.findByMovieAndMember(movie, member).orElse(null);

            // 튜플이 존재하지 않는 경우 entity를 가공 후 insert 쿼리 실행
            if (MovieMember == null) {
                MovieMember = MovieMemberEntity.builder()
                        .umlike(true)
                        .movie(movie)
                        .member(member).build();
                movieMemberRepository.save(MovieMember);
            }
            // 튜플이 존재하는 경우 좋아요 기록을 바꾸는 update 쿼리 실행
            else {
                movieMemberRepository.MovieLikeChangeTrue(member, movie);
            }
        }
    }

    // 사용자가 관람평 작성을 할 때 실행되는 메소드
    @Transactional
    public void MovieCommentInsert(Map<String, String> requestMap, HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // requestMap 안에 정보를 추출
        String User_id = requestMap.get("uid");
        String Movie_id = requestMap.get("mid");
        String Movie_comment = requestMap.get("mcomment");
        String Movie_score = requestMap.get("mscore");

        // JPA를 사용하기 위해 Movie_id 와 User_id 를 entity형으로 변환
        MovieEntity movie = MovieEntity.builder().mid(Long.valueOf(Movie_id)).build();
        MemberEntity member = MemberEntity.builder().uid(User_id).build();

        // MovieMember table에 튜플의 존재 여부를 먼저 파악
        MovieMemberEntity MovieMember = movieMemberRepository.findByMovieAndMember(movie, member).orElse(null);

        // 현재 날짜 구하기 (yyyy-mm-dd) 날짜 가공부터 하면 될듯 내일 ((( 예매 끝나거 수정해라우 )))
        String pattern = "yyyy-mm-dd";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);






//        if (MovieMember == null) {
//            MovieMember = MovieMemberEntity.builder()
//                    .umcomment(Movie_comment)
//                    .umscore(Integer.valueOf(Movie_score))
//                    .movie(movie)
//                    .member(member).build();
//            movieMemberRepository.save(MovieMember);
//        }
//        else {
//
//        }
//
//
//        // like가 true면 이미 튜플이 존재하므로 update 쿼리 실행
//        if (like.equals("true")) {
//            movieMemberRepository.MovieLikeChangeFalse(member, movie);
//        }
//        else {
//
//
//            // 튜플이 존재하지 않는 경우 entity를 가공 후 insert 쿼리 실행
//
//            // 튜플이 존재하는 경우 좋아요 기록을 바꾸는 update 쿼리 실행
//            else {
//                movieMemberRepository.MovieLikeChangeTrue(member, movie);
//            }
//        }
    }

    // 사용자가 관람평 좋아요를 누를 때 실행되는 메소드
    @Transactional
    public void CommentLikeUpdate(CommentInfoDto commentInfoDto, HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // commentInfoDto 안에 정보를 추출
        String User_id = commentInfoDto.getUid();
        Long MovieMember_id = commentInfoDto.getUmid();
        boolean like = commentInfoDto.getLike();

        // 관람평 id를 이용해서 관람평 튜플 검색
        MovieMemberEntity ExceptionMovieMember = movieMemberRepository.findById(MovieMember_id).orElse(null);

        // 예외처리
        if (ExceptionMovieMember == null) {
            throw new MovieCommentNotFoundException("정보가 존재하지 않습니다.");
        }

        // JPA를 사용하기 위해 User_id 와 MovieMember_id 를 entity형으로 변환
        MemberEntity Member = MemberEntity.builder().uid(User_id).build();
        MovieMemberEntity MovieMember = MovieMemberEntity.builder().umid(MovieMember_id).build();

        // like가 true면 이미 튜플이 존재하므로 delete 쿼리 실행
        if (like) {
            commentInfoRepository.deleteByMemberAndMoviemember(Member, MovieMember);
        }
        // like가 false면 튜플을 insert
        else {
            // Entity 생성후 insert
            CommentInfoEntity commentInfo = CommentInfoEntity.builder()
                    .member(Member)
                    .moviemember(MovieMember).build();
            commentInfoRepository.save(commentInfo);
        }
    }

    // 사용자가 관람평을 삭제할 때 실행되는 메소드
    @Transactional
    public void CommentDelete(Long umid, HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 관람평 id를 이용해서 관람평 튜플 검색
        MovieMemberEntity MovieMember = movieMemberRepository.findById(umid).orElse(null);

        // 예외처리
        if (MovieMember == null) {
            throw new MovieCommentNotFoundException("정보가 존재하지 않습니다.");
        }

        // 사용자가 영화에 대한 좋아요 기록이 있을 경우 MovieMember 테이블의 튜플을 제거 한 뒤
        // 영화 좋아요 기록을 다시 insert
        if (MovieMember.getUmlike()) {
            // 튜플 insert 시 필요한 entity 생성
            MemberEntity Member = MemberEntity.builder().uid(MovieMember.getMember().getUid()).build();
            MovieEntity Movie = MovieEntity.builder().mid(MovieMember.getMovie().getMid()).build();

            // 튜플 제거 후 튜플 insert
            movieMemberRepository.deleteById(umid);
            movieMemberRepository.save(MovieMemberEntity.builder()
                    .umlike(true)
                    .member(Member)
                    .movie(Movie).build());
        }
        // 영화에 대한 좋아요 기록이 없을경우 바로 MovieMember 튜플 제거
        else {
            movieMemberRepository.deleteById(umid);
        }
    }
}



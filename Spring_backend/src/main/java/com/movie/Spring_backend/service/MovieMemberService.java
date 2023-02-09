/*
  23-02-09 로그인한 유저가 영화에 관련된 행위를 할때 사용되는 Service 구현(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieMemberEntity;
import com.movie.Spring_backend.repository.MovieMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class MovieMemberService {

    private final MovieMemberRepository movieMemberRepository;

    // 사용자가 영화 좋아요를 누를 때 실행되는 메소드
    @Transactional
    public void MovieLikeUpdate(Map<String, String> requestMap) {
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
}



/*
    23-02-06 좋아요 및 평점 관리를 위한 Repository 생성(오병주)
 */
package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieMemberEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieMemberRepository extends JpaRepository<MovieMemberEntity, Long> {

    // 사용자가 좋아요 누른 영화 목록 구하는 메소드
    List<MovieMemberEntity> findByUmlikeTrueAndMember(MemberEntity member);

    // MovieMember 테이블에 튜플이 있는지 확인하는 메소드
    Optional<MovieMemberEntity> findByMovieAndMember(MovieEntity movie, MemberEntity member);

    // 사용자의 좋아요 기록을 true 에서 false로 바꾸는 메소드
    @Modifying
    @Query("UPDATE MovieMemberEntity mm " +
            "SET mm.umlike = false " +
            "WHERE mm.member = :member AND mm.movie = :movie")
    void MovieLikeChangeFalse(@Param("member") MemberEntity member, @Param("movie") MovieEntity movie);

    // 사용자의 좋아요 기록을 false 에서 true로 바꾸는 메소드
    @Modifying
    @Query("UPDATE MovieMemberEntity mm " +
            "SET mm.umlike = true " +
            "WHERE mm.member = :member AND mm.movie = :movie")
    void MovieLikeChangeTrue(@Param("member") MemberEntity member, @Param("movie") MovieEntity movie);

    // 특정 영화의 MovieMember 정보를 모두 들고오는 메소드
    List<MovieMemberEntity> findByMovie(MovieEntity movie);
}

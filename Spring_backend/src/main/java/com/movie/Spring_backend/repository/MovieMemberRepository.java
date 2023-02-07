/*
    23-02-06 좋아요 및 평점 관리를 위한 Repository 생성(오병주)
 */
package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.entity.MovieMemberEntity;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieMemberRepository extends JpaRepository<MovieMemberEntity, Long> {

    // 사용자가 좋아요 누른 영화 목록 구하는 메소드
    List<MovieMemberEntity> findByUmlikeTrueAndMember(MemberEntity member);

//    추후에 사용할꺼면 사용
//    @Query(value = "SELECT mm FROM MovieMemberEntity as mm " +
//                   "WHERE mm.umlike = true AND mm.member.uid = :memberuid")
//    List<MovieMemberEntity> findAllMovieLikeTrue(@Param("memberuid") String memberuid);
}

/*
    23-02-06 좋아요 및 평점 관리를 위한 Repository 생성(오병주)
 */
package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MovieMemberEntity;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MovieMemberRepository extends JpaRepository<MovieMemberEntity, Long> {
    
}

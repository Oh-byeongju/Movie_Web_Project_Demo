package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.CommentInfoEntity;
import com.movie.Spring_backend.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentInfoRepository extends JpaRepository<CommentInfoEntity, Long> {

    // 사용자가 좋아요 누른 관람평 목록 구하는 메소드
    List<CommentInfoEntity> findByMember(MemberEntity member);
}


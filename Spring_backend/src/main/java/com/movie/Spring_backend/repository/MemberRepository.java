package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    // 아이디 중복 검사를 위한 select
    Optional<MemberEntity> findByUid(String id);
}

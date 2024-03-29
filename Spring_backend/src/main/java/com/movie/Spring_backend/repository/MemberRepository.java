package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MemberEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, String> {
    // 회원정보를 수정했을 때 실행되는 메소드
    @Modifying
    @Query("UPDATE MemberEntity u " +
            "SET u.uid = :uid, u.upw = :upw, u.uname = :uname, u.uemail = :uemail, u.utel = :utel, " +
            "u.uaddr = :uaddr, u.uaddrsecond = :uaddrsecond, ubirth = :ubirth WHERE u.uid = :uid")
    void MemberInfoUpdate(@Param("uid") String uid, @Param("upw") String upw, @Param("uname") String uname,
                            @Param ("uemail") String uemail, @Param("utel") String utel, @Param("uaddr") String uaddr,
                            @Param("uaddrsecond") String uaddrsecond, @Param("ubirth") Date ubirth);

    // 사용자 이름순으로 정렬(오름차순)
    Page<MemberEntity> findByUidContainingOrderByUnameAsc(String uid, Pageable pageable);

    // 사용자 가입순으로 정렬(오름차순)
    Page<MemberEntity> findByUidContainingOrderByUjoindateAsc(String uid, Pageable pageable);
}

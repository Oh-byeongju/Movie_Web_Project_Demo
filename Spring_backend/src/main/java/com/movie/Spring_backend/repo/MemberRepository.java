package com.movie.Spring_backend.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.movie.Spring_backend.entity.MemberEntity;
@Repository
public interface MemberRepository extends JpaRepository<MemberEntity,Long>  {
    //JpaRepository<Entity클래스, PK값>
}

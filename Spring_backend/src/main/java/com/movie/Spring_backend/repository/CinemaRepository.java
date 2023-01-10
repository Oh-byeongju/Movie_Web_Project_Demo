package com.movie.Spring_backend.repository;
import com.movie.Spring_backend.entity.CinemaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CinemaRepository extends JpaRepository<CinemaEntity,Long>  {
    //JpaRepository<Entity클래스, PK값>
}
//디비접근


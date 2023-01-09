package com.movie.Spring_backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.movie.Spring_backend.entity.CinemaEntity;
@Repository
public interface CinemaRepository extends JpaRepository<CinemaEntity,Long>  {
    //JpaRepository<Entity클래스, PK값>
}

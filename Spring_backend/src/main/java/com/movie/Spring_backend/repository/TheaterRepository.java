package com.movie.Spring_backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.movie.Spring_backend.entity.TheaterEntity;

import java.util.List;

@Repository
public interface TheaterRepository extends JpaRepository<TheaterEntity,Long>  {
    //JpaRepository<Entity클래스, PK값>
    List<TheaterEntity> findAll();
}
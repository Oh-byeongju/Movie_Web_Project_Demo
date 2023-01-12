package com.movie.Spring_backend.repository;
import com.movie.Spring_backend.entity.CinemaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.movie.Spring_backend.entity.TempEntity;

import java.util.List;

@Repository
public interface TempRepository extends JpaRepository<TempEntity,Long>  {
  //JpaRepository<Entity클래스, PK값>
}

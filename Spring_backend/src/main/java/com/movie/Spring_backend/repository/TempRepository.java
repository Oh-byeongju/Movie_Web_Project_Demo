package com.movie.Spring_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.movie.Spring_backend.entity.TempEntity;

import java.util.List;
import java.util.Optional;

@Repository
<<<<<<< HEAD
public interface TempRepository extends JpaRepository<TempEntity,Long>  {
  //JpaRepository<Entity클래스, PK값

=======
public interface TempRepository extends JpaRepository<TempEntity,Long> {
>>>>>>> ce854d1c082d44035124abd918dea63a45a14863
    List<TempEntity> findAll();
}

package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface AreaRepository extends JpaRepository<MovieEntity,Long> {

}
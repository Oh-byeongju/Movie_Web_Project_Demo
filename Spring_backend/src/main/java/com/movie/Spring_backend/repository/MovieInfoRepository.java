package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MovieInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieInfoRepository extends JpaRepository<MovieInfoEntity, Long> {
    List<MovieInfoEntity> findAll();
    public List<MovieInfoEntity> findByTempMid(Long id);

}


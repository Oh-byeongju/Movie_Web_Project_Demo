package com.movie.Spring_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.movie.Spring_backend.entity.MovieEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<MovieEntity,Long> {
    List<MovieEntity> findAll();

    public List<MovieEntity> findByMid(Long id);

    public List<MovieEntity> findByMidIn(List<Long> mid);

    public List<MovieEntity> findByMtitleContaining(String title);
    //Containing == select시 like할때 사용
}
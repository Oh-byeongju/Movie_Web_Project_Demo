package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieInfoRepository extends JpaRepository<MovieInfoEntity, Long> {

    List<MovieInfoEntity> findAll();
    public List<MovieInfoEntity> findByMovie(MovieEntity id);

    public List<MovieInfoEntity> findByCinemaCidIn(List<Long> cid);



}


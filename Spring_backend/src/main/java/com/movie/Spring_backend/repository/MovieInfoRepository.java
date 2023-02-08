package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieInfoRepository extends JpaRepository<MovieInfoEntity, Long> {


    @Query("SELECT mi From MovieInfoEntity as mi Group by mi.miday Order by mi.miday ASC")
    List<MovieInfoEntity>  findAll();
    public List<MovieInfoEntity> findByMovie(MovieEntity id);

    @Query("SELECT mi From MovieInfoEntity as mi, MovieEntity as m Where mi.movie.mid= (:mid) Group by mi.miday Order by mi.miday ASC ")
    public List<MovieInfoEntity> findByMovieToDay(@Param("mid") Long mid);

    @Query("SELECT mi From MovieInfoEntity as mi, CinemaEntity as c WHERE mi.cinema.cid IN (:cid)")
    public List<MovieInfoEntity> findByCinemaCidIn(@Param("cid")List<Long> cid);

    public List<MovieInfoEntity> findByCinemaCidInAndMovieMid(List<Long> cid, Long mid);



}


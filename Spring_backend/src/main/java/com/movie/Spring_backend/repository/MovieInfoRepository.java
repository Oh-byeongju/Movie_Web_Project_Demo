package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Set;

@Repository
public interface MovieInfoRepository extends JpaRepository<MovieInfoEntity, Long> {


    @Query("SELECT mi From MovieInfoEntity as mi Group by mi.miday Order by mi.miday ASC")
    List<MovieInfoEntity>  findAll();
    public List<MovieInfoEntity> findByMovie(MovieEntity id);

    @Query("SELECT mi From MovieInfoEntity as mi, MovieEntity as m Where mi.movie.mid= (:mid) Group by mi.miday Order by mi.miday ASC ")
    public List<MovieInfoEntity> findByMovieToDay(@Param("mid") Long mid);

    //in able을 위해
    @Query("SELECT mi From MovieInfoEntity as mi, CinemaEntity as c WHERE mi.cinema.cid IN (:cid)")
    public List<MovieInfoEntity> findByCinemaCidIn(@Param("cid")List<Long> cid);

    //notin able을 위해
    @Query("SELECT mi From MovieInfoEntity as mi, CinemaEntity as c WHERE mi.cinema.cid Not IN (:cid)")
    public List<MovieInfoEntity> findByCinemaCidNotIn(@Param("cid")List<Long> cid);

    //극장 영화로 day 검색
    public List<MovieInfoEntity> findByCinemaCidInAndMovieMid(List<Long> cid, Long mid);


    //miday로 영화or극장 검색하려고 만듬
    public List<MovieInfoEntity> findByMiday(Date miday);

    //mid를 구해야함
    public List<MovieInfoEntity> findByMidayAndCinemaCidIn(Date miday, List<Long> cid);

    public List<MovieInfoEntity> findByMidayAndMovieMid(Date miday, Long mid);
    @Query("Select mi From MovieInfoEntity as mi, CinemaEntity, MovieEntity ,TheaterEntity JOIN FETCH mi.cinema " +
            "JOIN FETCH mi.movie " +
            "Where mi.miday = (:miday) AND " +
            "mi.movie.mid= (:mid) AND "+
            "mi.cinema.cid IN (:cid)")
    //페치조인을 해서 영화와 극장 정보까지 함께 보내기
    public List<MovieInfoEntity> findBySchedule(@Param("miday")Date miday,@Param("mid") Long mid, @Param("cid")List<Long> cid);
}
/*
@Query("SELECT c FROM CinemaEntity as c JOIN FETCH c.theater WHERE c.cid IN (:cid) ")
*/

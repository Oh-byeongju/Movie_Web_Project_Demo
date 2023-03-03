package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.MovieInfoSeatEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieInfoSeatRepository  extends JpaRepository<MovieInfoSeatEntity,Long> {
    @Query(value = "SELECT mis from MovieInfoSeatEntity as mis where mis.info.miid=(:miid)")
    @EntityGraph(attributePaths = {"seat","info", "seat.cinema","seat.cinema.theater","info.movie"})
    List<MovieInfoSeatEntity> findByInfoMovie(@Param("miid") Long miid);

    @Query(value = "select count(mis.misid) >0 from MovieInfoSeatEntity as mis where mis.seat.sid IN (:sid) AND " +
            "mis.info.miid=(:miid)")
    boolean exists(@Param(value = "sid")List<Long> sid, @Param(value ="miid") Long miid);

}

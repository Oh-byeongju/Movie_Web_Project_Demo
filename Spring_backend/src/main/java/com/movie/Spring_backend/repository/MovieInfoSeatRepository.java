package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MovieInfoSeatEntitiy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface MovieInfoSeatRepository  extends JpaRepository<MovieInfoSeatEntitiy,Long> {
}

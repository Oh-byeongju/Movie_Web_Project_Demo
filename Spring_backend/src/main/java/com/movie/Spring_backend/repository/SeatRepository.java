package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.SeatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface SeatRepository  extends JpaRepository<SeatEntity,Long> {
}

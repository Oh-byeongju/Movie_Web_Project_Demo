package com.movie.Spring_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.movie.Spring_backend.entity.MovieEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<MovieEntity,Long> {
    List<MovieEntity> findAll();

    //단순 영화 검색
    public List<MovieEntity> findByMid(Long id);

    //극장 클릭 시 영화 id list를 활용하여 검색
    public List<MovieEntity> findByMidIn(List<Long> mid);

    //Containing == select시 like할때 사용
    public List<MovieEntity> findByMtitleContaining(String title);
}
package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.MovieInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.movie.Spring_backend.entity.TempEntity;

import java.util.List;
import java.util.Optional;

@Repository

public interface TempRepository extends JpaRepository<TempEntity,Long> {
    List<TempEntity> findAll();

    public Optional<TempEntity> findById(Long id);

    public Optional<TempEntity> findByMtitleContaining(String title);
    //Containg == select시 like할때 사용

}

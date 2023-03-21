package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.BoardCommentEntity;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardCommentRepository extends JpaRepository<BoardCommentEntity, Long> {

    @Query("select bc from BoardCommentEntity as bc where bc.board.bid = :bid order by bcid desc")
    public List<BoardCommentEntity> findByComment(@Param("bid") Long bid);
}

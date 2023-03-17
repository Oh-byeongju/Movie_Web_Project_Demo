package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    //전체 게시물을 불러오는 메소드
    //번호를 기준으로 내림차순
    @Query("select board from BoardEntity as board order by bid desc")
    public List<BoardEntity> findByAllBoard();
}

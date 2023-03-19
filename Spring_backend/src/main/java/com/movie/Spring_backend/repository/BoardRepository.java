package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.BoardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    //전체 게시물을 불러오는 메소드
    //번호를 기준으로 내림차순
    @Query("select board from BoardEntity as board order by bid desc")
    public List<BoardEntity> findByAllBoard();

    //게시글 아이디와 타이틀명으로 검색하는 메소드
    @Query("select board from BoardEntity as board where bid = :bid and btitle like :btitle")
    public List<BoardEntity> findByContent(@Param("bid") Long bid,@Param("btitle")String btitle);

    //게시글의 조회수를 올려주는 메소드
    @Modifying
    @Query("update BoardEntity as board set board.bclickindex=board.bclickindex+1 where board.bid= :bid")
    public void updateViews(@Param("bid") Long bid);

    @Query("select board from BoardEntity as board order by bid desc")
    public Page<BoardEntity> Pagination(Pageable pageable);

}

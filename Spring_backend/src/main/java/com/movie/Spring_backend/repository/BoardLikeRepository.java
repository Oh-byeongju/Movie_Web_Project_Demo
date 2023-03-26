package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.BoardCommentEntity;
import com.movie.Spring_backend.entity.BoardLikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLikeEntity, Long> {

    //게시글 좋아요 확인 하는 메소드
    @Query("select boardcomment from BoardLikeEntity as boardcomment where boardcomment.board.bid = :bid and boardcomment.member.uid = :uid" +
            " and boardcomment.blike=1")
    public BoardLikeEntity findByLike(@Param("bid")Long bid, @Param("uid")String uid);

    @Query("select boardcomment from BoardLikeEntity as boardcomment where boardcomment.board.bid = :bid and boardcomment.member.uid = :uid " +
            "and boardcomment.bunlike=1")
    public BoardLikeEntity findByUnLike(@Param("bid")Long bid, @Param("uid")String uid);

    @Modifying
    @Query("delete from BoardLikeEntity as boardcomment where boardcomment.board.bid = :bid and boardcomment.member.uid = :uid " +
            "and boardcomment.blike = :blike and boardcomment.bunlike = :bunlike")
    public void Deleted(@Param("bid")Long bid, @Param("uid")String uid, @Param("blike")Integer like,@Param("bunlike")Integer unlike);

}

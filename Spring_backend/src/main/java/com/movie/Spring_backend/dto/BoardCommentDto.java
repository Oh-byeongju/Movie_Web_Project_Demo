package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.BoardCommentEntity;
import com.movie.Spring_backend.entity.BoardEntity;
import com.movie.Spring_backend.entity.MemberEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor
public class BoardCommentDto  {
    private Long bcid;

    private String bcdate;

    private String bccomment;

    private BoardEntity board;

    private MemberEntity member;
    private String uid;
    private Long bid;
    private Long parent_id;

    private List<BoardCommentEntity> children = new ArrayList<>();

    @Builder
    public BoardCommentDto(Long bcid, String bcdate,String bccomment, BoardEntity board,Long bid,
                              MemberEntity member, String uid, Long parent_id,  List<BoardCommentEntity> children
) {
        this.bcid=bcid;
        this.bcdate = bcdate;
        this.bccomment=bccomment;
        this.board=board;
        this.member=member;
        this.bid=bid;
        this.uid=uid;
        this.parent_id=parent_id;
    }



}

package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.BoardEntity;
import com.movie.Spring_backend.entity.MemberEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;


@Getter
@NoArgsConstructor
public class BoardCommentDto {
    private Long bcid;

    private String bcdate;

    private Integer bcparent;

    private String bccomment;
    private Integer bcgroup;

    private Integer deep;

    private BoardEntity board;

    private MemberEntity member;
    private String uid;

    @Builder
    public BoardCommentDto(Long bcid, String bcdate, Integer bcparent, String bccomment,Integer bcgroup, Integer deep , BoardEntity board,
                              MemberEntity member, String uid) {
        this.bcid=bcid;
        this.bcdate = bcdate;
        this.bcparent = bcparent;
        this.bccomment=bccomment;
        this.bcgroup=bcgroup;
        this.deep=deep;
        this.board=board;
        this.member=member;
        this.uid=uid;
    }
}

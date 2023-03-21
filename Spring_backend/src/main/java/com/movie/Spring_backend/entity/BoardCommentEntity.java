package com.movie.Spring_backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "board_comment")
public class BoardCommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bcid;

    @Column
    private String bcdate;

    @Column(nullable = false)
    private Integer bcparent;

    @Column(nullable = false, length = 200)
    private String bccomment;
    @Column(nullable = false, length = 20)
    private Integer bcgroup;

    @Column(nullable = false, length = 20)
    private Integer deep;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="bid") //조인할 컬럼 이름
    private BoardEntity board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="uid") //조인할 컬럼 이름
    private MemberEntity member;

    @Builder
    public BoardCommentEntity(Long bcid, String bcdate, Integer bcparent,String bccomment, Integer bcgroup, Integer deep , BoardEntity board,
                              MemberEntity member) {
        this.bcid=bcid;
        this.bcdate = bcdate;
        this.bcparent = bcparent;
        this.bccomment=bccomment;
        this.bcgroup=bcgroup;
        this.deep=deep;
        this.board=board;
        this.member=member;
    }
}

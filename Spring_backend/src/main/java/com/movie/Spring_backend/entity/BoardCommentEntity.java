package com.movie.Spring_backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

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

    @Column(nullable = false, length = 200)
    private String bccomment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="bid") //조인할 컬럼 이름
    private BoardEntity board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="uid") //조인할 컬럼 이름
    private MemberEntity member;

    //계층형 구조를 위한 컬럼
    @Column
    private Long parent;

    @OneToMany(mappedBy = "parent", orphanRemoval = true,fetch = FetchType.LAZY)
    private List<BoardCommentEntity> children = new ArrayList<>();

    @Formula("(select count(comment.bcid) from board_comment comment where comment.bid = bid)")
    private Integer commentcount;

    public void setChildren(List<BoardCommentEntity> children) {
        this.children = children;
    }

    @Builder
    public BoardCommentEntity(Long bcid, String bcdate,String bccomment, BoardEntity board,
                              MemberEntity member,Long parent, List<BoardCommentEntity> children, Integer commentcount) {
        this.bcid=bcid;
        this.bcdate = bcdate;
        this.bccomment=bccomment;
        this.board=board;
        this.member=member;
        this.parent=parent;
        this.children=children;
        this.commentcount=commentcount;
    }
}

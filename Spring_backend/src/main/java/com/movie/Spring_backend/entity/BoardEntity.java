package com.movie.Spring_backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "board")
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bid;

    @Column(nullable = false)
    private String btitle;

    @Column(nullable = false)
    private String bdetail;

    @Column(nullable = false,length = 30)
    private String bdate;
    @Column(nullable = false)
    private String bcategory;

    @Column
    private Integer bclickindex;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="uid") //조인할 컬럼 이름
    private MemberEntity member;

    @Formula("(select count(boardlike.blid) from board_like boardlike where boardlike.bid = bid and boardlike.blike = 1)")
    private Integer like;

    @Formula("(select count(boardlike.blid) from board_like boardlike where boardlike.bid = bid and boardlike.bunlike = 1)")
    private Integer bunlike;

    @Formula("(select count(comment.bcid) from board_comment comment where comment.bid = bid)")
    private Integer commentcount;

    @Builder //클래스 레벨에 붙이거나 생성자에 붙여주면 파라미터를 활용하여 빌더 패턴을 자동으로 생성해준다
    public BoardEntity(Long bid, String btitle, String bdetail, String bdate, String bcategory, Integer bclickindex, Integer like, Integer bunlike, MemberEntity member
                       ,Integer commentcount
    ) {
        this.bid=bid;
        this.btitle=btitle;
        this.bdetail=bdetail;
        this.bdate=bdate;
        this.bcategory=bcategory;
        this.bclickindex=bclickindex;
        this.like=like;
        this.bunlike=bunlike;
        this.member=member;
        this.commentcount=commentcount;
    }
}

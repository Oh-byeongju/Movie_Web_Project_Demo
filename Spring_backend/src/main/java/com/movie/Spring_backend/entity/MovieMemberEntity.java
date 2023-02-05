// 23-02-05 영화 좋아요 기능을 위한 entity 분리(오병주)
package com.movie.Spring_backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name="Movie_member")
@Entity
@Getter
@NoArgsConstructor
public class MovieMemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long umid;

    private boolean umlike;

    private int umscore;

    private String umcomment;

    // 다대일 관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="mid")
    private MovieEntity movie;

    // 다대일 관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="uid")
    private MemberEntity member;

    @Builder
    public MovieMemberEntity(Long umid, boolean umlike, int umscore , String umcomment, MovieEntity movie, MemberEntity member) {
        this.umid = umid;
        this.umlike = umlike;
        this.umscore = umscore;
        this.umcomment = umcomment;
        this.movie = movie;
        this.member = member;
    }
}


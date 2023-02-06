package com.movie.Spring_backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "movie_cinema")
public class CinemaEntity { // 소문자 수정본

    @Id
    private Long cid;

    @Column(nullable = false)
    private String cname;

    @Column(nullable = false)
    private String ctype;

    @Column(nullable = false)
    private String cseat;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="tid") //조인할 컬럼 이름
    private TheaterEntity theater;


    @Builder //클래스 레벨에 붙이거나 생성자에 붙여주면 파라미터를 활용하여 빌더 패턴을 자동으로 생성해준다
    public void CinemaEntity(Long cid, String cname, String ctype, String cseat ,TheaterEntity theater) {
        this.cid = cid;
        this.cname = cname;
        this.ctype = ctype;
        this.cseat = cseat;
        this.theater = theater;
    }

}


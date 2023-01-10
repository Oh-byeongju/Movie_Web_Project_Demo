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
public class CinemaEntity {

    @Id
    private Long cId;

    @Column(nullable = false)
    private String cName;

    @Column(nullable = false)
    private String cType;

    @Column(nullable = false)
    private String cSeat;

    @ManyToOne  //다 대 일 여러개의 관들은 하나의 극장을 가진다
    @JoinColumn(name="tId") //조인할 컬럼 이름
    private TheaterEntity theater;


    @Builder
    public CinemaEntity(Long cId, String cName, String cType, String cSeat ,TheaterEntity theater) {
        this.cId = cId;
        this.cName = cName;
        this.cType = cType;
        this.cSeat = cSeat;
        this.theater=theater;
    }
}

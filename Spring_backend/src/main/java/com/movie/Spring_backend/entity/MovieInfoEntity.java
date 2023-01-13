package com.movie.Spring_backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Table(name="movie_information")
@Entity
@Getter
@NoArgsConstructor
public class MovieInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long miid;

    @Column(nullable = false,length = 30)
    private String mistarttime;

    @Column(nullable = false, length = 30)
    private String miendtime;


    @ManyToOne //다 대 일 여러개의 관들은 하나의 극장을 가진다
    @JoinColumn(name="mid")//조인할 컬럼 이름
    private TempEntity temp;


    @ManyToOne//다 대 일 여러개의 관들은 하나의 극장을 가진다
    @JoinColumn(name="cid")
    private CinemaEntity cid;

    @Builder
    public MovieInfoEntity(Long miid, String mistarttime, String miendtime, TempEntity temp, CinemaEntity cid) {
       this.miid= miid;
       this.mistarttime=mistarttime;
       this.miendtime=miendtime;
       this.temp=temp;
       this.cid=cid;
    }
}

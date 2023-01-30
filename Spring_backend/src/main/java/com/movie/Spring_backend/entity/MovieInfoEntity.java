package com.movie.Spring_backend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name="movie_information")
@Entity
@Getter
@NoArgsConstructor
// @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "MID")

public class MovieInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long miid;

    @Column(nullable = false,length = 30)
    private String mistarttime;

    @Column(nullable = false, length = 30)
    private String miendtime;

    @ManyToOne
    @JoinColumn(name="MID")
    private MovieEntity temp; //주인 N



    @ManyToOne//다 대 일 여러개의 관들은 하나의 극장을 가진다
    @JoinColumn(name="cid")
    @JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)

    private CinemaEntity cinema;

    @Builder
    public MovieInfoEntity(Long miid, String mistarttime, String miendtime , MovieEntity temp, CinemaEntity cinema) {
       this.miid= miid;
       this.mistarttime=mistarttime;
       this.miendtime=miendtime;
       this.temp=temp;
       this.cinema=cinema;
    }
}

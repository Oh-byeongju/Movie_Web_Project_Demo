package com.movie.Spring_backend.entity;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;


@Entity
@Table(name="movie_theater")
@Getter
@NoArgsConstructor
public class TheaterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tid;

    @Column(nullable = false, length = 30)
    private String tname;

    @Column(nullable = false, length = 30)
    private String taddr;

    @ManyToOne//다 대 일 여러개의 관들은 하나의 극장을 가진다
    @JoinColumn(name="aid")

    private AreaEntity area;
    @Builder
    public TheaterEntity(Long tid ,String tname, String taddr, AreaEntity area) {
        this.tid=tid;
        this.tname=tname;
        this.taddr=taddr;
        this.area= area;
    }



}
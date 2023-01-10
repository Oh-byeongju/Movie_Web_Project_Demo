package com.movie.Spring_backend.entity;
import javax.persistence.*;
import lombok.*;


@Entity
@Table(name="movie_theater")
@Getter
@NoArgsConstructor
public class TheaterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tId;

    @Column(nullable = false, length = 30)
    private String tName;

    @Column(nullable = false, length = 30)
    private String tArea;
    @Column(nullable = false, length = 30)
    private String tAddr;


    @Builder
    public TheaterEntity(Long tId ,String tName, String tArea, String tAddr) {
        this.tId=tId;
        this.tName=tName;
        this.tArea=tArea;
        this.tAddr=tAddr;
    }



}
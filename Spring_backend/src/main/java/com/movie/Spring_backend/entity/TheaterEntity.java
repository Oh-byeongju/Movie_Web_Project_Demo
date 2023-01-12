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
    private Long tid;

    @Column(nullable = false, length = 30)
    private String tname;

    @Column(nullable = false, length = 30)
    private String tarea;
    @Column(nullable = false, length = 30)
    private String taddr;


    @Builder
    public TheaterEntity(Long tid ,String tname, String tarea, String taddr) {
        this.tid=tid;
        this.tname=tname;
        this.tarea=tarea;
        this.taddr=taddr;
    }



}
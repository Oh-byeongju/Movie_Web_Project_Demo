package com.movie.Spring_backend.entity;
import javax.persistence.*;
import lombok.*;

import java.util.Date;

@Entity

@Table(name="movie_cinema")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class CinemaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long c_id;

    @Column(nullable = false, length = 30)
    private String c_name;

    @Column(nullable = false, length = 30)
    private String c_type;
    @Column(nullable = false, length = 30)
    private int c_seat;

    @ManyToOne  //다 대 일 여러개의 관들은 하나의 극장을 가진다
    @JoinColumn(name="t_id") //조인할 컬럼 이름
    private TheaterEntity theater;



    public CinemaEntity( String c_name, String c_type, int c_seat) {

        this.c_name=c_name;
        this.c_type=c_type;
        this.c_seat=c_seat;


    }

}

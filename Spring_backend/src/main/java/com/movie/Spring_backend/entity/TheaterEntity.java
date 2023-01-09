package com.movie.Spring_backend.entity;
import javax.persistence.*;
import lombok.*;
import com.movie.Spring_backend.entity.CinemaEntity;
import java.util.ArrayList;
import java.util.Date;

@Entity

@Table(name="movie_theater")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class TheaterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long t_id;

    @Column(nullable = false, length = 30)
    private String t_name;

    @Column(nullable = false, length = 30)
    private String t_area;
    @Column(nullable = false, length = 30)
    private String t_addr;

    public TheaterEntity( String t_name, String t_area, String t_addr) {

        this.t_name=t_name;
        this.t_area=t_area;
        this.t_addr=t_addr;

    }

}

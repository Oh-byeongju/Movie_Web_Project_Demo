package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Getter
@NoArgsConstructor
public class MovieInfoDto {

    private Long miid;

    private Date miday;
    private String mistarttime;

    private String miendtime;

    private MovieEntity movie;

    private CinemaEntity cinema;

    @Builder
    public MovieInfoDto(Long miid, Date miday, String mistarttime, String miendtime, MovieEntity movie, CinemaEntity cinema) {
        this.miid= miid;
        this.miday=miday;
        this.mistarttime=mistarttime;
        this.miendtime=miendtime;
        this.movie=movie;
        this.cinema=cinema;
    }

}

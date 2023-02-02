package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MovieInfoDto {

    private Long miid;

    private String mistarttime;

    private String miendtime;

    private MovieEntity movie;

    private CinemaEntity cinema;

    @Builder
    public MovieInfoDto(Long miid, String mistarttime, String miendtime, MovieEntity movie, CinemaEntity cinema) {
        this.miid= miid;
        this.mistarttime=mistarttime;
        this.miendtime=miendtime;
        this.movie=movie;
        this.cinema=cinema;
    }

}

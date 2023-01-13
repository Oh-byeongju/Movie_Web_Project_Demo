package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.TempEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@NoArgsConstructor
public class MovieInfoDto {

    private Long miid;

    private String mistarttime;

    private String miendtime;

    private TempEntity temp;

    private CinemaEntity cinema;

    @Builder
    public MovieInfoDto(Long miid, String mistarttime, String miendtime, TempEntity temp, CinemaEntity cinema) {
        this.miid= miid;
        this.mistarttime=mistarttime;
        this.miendtime=miendtime;
        this.temp=temp;
        this.cinema=cinema;
    }
}

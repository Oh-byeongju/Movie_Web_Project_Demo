package com.movie.Spring_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Getter
@NoArgsConstructor
public class MovieDto {
    private Long mid;
    private String mtitle;
    private String mdir;
    private String mactor;
    private String msupactor;
    private String mgenre;
    private int mtime;
    private Date mdate;
    private String mrating;
    private String mstory;
    private int mlike; //좋아요
    private String mimagepath; //이미지 주소

    //private List<MovieInfoEntity> members;


    @Builder
    public MovieDto(Long mid, String mtitle, String mdir, String mactor, String msupactor, String mgenre,
                    int mtime, Date mdate, String mrating, String mstory ,int mlike, String mimagepath) {
        this.mid = mid;
        this.mtitle = mtitle;
        this.mdir=mdir;
        this.mactor=mactor;
        this.msupactor=msupactor;
        this.mgenre=mgenre;
        this.mtime=mtime;
        this.mdate=mdate;
        this.mrating=mrating;
        this.mstory=mstory;
        this.mlike=mlike;
        this.mimagepath=mimagepath;

    }
}





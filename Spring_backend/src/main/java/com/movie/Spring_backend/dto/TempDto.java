package com.movie.Spring_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class TempDto {
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

    @Builder
    public TempDto(Long mid, String mtitle, String mdir, String mactor, String msupactor, String mgenre,
                      int mtime, Date mdate, String mrating, String mstory) {
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
    }
}


/*
*  @NoArgsConstructor
    @Data //값을 가공 후 전달.
    public static class CinemaSelect {
        private Long cid;
        private String cname;
        private String ctype;
        private String cseat;
        private TheaterEntity theater;

        public CinemaSelect (CinemaEntity cinemaEntity){
            this.cid=cinemaEntity.getCid();
            this.cname=cinemaEntity.getCname();
            this.ctype= cinemaEntity.getCtype();
            this.cseat= cinemaEntity.getCseat();
            this.theater=cinemaEntity.getTheater();
        }
    }
*/

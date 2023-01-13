package com.movie.Spring_backend.dto;

<<<<<<< HEAD

import lombok.AllArgsConstructor;
=======
>>>>>>> ce854d1c082d44035124abd918dea63a45a14863
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

<<<<<<< HEAD
import javax.persistence.Entity;
import java.sql.Date;
=======
import java.util.Date;
>>>>>>> ce854d1c082d44035124abd918dea63a45a14863

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
<<<<<<< HEAD
                   int mtime, Date mdate, String mrating, String mstory) {
=======
                      int mtime, Date mdate, String mrating, String mstory) {
>>>>>>> ce854d1c082d44035124abd918dea63a45a14863
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
<<<<<<< HEAD


=======
>>>>>>> ce854d1c082d44035124abd918dea63a45a14863
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

package com.movie.Spring_backend.dto;
<<<<<<< HEAD

import com.movie.Spring_backend.entity.TempEntity;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Data
@NoArgsConstructor

public class TempDto {

    @NoArgsConstructor
    @Data

    public static class movieList{
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
    public movieList(TempEntity t) {
        this.mid = t.getMid();
        this.mtitle = t.getMtitle();
        this.mdir = t.getMdir();
        this.mactor = t.getMactor();
        this.msupactor = t.getMsupactor();
        this.mgenre=t.getMgenre();
        this.mtime=t.getMtime();
        this.mdate=t.getMdate();
        this.mrating=t.getMrating();
        this.mstory=t.getMstory();
    }
}}


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
=======
import com.movie.Spring_backend.entity.TempEntity;
import lombok.*;

import java.util.Date;

@ToString
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TempDto {
    private long mId;
    private String mTitle;
    private String mDir;
    private String mActor;
    private String mSupactor;
    private String mGenre;
    private int mTime;
    private Date mDate;
    private String mRating;
    private String mStory;
    public TempEntity toEntity(){
        return TempEntity.builder().mId(this.mId).mTitle(this.mTitle).mDir(this.mDir).mActor(this.mActor).mSupactor(this.mSupactor).mGenre(this.mGenre)
                        .mTime(this.mTime).mDate(this.mDate).mRating(this.mRating).mStory(this.mStory).build();

    }


}
>>>>>>> 413fd017c3181f9dfb0191d2e94c33066ee7d73a

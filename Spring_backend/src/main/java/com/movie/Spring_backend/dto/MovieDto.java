/*
  23-02-06 MovieDto 좋아요, 평점 추출을 위한 수정(오병주)
 */

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
    private String mimagepath; //이미지 주소
    private int mlikes; // 좋아요 개수
    private Float mscore; // 평점 평균
    private Boolean mlike; // 사용자 개인별 좋아요 여부
    private String able;
    @Builder
    public MovieDto(Long mid, String mtitle, String mdir, String mactor, String msupactor, String mgenre,
                    int mtime, Date mdate, String mrating, String mstory , String mimagepath, int mlikes, Float mscore, Boolean mlike, String able) {
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
        this.mimagepath=mimagepath;
        this.mlikes=mlikes;
        this.mscore=mscore;
        this.mlike=mlike;
        this.able=able;
    }
}





/*
  23-02-06 MovieDto 좋아요, 평점 추출을 위한 수정(오병주)
 */

package com.movie.Spring_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Getter
@NoArgsConstructor
public class MovieDto {
    private Long mid;
    private String mtitle;
    private String mdir;
    private String mgenre;
    private int mtime;
    private Date mdate;
    private String mrating;
    private String mstory;
    private String mimagepath; //이미지 주소
    private Integer mlikes; // 좋아요 개수
    private Float mscore; // 평점 평균
    private Boolean mlike; // 사용자 개인별 좋아요 여부
    private String able;
    private List<String> actors; // 영화에 출연하는 배우들
    private Boolean reserve;    // 예매 가능 여부
    private Float reserveRate;  // 예매율
    private Integer reserveCnt; // 예매횟수
    private Integer reserveCntAll; // 전체 예매 횟수(관리자 페이지에서 사용)

    //관리자 페이지
    private List<String> mainactor;  //주연
    private List<String> subactor;  //조연
    private List<String> voiceactor;  //성우


    @Builder
    public MovieDto(Long mid, String mtitle, String mdir, String mgenre, int mtime, Date mdate, String mrating,
                    String mstory , String mimagepath, Integer mlikes, Float mscore, Boolean mlike,
                    String able, List<String> actors, Boolean reserve, Float reserveRate, Integer reserveCnt, Integer reserveCntAll
                     ,List<String> mainactor, List<String> subactor, List<String> voiceactor
    ) {
        this.mid = mid;
        this.mtitle = mtitle;
        this.mdir = mdir;
        this.mgenre = mgenre;
        this.mtime = mtime;
        this.mdate = mdate;
        this.mrating = mrating;
        this.mstory = mstory;
        this.mimagepath = mimagepath;
        this.mlikes = mlikes;
        this.mscore = mscore;
        this.mlike = mlike;
        this.able = able;
        this.actors = actors;
        this.reserve = reserve;
        this.reserveRate = reserveRate;
        this.reserveCnt = reserveCnt;
        this.reserveCntAll = reserveCntAll;
        this.mainactor=mainactor;
        this.subactor=subactor;
        this.voiceactor=voiceactor;
    }
}





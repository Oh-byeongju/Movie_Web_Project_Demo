package com.movie.Spring_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class CommentInfoDto {
    private Long umid;
    private Integer umscore;
    private String umcomment;
    private Date umcommenttime;
    private String uid;
    private Long mid;
    private Long upcnt; // 현재 댓글의 좋아요 수

    @Builder
    public CommentInfoDto(Long umid, Integer umscore, String umcomment, Date umcommenttime, String uid, Long mid, Long upcnt) {
        this.umid = umid;
        this.umscore = umscore;
        this.umcomment = umcomment;
        this.umcommenttime = umcommenttime;
        this.uid = uid;
        this.mid = mid;
        this.upcnt = upcnt;
    }
}
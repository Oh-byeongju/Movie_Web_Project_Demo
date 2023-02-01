package com.movie.Spring_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

// 빌더패턴을 사용한 Dto 파일
@Getter
@NoArgsConstructor
public class AreaDto {
    private int aid;
    private String aarea;

    @Builder
    public AreaDto(int aid, String aarea) {
        this.aid=aid;
        this.aarea=aarea;

    }
}
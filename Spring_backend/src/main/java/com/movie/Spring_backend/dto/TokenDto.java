package com.movie.Spring_backend.dto;

import com.movie.Spring_backend.entity.Authority;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

// 로그인 성공시 리액트로 전달되는 Token의 Dto파일
@Getter
@NoArgsConstructor
public class TokenDto {
    private String grantType;
    private String accessToken;
    private Long tokenExpiresIn;

    @Builder
    public TokenDto(String grantType, String accessToken, Long tokenExpiresIn) {
        this.grantType = grantType;
        this.accessToken = accessToken;
        this.tokenExpiresIn = tokenExpiresIn;
    }
}
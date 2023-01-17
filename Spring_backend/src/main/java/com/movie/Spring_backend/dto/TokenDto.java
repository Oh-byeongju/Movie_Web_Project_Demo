// 23-01-16 로그인 시 전달할 토큰 Dto 구현(오병주)
package com.movie.Spring_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
// 23-01-17 Redis에 사용되는 RefreshTokenEntity 작성(오병주)
package com.movie.Spring_backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "RTK", timeToLive = 90)
@Getter
@NoArgsConstructor
public class RefreshTokenEntity {

    @Id
    private String uid;
    private String refreshToken;

    @Builder
    public RefreshTokenEntity(String uid, String refreshToken) {
        this.uid = uid;
        this.refreshToken = refreshToken;
    }
}

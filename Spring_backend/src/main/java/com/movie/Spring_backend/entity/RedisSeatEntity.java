package com.movie.Spring_backend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@RedisHash(value = "seat", timeToLive = 200) //초단위
public class RedisSeatEntity {

    @Id
    private String miid;
    @Column(nullable = false)
    private String seatid;


    @Column(nullable = false)
    private String user;
    public RedisSeatEntity(String miid, String seatid,String user) {
        this.miid = miid;
        this.seatid = seatid;
        this.user=user;
    }



}
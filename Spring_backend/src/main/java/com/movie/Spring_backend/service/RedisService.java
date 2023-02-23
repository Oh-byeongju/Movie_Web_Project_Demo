package com.movie.Spring_backend.service;

import com.movie.Spring_backend.exceptionlist.SeatOccupyException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RedisService { //Lettuece 방식
    private final RedisTemplate redisTemplate; //redis
    public void setValues(String name, String age){
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        String [] SeatNumber = age.split(",");
        for(String k :SeatNumber){
            String keys="";
            keys =name+k;
            if(!redisTemplate.hasKey(keys)){ //키가 없으면
                System.out.println("key 가 없습니다.");
                values.set(keys, "hello", Duration.ofMinutes(1)); // 1분 뒤 메모리에서 삭제된다.
                //키 set
            }
            else {
                throw new SeatOccupyException("점유된 좌석입니다.");
            }
        }
//예외를 만들어서 리턴해주면 될거같음
//중복시
//2023-02-23 예외처리 해결
    }
    // 데이터 가져오기
    public String getValues(String name){
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        return values.get(name);
    }

}

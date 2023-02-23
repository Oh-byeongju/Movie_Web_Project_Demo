package com.movie.Spring_backend.service;

import com.movie.Spring_backend.exceptionlist.SeatOccupyException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RedisService { //Lettuece 방식
    private final RedisTemplate redisTemplate; //redis
    private final JwtValidCheck jwtValidCheck;

    public void setValues(String name, String age , HttpServletRequest request){
        jwtValidCheck.JwtCheck(request, "ATK");

        ValueOperations<String, String> values = redisTemplate.opsForValue();
        String [] SeatNumber = age.split(",");
        for(String k :SeatNumber){
            String keys="";
            keys =name+k;
            if(!redisTemplate.hasKey(keys)){ //키가 있는지 없는지 검사를 한다. 키가 있으면 예외처리를 통해 종료.
                System.out.println("key 가 없습니다.");
                //키 set                  values.set(keys, "hello", Duration.ofMinutes(1)); // 1분 뒤 메모리에서 삭제된다.
            }
            else {

                throw new SeatOccupyException("점유된 좌석입니다."); //키가 있으면 종료 시킴

            }
        }
        for(String k :SeatNumber){
            String keys="";
            keys =name+k;
            if(!redisTemplate.hasKey(keys)){ //키가 있는지 없는지 검사를 한다. 키가 있으면 예외처리를 통해 종료.
                System.out.println("key 삽입");
                values.set(keys, "hello", Duration.ofMinutes(1)); // 1분 뒤 메모리에서 삭제된다.
            }
            else {
                throw new SeatOccupyException("점유된 좌석입니다."); //한번더 검사
            }
        }


    }
    // 데이터 가져오기
    public String getValues(String name){
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        return values.get(name);
    }

}

package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.SeatDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.exceptionlist.SeatOccupyException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.OcuppyMapper;
import com.movie.Spring_backend.mapper.SeatMapper;
import com.movie.Spring_backend.repository.MovieInfoSeatRepository;
import com.movie.Spring_backend.repository.RedisSeatRepository;
import com.movie.Spring_backend.repository.SeatRepository;
import com.movie.Spring_backend.util.SortUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.*;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.ArrayList;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SeatService {
    private final RedisTemplate redisTemplate; //redis
    private final JwtValidCheck jwtValidCheck;
    private final RedisSeatRepository redisSeatRepository;
    private final SeatRepository seatRepository;
    private final MovieInfoSeatRepository movieInfoSeatRepository;
    private final SeatMapper seatMapper;



    @Transactional

    public List<SeatDto> findBySeat(Long id,Long miid) {

        List<SeatEntity> allDatas = seatRepository.findByCinemaCid(id);  //전체 시트
        List<MovieInfoSeatEntity> ocuppyDatas = movieInfoSeatRepository.findByInfoMovie(miid);
        //인포 시트 //점유된 좌석
        List<SeatEntity> ableDatas = new ArrayList<>();  //able 된 좌석 저장할 list
        List<SeatEntity> disableDatas = new ArrayList<>();  //disable된 좌석 저장할 list


        List<RedisSeatEntity> datad = redisSeatRepository.findAll();
        //레디스의 점유 좌석을 확인 하기 위한 list
        List<OcuppyMapper> ocuppyMappers = new ArrayList<>();
        //레디스의 점유 좌석을 매핑해줌
        for (RedisSeatEntity r : datad) {
            if (r != null) {//null 값 제외하고 받아옴
                String[] SeatNumber = r.getMiid().split(",");
                System.out.println(SeatNumber[0]);
                System.out.println(SeatNumber[1]);
                ocuppyMappers.add(new OcuppyMapper( Long.parseLong(SeatNumber[0]),  Long.parseLong(SeatNumber[1])));
            }
            //miid seatid로 추출해서 매핑
        }


        //try catch대신 bollean으로 for문돌림
        for (SeatEntity s : allDatas) {
            boolean check=false;
            for (MovieInfoSeatEntity se : ocuppyDatas) {
                if (s.getSid() == se.getSeat().getSid()) {  //점유된좌석이면 점유된 좌석 배열에 넣음
                    ableDatas.add(s);
                    check=true;
                    break;
                }

            }
            for(OcuppyMapper oc : ocuppyMappers){
                if(miid==oc.getMiid()){ //occupymapper의 miid와 먼저 비교
                    if(s.getSid()==oc.getSeatid()){ //seatid 로 비교
                        ableDatas.add(s);
                        check=true;
                        break;
                    }
                }

            }
            if(check==false){
                disableDatas.add(s);  //점유된 좌석이 아닌것
            }
        }
        List<SeatDto> able = ableDatas.stream().map((seat) -> seatMapper.toAble(seat, "able")).collect(Collectors.toList());
        List<SeatDto> disable = disableDatas.stream().map((seat) -> seatMapper.toAble(seat, "disable")).collect(Collectors.toList());
        //able과 disalbe로 dto 매핑후 합침
        for (SeatDto seat : disable) {
            able.add(seat);
        }
        Collections.sort(able, new SortUtil()); //이 함수는 뒤죽박죽인 자리를 순서대로 되돌려둠
            return able;


    }
    @Transactional
    public void setValues(String name, String age , HttpServletRequest request) {
        //name : miid , age : seatid
        jwtValidCheck.JwtCheck(request, "ATK");
        boolean check =false;
        String[] SeatNumber = age.split(",");
        for (String k : SeatNumber) {
            String keys = "";
            keys = "seat:" + name + "," + k;
            try {
                if (!redisTemplate.hasKey(keys)) { //키가 있는지 없는지 검사를 한다. 키가 있으면 예외처리를 통해 종료.
                    System.out.println("key 가 없습니다.");
                } else {
                    throw new SeatOccupyException("점유된 좌석입니다."); //키가 있으면 종료 시킴
                }
            } catch (SeatOccupyException e) {
                e.printStackTrace();
                check=true;
            }
        }
        //점유된 좌석이 없으면 키 삽입 시작
        if (check==false) {
            for (String k : SeatNumber) {
                String keys = "";
                keys = name + "," + k;
                    System.out.println("안에 겹치는 데이터가 없으므로 key 삽입");
                    RedisSeatEntity redisSeatEntity = new RedisSeatEntity(keys, k);
                    redisSeatRepository.save(redisSeatEntity);
            }
        }
        else {
            throw new SeatOccupyException("점유된 좌석입니다.");
        }

    }

    // 데이터 가져오기
    public String getValues(){
        SetOperations<String, Object> setOperations = redisTemplate.opsForSet();
        return setOperations.toString();
    }

}
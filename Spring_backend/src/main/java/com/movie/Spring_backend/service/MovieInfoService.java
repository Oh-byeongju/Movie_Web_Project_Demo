package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor

public class MovieInfoService {
    private final MovieInfoRepository movieInfoRepository;


    @Transactional
    public List<MovieInfoDto> findAllMiday() {
            List<MovieInfoEntity> datas = movieInfoRepository.findAll();
        return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());
    }


    //movieinfo에서 movie 데이터를 받아서 cid 추출하는 서비스
    @Transactional
    public List<Long> findByMovie(Long id){
        //외래키로 엔티티 검색 위해 매핑
        MovieEntity movieEntity= MovieEntity.builder().mid(id).build();
        List<MovieInfoEntity> datas = movieInfoRepository.findByMovie(movieEntity);

        List<Long> mappedcid = new ArrayList<>();
        //cid 추출
        for(MovieInfoEntity cc :datas){
            mappedcid.add(cc.getCinema().getCid());
        }
        return mappedcid;
    }
    @Transactional
    public List<MovieInfoDto> findByMovieToDay(Long id){
        //외래키로 엔티티 검색 위해 매핑

        List<MovieInfoEntity> datas = movieInfoRepository.findByMovieToDay(id);

      return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());

    }






    //~ing
    @Transactional
    public List<MovieInfoDto> findByCinemaCidIn(List<Long> cid){
        List<MovieInfoEntity> datas = movieInfoRepository.findByCinemaCidIn(cid);
        if(!datas.isEmpty()){
            List<MovieInfoDto> datad = datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());
            return datad;
        }
        else{
            throw new MovieNotFoundException("검색 결과 없습니다.");
        }
    }

    @Transactional
    public List<MovieInfoDto> findByMovieTheaterDay(List<Long> cid, Long mid){

        List<MovieInfoEntity> datas= movieInfoRepository.findByCinemaCidInAndMovieMid(cid, mid);
        return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).miday(data.getMiday()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).build()).collect(Collectors.toList());

    }


}


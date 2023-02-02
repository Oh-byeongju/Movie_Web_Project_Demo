package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class MovieInfoService {
    private final MovieInfoRepository movieInfoRepository;
    private final MovieInfoRepository TestMapping;


    public MovieInfoService(MovieInfoRepository movieInfoRepository, MovieInfoRepository testMapping){
        this.movieInfoRepository=movieInfoRepository;
        TestMapping = testMapping;
    }

    public List<MovieInfoDto> findAll() {
        List<MovieInfoEntity> datas = movieInfoRepository.findAll();
        return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).movie(data.getMovie()).cinema(data.getCinema()).build()).collect(Collectors.toList());
    }



    public List<MovieInfoDto> findByMovieMid(Long id){
        List<MovieInfoEntity> datas = movieInfoRepository.findByMovieMid(id);
        if(!datas.isEmpty()){
            System.out.println(datas);
            return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).movie(data.getMovie()).cinema(data.getCinema()).build()).collect(Collectors.toList());
        }
        else{
            throw new MovieNotFoundException("검색 결과 없습니다.");
        }
    }


}


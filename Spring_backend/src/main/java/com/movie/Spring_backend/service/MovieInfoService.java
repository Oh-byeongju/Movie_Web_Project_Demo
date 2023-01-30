package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class MovieInfoService {
    private final MovieInfoRepository movieInfoRepository;

    public MovieInfoService(MovieInfoRepository movieInfoRepository){
        this.movieInfoRepository=movieInfoRepository;
    }

    public List<MovieInfoDto> findAll() {
        List<MovieInfoEntity> datas = movieInfoRepository.findAll();
        return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).temp(data.getTemp()).cinema(data.getCinema()).build()).collect(Collectors.toList());
    }

    public MovieInfoDto findByMid(Long id) {
        MovieInfoEntity data = movieInfoRepository.findById(id).orElseThrow(()->new RuntimeException("오류"));
        Long ids= data.getMiid();
        System.out.println(ids);
        return MovieInfoDto.builder().miid(ids).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).temp(data.getTemp()).cinema(data.getCinema()).build();
    }

    public List<MovieInfoDto> findAllByTempMid(Long id){
        List<MovieInfoEntity> datas = movieInfoRepository.findAllByTempMid(id);
            return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).temp(data.getTemp()).cinema(data.getCinema()).build()).collect(Collectors.toList());
    }
}


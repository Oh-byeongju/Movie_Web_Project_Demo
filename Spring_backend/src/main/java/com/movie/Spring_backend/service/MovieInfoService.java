package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class MovieInfoService {
    private final MovieInfoRepository movieInfoRepository;


    public MovieInfoService(MovieInfoRepository movieInfoRepository){
        this.movieInfoRepository=movieInfoRepository;
    }
    @Transactional
    public List<MovieInfoDto> findAll() {
        List<MovieInfoEntity> datas = movieInfoRepository.findAll();
        return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).movie(data.getMovie()).cinema(data.getCinema()).build()).collect(Collectors.toList());
    }


    @Transactional
    public List<MovieInfoDto> findByMovie(MovieEntity id){
        List<MovieInfoEntity> datas = movieInfoRepository.findByMovie(id);
        if(!datas.isEmpty()){
            System.out.println(datas);
            return datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).movie(data.getMovie()).cinema(data.getCinema()).build()).collect(Collectors.toList());
        }
        else{
            throw new MovieNotFoundException("검색 결과 없습니다.");
        }
    }




    //~ing
    @Transactional
    public List<MovieInfoDto> findByCinemaCidIn(List<Long> cid){
        List<MovieInfoEntity> datas = movieInfoRepository.findByCinemaCidIn(cid);
        if(!datas.isEmpty()){
            List<MovieInfoDto> datad = datas.stream().map(data -> MovieInfoDto.builder().miid(data.getMiid()).mistarttime(data.getMistarttime()).miendtime(data.getMiendtime()).movie(data.getMovie()).cinema(data.getCinema()).build()).collect(Collectors.toList());
            return datad;
        }
        else{
            throw new MovieNotFoundException("검색 결과 없습니다.");
        }
    }




}


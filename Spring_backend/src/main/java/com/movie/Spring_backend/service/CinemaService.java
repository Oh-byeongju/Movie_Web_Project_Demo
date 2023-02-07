package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.repository.CinemaRepository;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CinemaService {
    private final CinemaRepository cinemaRepository;
    private final MovieInfoRepository movieInfoRepository;
    private final MovieService movieService;
    @Transactional
    public List<CinemaDto> findByCidIn(List<Long> id) {

        List<CinemaEntity> datas = cinemaRepository.findByCidIn(id);
        if (!datas.isEmpty()) {
            return datas.stream().map(data->CinemaDto.builder().cid(data.getCid()).cname(data.getCname()).ctype(data.getCtype()).cseat(data.getCseat()).theater(data.getTheater()).build()).collect(Collectors.toList());

        } else {
            System.out.println("error");
            throw new MovieNotFoundException("검색 결과 없습니다.");

        }
    }
    @Transactional
    public List<MovieDto> findByTheater(Long id) {
        //tid를 이용해서 cid 추출

        TheaterEntity theaterEntity = TheaterEntity.builder().tid(id).build();

        List<CinemaEntity> datas = cinemaRepository.findByTheater(theaterEntity);
        List<Long> mappedcid = new ArrayList<>();

        for(CinemaEntity cc :datas){
            mappedcid.add(cc.getCid());
        }

        List <MovieInfoEntity> dataM = movieInfoRepository.findByCinemaCidIn(mappedcid);
        List<Long> mappedMid = new ArrayList<>();

        for(MovieInfoEntity mm :dataM){
            mappedMid.add(mm.getMovie().getMid());
        }
        return movieService.findByMidIn(mappedMid);



    }



}


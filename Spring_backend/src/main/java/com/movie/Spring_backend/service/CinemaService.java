package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import com.movie.Spring_backend.exceptionlist.MovieNotFoundException;
import com.movie.Spring_backend.repository.CinemaRepository;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CinemaService {
    private final CinemaRepository cinemaRepository;
    private final MovieInfoRepository movieInfoRepository;

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
    public List<CinemaDto> findByTheater(TheaterEntity id) {
        //tid를 이용해서 cid 추출
        List<CinemaEntity> datas = cinemaRepository.findByTheater(id);
        if (!datas.isEmpty()) {
            List<CinemaDto> datad = datas.stream().map(data -> CinemaDto.builder().cid(data.getCid()).cname(data.getCname()).ctype(data.getCtype()).cseat(data.getCseat()).theater(data.getTheater()).build()).collect(Collectors.toList());

            //cid만 추출

            //movieinforepository의 findby

            return datad;

        } else {
            System.out.println("error");
            throw new MovieNotFoundException("검색 결과 없습니다.");

        }

    }



}


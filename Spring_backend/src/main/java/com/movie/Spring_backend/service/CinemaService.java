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
    public Set<String> findByCidInTarea(List<Long> id) {

        List<CinemaEntity> datas = cinemaRepository.findByCidIn(id);

        Set<String> duplication = new HashSet<>();
        //cid 추출
        for(CinemaEntity cc :datas){
            duplication.add(cc.getTheater().getTarea());
        }
        return duplication;


    }

    @Transactional
    public List<Long> findByCidInTid(List<Long> id) {

        List<CinemaEntity> datas = cinemaRepository.findByCidIn(id);

        List<Long> duplication = new ArrayList<>();
        //cid 추출
        for(CinemaEntity cc :datas){
            duplication.add(cc.getTheater().getTid());
        }
        return duplication;


    }
    @Transactional
    public List<MovieDto> findByTheater(Long id) {

        //외래키 검색을 위해 엔티티 매핑
        TheaterEntity theaterEntity = TheaterEntity.builder().tid(id).build();

        //위에서 매핑한 theater엔티티를 이용해서 cinema에서 cid 추출하기
        List<CinemaEntity> datas = cinemaRepository.findByTheater(theaterEntity);
        List<Long> mappedcid = new ArrayList<>();
        //cid 추출
        for(CinemaEntity cc :datas){
            mappedcid.add(cc.getCid());
        }

        System.out.print(mappedcid);
        //cid in을 이용해서 movieinfo에서 mid 추출
        List <MovieInfoEntity> dataM = movieInfoRepository.findByCinemaCidIn(mappedcid);
        List<Long> mappedMid = new ArrayList<>();

        for(MovieInfoEntity mm :dataM){
            mappedMid.add(mm.getMovie().getMid());
        }
        System.out.print(mappedMid);
        //mid 검색을 통해 무비 조회
        return movieService.findByMidIn(mappedMid);

    }

    @Transactional
    public List<Long> findByTheaterday(Long id) {

        //외래키 검색을 위해 엔티티 매핑
        TheaterEntity theaterEntity = TheaterEntity.builder().tid(id).build();

        //위에서 매핑한 theater엔티티를 이용해서 cinema에서 cid 추출하기
        List<CinemaEntity> datas = cinemaRepository.findByTheater(theaterEntity);
        List<Long> mappedcid = new ArrayList<>();
        //cid 추출
        for (CinemaEntity cc : datas) {
            mappedcid.add(cc.getCid());
        }
        return mappedcid;
    }




    }


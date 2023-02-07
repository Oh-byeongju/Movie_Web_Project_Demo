package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import com.movie.Spring_backend.service.CinemaService;
import com.movie.Spring_backend.service.MovieInfoService;
import com.movie.Spring_backend.service.MovieService;
import com.movie.Spring_backend.service.TheaterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

//crossorigin 바꿔야함
import java.util.List;
@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/infomovie")
public class MovieInfoController {

    private final MovieInfoService movieInfoService;
    private final CinemaService cinemaService;

    private final MovieService movieService;
    private final TheaterService theaterService;
    @GetMapping("/normal/movieinfo")
    public ResponseEntity<List<MovieInfoDto>> getData() {
        return ResponseEntity.ok().body(movieInfoService.findAll());
    }

    
    //현재오류
     @GetMapping("/normal/movieselect")
     public Set<String> findByMovie(@RequestParam MovieEntity id) {
        //영화 아이디로 영화 정보 추출 CID를 리스트로 추출
        List<Long> datas = movieInfoService.findByMovie(id).stream().map(MovieInfoDto::getCinema).collect(Collectors.toList()).stream().map(CinemaEntity::getCid).collect(Collectors.toList());
        //cinema 사용
        //추출한 cid만큼 tid 검


        List<String> theaterArea = cinemaService.findByCidIn(datas).stream().map(CinemaDto::getTheater).collect(Collectors.toList()).stream().map(TheaterEntity::getTarea).collect(Collectors.toList());
        Set<String> duplication = new HashSet<>();

        duplication.addAll(theaterArea);
        System.out.println(duplication);
        return duplication;
    }


    @GetMapping("/normal/movietheater")
    //선택한 지역에 따라 지역 검색
    public List<TheaterDto> getMovieTheaetr(@RequestParam MovieEntity id, @RequestParam String area) {

        List<Long> datad = movieInfoService.findByMovie(id).stream().map(MovieInfoDto::getCinema).collect(Collectors.toList()).stream().map(CinemaEntity::getCid).collect(Collectors.toList());
        //추출한 cid만큼 tid 검색
        //cid로 tid 추출하기
        List<Long> theaterId = cinemaService.findByCidIn(datad).stream().map(CinemaDto::getTheater).collect(Collectors.toList()).stream().map(TheaterEntity::getTid).collect(Collectors.toList());


        return theaterService.findByTidInAndTarea(theaterId, area);


    }
}

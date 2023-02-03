package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import com.movie.Spring_backend.service.CinemaService;
import com.movie.Spring_backend.service.MovieInfoService;
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

    private final TheaterService theaterService;
    @GetMapping("/normal/movieinfo")
    public ResponseEntity<List<MovieInfoDto>> getData() {
        return ResponseEntity.ok().body(movieInfoService.findAll());
    }

    @GetMapping("/normal/movieselect")
    public Set<String> findByMovieMid(@RequestParam Long id) {
        //영화 아이디로 영화 정보 추출 CID를 리스트로 추출
        List<Long> datas = movieInfoService.findByMovieMid(id).stream().map(MovieInfoDto::getCinema).collect(Collectors.toList()).stream().map(CinemaEntity::getCid).collect(Collectors.toList());
        //cinema 사용
        List<CinemaDto> list = new ArrayList<>();
        //추출한 cid만큼 tid 검색
        for (Long TheatersId : datas) {
            List<CinemaDto> cinema = cinemaService.findByCid(TheatersId);
            list.addAll(cinema);
        }

        Set<String> duplication = new HashSet<>();
        List<String> area = list.stream().map(CinemaDto::getTheater).collect(Collectors.toList()).stream().map(TheaterEntity::getTarea).collect(Collectors.toList());
        duplication.addAll(area);


        return duplication;

    }



    @GetMapping("/normal/movietheater")
    //선택한 지역에 따라 지역 검색
    public List<TheaterDto> getMovieTheaetr(@RequestParam Long id, @RequestParam String area) {
        List<Long> datad = movieInfoService.findByMovieMid(id).stream().map(MovieInfoDto::getCinema).collect(Collectors.toList()).stream().map(CinemaEntity::getCid).collect(Collectors.toList());

        List<CinemaDto> lists = new ArrayList<>();
        //추출한 cid만큼 tid 검색
        for (Long TheatersId : datad) {
            List<CinemaDto> cinema = cinemaService.findByCid(TheatersId);
            lists.addAll(cinema);
        }

        Set<String> duplications = new HashSet<>();
        List<String> areas = lists.stream().map(CinemaDto::getTheater).collect(Collectors.toList()).stream().map(TheaterEntity::getTarea).collect(Collectors.toList());
        List<Long> TheaterId = lists.stream().map(CinemaDto::getTheater).collect(Collectors.toList()).stream().map(TheaterEntity::getTid).collect(Collectors.toList());

        duplications.addAll(areas);

        return theaterService.findByTidInAndTarea(TheaterId, area);



    }
}

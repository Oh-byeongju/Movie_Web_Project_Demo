package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.TheaterDto;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import com.movie.Spring_backend.mapper.ScheduleMapper;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.service.CinemaService;
import com.movie.Spring_backend.service.MovieInfoService;
import com.movie.Spring_backend.service.MovieService;
import com.movie.Spring_backend.service.TheaterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.Set;
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
    final TheaterService theaterService;
    private final MovieInfoRepository movieInfoRepository;

    @GetMapping("/normal/movieinfo")
    public List<MovieInfoDto> getData() {
        return movieInfoService.findAllMiday();
    }


    //영화 클릭 시 영화id로 극장 검색
    @GetMapping("/normal/movieselect")
    public List<TheaterDto> findByMovie(@RequestParam Long id) {
        //영화 아이디로 영화 정보 추출 CID를 리스트로 추출
        Set<Long> datas = movieInfoService.findByMovie(id);
        List<Long> tid = cinemaService.findByCidIn(datas);

        return theaterService.findByTidIn(tid);
    }

    //영화로 날짜 검색
    @GetMapping("/normal/movieselectday")
    public List<MovieInfoDto> findByMovieToDay(@RequestParam Long id) {
        //영화 아이디로 영화 정보 추출 CID를 리스트로 추출
        //여기선 taea를 추출해야함
        //여기서 같이 영화에 대한 상영정보 전달하
        return movieInfoService.findByMovieToDay(id);
        //영화 검색 시 해당하는 상영 날짜 추출
    }

    //극장으로 날짜 검색
    @GetMapping("/normal/theaterday")
    public List<MovieInfoDto> getTheaterDay(@RequestParam Long id) {
        //Long cid에 담겨있음

        //메핑된 cid로 movieinfo 검색
        return movieInfoService.findByCinemaCidIn(id);

    }
    //영화+극장 날짜검색
    @GetMapping("/normal/movietheaterday")
    public List<MovieInfoDto> findByMovieTheaterDay(@RequestParam Long tid, @RequestParam Long mid) {

        List<Long> mappedcid = cinemaService.findByTheaterday(tid);

        return movieInfoService.findByMovieTheaterDay(mappedcid, mid);
    }

    
    //날짜로 극장이랑 영화를 추출해야한다.
    @GetMapping("/normal/daytomovie")
    public List<MovieDto> findByDayToMovie(@RequestParam Date miday) {
        //우선 날짜로 mid를 추출해야함
        List<Long> mid = movieInfoService.findByMidayToMid(miday);
        //mid로 movieentity검색하면서
        //그리고 able disable을 시키자
        return movieService.findByMovieableDisable(mid);
    }


    //날짜로 극장


    @GetMapping("/normal/daytotheater")
    public List<TheaterDto> findByDayToTheater(@RequestParam Date miday) {
        //우선 날짜로 mid를 추출해야함
        Set<Long> cid = movieInfoService.findByMidayToCid(miday);
        //cid로 tid를 추출해야한다.
        List<Long> tid = cinemaService.findByCidIn(cid);

        return theaterService.findByTidIn(tid);
    }


    //날짜 + 극장 = 영화
    @GetMapping("/normal/daytheatertomovie")
    public List<MovieDto> findByDayTheaterToMovie(@RequestParam Date miday, @RequestParam Long tid) {
        //우선 tid로 cid를 추출해야함
        List<Long> cid = cinemaService.findByTheaterday(tid);
        //이제 cid와 miday로 mid를 추출해야함
        //여기서 miday와 cid로 mid 추출
        List<Long> mid = movieInfoService.findByMidayAndCinemaCidIn(miday,cid);
        return movieService.findByMovieableDisable(mid);
    }

    //날짜 + 영화 = 극장
    @GetMapping("/normal/daymovietotheater")
    public List<TheaterDto> findByDayMovieToTheater(@RequestParam Date miday, @RequestParam Long mid){
        //miday랑 mid로 cid 추출
        List<Long> cid=movieInfoService.findByMidayAndMovieMid(miday,mid);
        List<Long> tid= cinemaService.SelectTid(cid);

        return theaterService.findByTidIn(tid);
    }

    @GetMapping("normal/Schedule")
    public List<MovieInfoDto> findBySchedule(@RequestParam Date miday , @RequestParam Long mid, @RequestParam Long tid){
        List<Long> cid = cinemaService.findByTheaterday(tid);
        return movieInfoService.findBySchedule(miday,mid,cid);
    }


    @GetMapping("normal/findtest")
    public List<ScheduleMapper> findtest(@RequestParam Long mid , @RequestParam Date miday, @RequestParam String area,@RequestParam Long tid,
    @RequestParam String message){
        if(message.equals("movie")) {
            System.out.println("극장조회");
            List<ScheduleMapper>  cinema= movieInfoService.findTest(mid, miday, area);
            return cinema;
        }
        else if(message.equals("theater")){
            System.out.println("영화조회");

            List<ScheduleMapper> movie = movieInfoService.findByTheater(miday,tid);
            return movie;
        }
        return null;
    }

    //영화 스케쥴 페이지에서 날짜 검색(movie: 영화 기준, theater: 극장 기준)
    @GetMapping("/normal/timeselect")
    public List<MovieInfoDto> timeselect(@RequestParam Long mid,@RequestParam Long tid,@RequestParam String message) {

        if(message.equals("movie")){
            List<MovieInfoDto> mappedmid = movieInfoService.findByMovieToDay(mid);
            return mappedmid;
        }
        else if(message.equals("theater")){
            List<MovieInfoDto> theater = movieInfoService.findByCinemaCidIn(tid);
            return theater;
        }
        return null;
        //영화 검색 시 해당하는 상영 날짜 추출
    }


}
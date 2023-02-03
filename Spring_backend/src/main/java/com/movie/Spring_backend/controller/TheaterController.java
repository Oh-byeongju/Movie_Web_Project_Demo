package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.TheaterDto;

import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.TheaterEntity;
import com.movie.Spring_backend.repository.CinemaRepository;
import com.movie.Spring_backend.service.TheaterService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/v2")
public class TheaterController {

    private final TheaterService theaterService;
    MovieInfoController movieInfoService;
    CinemaRepository cinemaService;
    MovieInfoDto movieInfoDto;

    @GetMapping("/normal/area")
    public Set<String> getData() {

        Set<String> duplication= new HashSet<>();
        List<TheaterDto> theater =theaterService.getInfo();

        List<String> area  = theater.stream().map(TheaterDto::getTarea).collect(Collectors.toList());

                duplication.addAll(area);

        System.out.println(duplication);

        return duplication;
    }


    @GetMapping("/normal/theater")
    //선택한 지역에 따라 지역 검색
    public ResponseEntity<List<TheaterDto>> findByTarea(@RequestParam String area) {
        return ResponseEntity.ok().body(theaterService.findByTarea(area));
    }

}


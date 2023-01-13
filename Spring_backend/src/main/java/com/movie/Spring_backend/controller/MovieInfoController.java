package com.movie.Spring_backend.controller;


import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.dto.TempDto;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.service.MovieInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/infomovie")
public class MovieInfoController {

    private final MovieInfoService movieInfoService;
    private final MovieInfoRepository movieInfoRepository;

    @GetMapping("/movieinfo")
    public ResponseEntity<List<MovieInfoDto>> getData() {
        return ResponseEntity.ok().body(movieInfoService.findAll());
    }

    @GetMapping("/movieselect")
    public ResponseEntity<MovieInfoEntity> getInfo(@RequestParam Long id){
        Optional<MovieInfoEntity> info= movieInfoService.findById(id);
        return new ResponseEntity<MovieInfoEntity>(info.get(), HttpStatus.OK);
    }



}

package com.movie.Spring_backend.controller;


import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.service.MovieInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/infomovie")
public class MovieInfoController {

    private final MovieInfoService movieInfoService;
    private final MovieInfoRepository movieInfoRepository;

    @GetMapping("/normal/movieinfo")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<MovieInfoDto>> getData() {
        return ResponseEntity.ok().body(movieInfoService.findAll());
    }

    @PostMapping("/normal/selectmovie")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<MovieInfoDto>> findMid(@RequestParam Long id){
        return ResponseEntity.ok().body(movieInfoService.findAllByTempMid(id)); //findAllby + 외래키를 가진 Entity명 + 외래키 컬럼명
    }


    @GetMapping("/normal/movieselect")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<MovieInfoDto> getInfo(@RequestParam Long id){
        return ResponseEntity.ok().body(movieInfoService.findByMid(id));
    }



}

package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.service.MovieInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/infomovie")
public class MovieInfoController {

    private final MovieInfoService movieInfoService;

    @GetMapping("/normal/movieinfo")
    public ResponseEntity<List<MovieInfoDto>> getData() {
        return ResponseEntity.ok().body(movieInfoService.findAll());
    }

    @GetMapping("/normal/movieselect")
    public ResponseEntity<List<MovieInfoDto>> findAllByTempMid(@RequestParam Long id) {
        return ResponseEntity.ok().body(movieInfoService.findByTempMid(id));
    }
}

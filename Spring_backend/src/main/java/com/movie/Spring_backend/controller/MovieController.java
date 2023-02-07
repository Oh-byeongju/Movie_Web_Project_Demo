package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/v2")

public class MovieController {
    private final MovieService movieService;

    // 전체 영화 가져오는 메소드
    @GetMapping("/normal/movie")
    public ResponseEntity<List<MovieDto>> AllMovie(@RequestParam("uid") String uid) {
        return ResponseEntity.ok().body(movieService.getAllMovie(uid));
    }

    // 사용자가 영화를 검색할때 사용되는 메소드
    @GetMapping("/normal/searchmovie")
    public ResponseEntity<List<MovieDto>> SearchTitle(@RequestParam(value = "title") String title, @RequestParam(value = "uid") String uid){
        return ResponseEntity.ok().body(movieService.findByMtitleContaining(title, uid));
    }
}
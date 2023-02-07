package com.movie.Spring_backend.controller;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.entity.MovieMemberEntity;
import com.movie.Spring_backend.service.MovieService;
import com.movie.Spring_backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/v2")

public class MovieController {
    private final MovieService movieService;

    @GetMapping("/normal/movie")
    public ResponseEntity<List<MovieDto>> getData() {
        return ResponseEntity.ok().body(movieService.getMovie());
    }

    @GetMapping("/normal/searchmovie")
    public ResponseEntity<List<MovieDto>> SearchTitle(@RequestParam String title){
        return ResponseEntity.ok().body(movieService.findByMtitleContaining(title));
    }

    // test중 // 이거 나중에 String으로 받는 dto로 바꿔야 내가 편할듯
    @GetMapping("/normal/test")
    public ResponseEntity<List<MovieDto>> Check(@RequestParam String uid) {
        return ResponseEntity.ok().body(movieService.getTest(uid));
    }
}




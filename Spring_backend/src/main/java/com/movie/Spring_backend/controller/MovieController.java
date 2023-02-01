package com.movie.Spring_backend.controller;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/v2")

public class MovieController {
    private final MovieService movieService;

    @GetMapping("/normal/movie")
<<<<<<< HEAD
    public ResponseEntity<List<MovieDto>> getData() {
        return ResponseEntity.ok().body(movieService.getMovie());
    }
=======
    public ResponseEntity<List<MovieDto>> getData() { return ResponseEntity.ok().body(movieService.getMovie()); }
>>>>>>> 7654984befab0def77a3b6b9db6ecb73507ec304

    @GetMapping("/normal/searchmovie")
    public ResponseEntity<List<MovieDto>> SearchTitle(@RequestParam String title){
        return ResponseEntity.ok().body(movieService.findByMtitleContaining(title));
    }

}




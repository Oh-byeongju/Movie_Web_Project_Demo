package com.movie.Spring_backend.controller;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/v2")

public class MovieController {
    private final MovieService movieService;

    @GetMapping("/normal/movie")
    @CrossOrigin(origins = "*")
    public ResponseEntity<List<MovieDto>> getData() {
        return ResponseEntity.ok().body(movieService.getMovie());
    }

    @GetMapping("/normal/searchmovie")
    @CrossOrigin(origins = "*")
    public ResponseEntity<List<MovieDto>> SearchTitle(@RequestParam String title){
        return ResponseEntity.ok().body(movieService.findByMtitleContaining(title));
    }

}




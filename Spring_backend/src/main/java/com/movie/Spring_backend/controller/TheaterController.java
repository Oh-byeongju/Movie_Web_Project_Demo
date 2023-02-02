package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.TheaterDto;

import com.movie.Spring_backend.service.TheaterService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/v2")
public class TheaterController {

    private final TheaterService theaterService;

    @GetMapping("/normal/theater")
    public ResponseEntity<List<TheaterDto>> getData() {
        return ResponseEntity.ok().body(theaterService.getInfo());
    }
}
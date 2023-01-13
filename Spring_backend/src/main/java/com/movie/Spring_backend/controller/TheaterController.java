package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.TheaterDto;

import com.movie.Spring_backend.entity.TheaterEntity;
import com.movie.Spring_backend.service.TheaterService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/v2")
public class TheaterController {

    private final TheaterService theaterService;


    @GetMapping("/theater")
    @CrossOrigin(origins = "http://localhost:3000")

    public ResponseEntity<List<TheaterDto>> getData() {
        return ResponseEntity.ok().body(theaterService.getInfo());
    }



}
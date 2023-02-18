package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.dto.SeatDto;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/seat")
public class SeatController {

    private final SeatService seatService;

    @GetMapping("/normal/infoseat")
    public List<SeatDto> findBySeat(@RequestParam Long id) {
        return seatService.findBySeat(id);
    }
}

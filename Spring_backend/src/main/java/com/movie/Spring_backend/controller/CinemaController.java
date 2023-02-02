package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.CinemaEntity;
import com.movie.Spring_backend.service.CinemaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.movie.Spring_backend.dto.CinemaDto;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServlet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/v2")
public class CinemaController {
    //리액트 -> 컨트롤러 전달
    private final CinemaService cinemaservice;




}
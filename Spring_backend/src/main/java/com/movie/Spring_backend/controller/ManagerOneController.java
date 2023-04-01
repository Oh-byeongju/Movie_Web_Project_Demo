package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.service.ManagerOneService;
import com.movie.Spring_backend.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/manager")
public class ManagerOneController {

    String POSTER_PATH = "/Users/mok/Desktop/Movie_Project/React_frontend/public/img/ranking";

    private final MovieService movieService;
    private final JwtValidCheck jwtValidCheck;
    private final ManagerOneService managerOneService;
    @GetMapping("/auth/movieall")
    public ResponseEntity<List<MovieDto>> AllMovie(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerOneService.getAllMovie(requestMap));
    }


    //영화를 저장하는 메소드
    @PostMapping("/auth/postmovie")
    public void postMovie(@RequestPart(value="data") Map<String, String> requestMap,HttpServletRequest request,
                          @RequestPart(required = false) MultipartFile multipartFiles
    )     throws SQLException {
        managerOneService.postMovie(requestMap,request,multipartFiles);
    }







}

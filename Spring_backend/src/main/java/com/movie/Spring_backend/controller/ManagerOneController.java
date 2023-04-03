package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.mapper.CountCommentMapper;
import com.movie.Spring_backend.service.BoardCommentService;
import com.movie.Spring_backend.service.BoardService;
import com.movie.Spring_backend.service.ManagerOneService;
import com.movie.Spring_backend.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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

    private final BoardService boardService;

    private final BoardCommentService boardCommentService;
    //영화 가져오기
    @GetMapping("/auth/movieall")
    public ResponseEntity<List<MovieDto>> AllMovie(@RequestParam Map<String, String> requestMap) {
        return ResponseEntity.ok().body(managerOneService.getAllMovie(requestMap));
    }


    //영화를 저장, 수정, 삭제하는 메소드
    @PostMapping("/auth/postmovie")
    public void postMovie(@RequestPart(value="data") Map<String, String> requestMap,HttpServletRequest request,
                          @RequestPart(required = false) MultipartFile multipartFiles
    )     throws SQLException {
        managerOneService.postMovie(requestMap,request,multipartFiles);
    }


    @GetMapping("/auth/boardread")
    public ResponseEntity<List<BoardDto>> BoardWrite() {
        return ResponseEntity.ok().body(managerOneService.ReadBoard());
    }

    @GetMapping("/auth/boardselect")
    public ResponseEntity<List<BoardDto>> BoardSelect(@RequestParam("text") String text ,@RequestParam("state") String state){
        return ResponseEntity.ok().body(managerOneService.SearchUid(text,state));
    }

    @PostMapping("/auth/deleteboard")
    public void BoardDelete(@RequestBody Map<String, String> requestMap, HttpServletRequest request){

        managerOneService.boarddelete(requestMap,request);

    }
    @GetMapping("/auth/commentread")
    public ResponseEntity<CountCommentMapper> commentAll(@RequestParam("bid") Long bid, @RequestParam("type") String type) {

        if(type.equals("new")) {
            return ResponseEntity.ok().body(boardCommentService.findByComment(bid));
        }
        return null;
    }






}

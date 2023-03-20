/*
  23-03-17 마이페이지에 있는 영화 관련 메소드 생성(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.CommentInfoDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.service.MyPageMovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/MyPageMovie")
public class MyPageMovieController {

    private final MyPageMovieService myPageMovieService;

    // 관람평 작성이 가능한 영화 가져오는 메소드
    @GetMapping("/auth/moviePossible")
    public ResponseEntity<List<MovieDto>> MovieMemberPossible(HttpServletRequest request) {
        return ResponseEntity.ok().body(myPageMovieService.MoviePossibleGet(request));
    }

    // 관람평 작성을 위한 메소드, 작성에 성공할 경우 noContent 리턴
    @PostMapping("/auth/InsertComment")
    public ResponseEntity<String> InsertComment(@RequestBody Map<String, String> requestMap, HttpServletRequest request) {
        myPageMovieService.MovieCommentWrite(requestMap, request);
        return ResponseEntity.noContent().build();
    }

    // 사용자가 작성한 관람평 가져오는 메소드
    @GetMapping("/auth/GetComment")
    public ResponseEntity<List<CommentInfoDto>> MemberGetComment(HttpServletRequest request) {
        return ResponseEntity.ok().body(myPageMovieService.MovieCommentSearch(request));
    }

    // 사용자가 좋아요 누른 영화 가져오는 메소드
    @GetMapping("/auth/movieLike")
    public ResponseEntity<List<MovieDto>> MovieMemberLike(HttpServletRequest request) {
        return ResponseEntity.ok().body(myPageMovieService.MovieLikeGet(request));
    }
}
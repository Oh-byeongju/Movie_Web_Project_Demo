/*
  23-02-09 로그인한 유저가 영화에 관련된 행위를 할때 사용되는 Controller 구현(오병주)
  23-02-13 관람평 작성 메소드 구현(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.service.MovieMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/MovieMember")
public class MovieMemberController {

    private final MovieMemberService movieMemberService;

    // 좋아요 토글을 위한 메소드, 토글을 성공할 경우 noContent 리턴
    @PostMapping("/auth/LikeToggle")
    public ResponseEntity<String> LikeToggle(@RequestBody Map<String, String> requestMap, HttpServletRequest request) {
        movieMemberService.MovieLikeUpdate(requestMap, request);
        return ResponseEntity.noContent().build();
    }

    // 관람평 작성을 위한 메소드, 작성에 성공할 경우 noContent 리턴
    @PostMapping("/auth/InsertComment")
    public ResponseEntity<String> InsertComment(@RequestBody Map<String, String> requestMap, HttpServletRequest request) {
        movieMemberService.MovieLikeUpdate(requestMap, request);
        return ResponseEntity.noContent().build();
    }
}
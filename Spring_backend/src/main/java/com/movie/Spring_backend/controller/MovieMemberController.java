/*
  23-02-09 로그인한 유저가 영화에 관련된 행위를 할때 사용되는 Controller 구현(오병주)
*/
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.service.MovieMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// 쿠키를 프론트단과 같이 사용하기 위해 allowCredentials를 true로 설정
@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/MovieMember")
public class MovieMemberController {

    private final MovieMemberService movieMemberService;

    // 좋아요 토글을 위한 메소드, 회원가입을 성공할 경우 noContent 리턴
    // 추후 auth로 교체
    // 내일 이거 뭐가 문젠지 생각해보기
    @PostMapping("/normal/LikeToggle")
    public ResponseEntity<String> LikeToggle(@RequestBody Map<String, String> requestMap) {
        movieMemberService.MovieLikeUpdate(requestMap);
        return ResponseEntity.noContent().build();
    }
}
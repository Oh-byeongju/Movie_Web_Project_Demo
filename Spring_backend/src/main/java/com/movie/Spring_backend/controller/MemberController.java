// 23-01-13 아이디 중복 검사 기능구현(오병주)
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// 나중에 cros localhost 3000번만 열고 닫기
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/signup")
public class MemberController {
    private final MemberService memberService;

    // 아이디 중복 검사를 위한 메소드, 중복된 아이디가 없을경우 noContent 리턴
    @GetMapping("/id")
    public ResponseEntity<String> existsId(@RequestParam("uid") String id) {
        memberService.existsId(id);
        return ResponseEntity.noContent().build();
    }
}
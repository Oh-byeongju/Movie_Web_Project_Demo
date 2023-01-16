//// 23-01-16 회원가입을 위한 Controller 생성(오병주)
//package com.movie.Spring_backend.controller;
//
//import com.movie.Spring_backend.dto.MemberDto;
//import com.movie.Spring_backend.service.AuthService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//// 나중에 cros localhost 3000번만 열고 닫기
//// 매핑이름좀 바꾸기 헷갈림
//@CrossOrigin(origins = "*")
//@RestController
//@RequestMapping("/auth")
//@RequiredArgsConstructor
//public class AuthController {
//
//    private final AuthService authService;
//
//    // 회원가입을 위한 메소드, 회원가입을 성공할 경우 noContent 리턴
//    @PostMapping("/signup")
//    public ResponseEntity<String> signup(@RequestBody MemberDto requestDto) {
//        authService.signup(requestDto);
//        return ResponseEntity.noContent().build();
//    }
//}

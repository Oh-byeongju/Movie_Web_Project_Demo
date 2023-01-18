// 23-01-13 아이디 중복 검사 메소드구현(오병주)
// 23-01-16 회원가입 및 로그인 메소드구현(오병주)
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.dto.TokenDto;
import com.movie.Spring_backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.AccessDeniedException;

// 나중에 cros localhost 3000번만 열고 닫기
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/normal")
public class MemberController {

    private final MemberService memberService;

    // 아이디 중복 검사를 위한 메소드, 중복된 아이디가 없을경우 noContent 리턴
    @GetMapping("/id")
    public ResponseEntity<String> existsId(@RequestParam("uid") String id) {
        memberService.existsId(id);
        return ResponseEntity.noContent().build();
    }

    // 회원가입을 위한 메소드, 회원가입을 성공할 경우 noContent 리턴
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody MemberDto requestDto) {
        memberService.signup(requestDto);
        return ResponseEntity.noContent().build();
    }

    // 로그인을 위한 메소드, id와 pw가 일치할 경우 Token을 생성하여 리턴
    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberDto requestDto) {
        return ResponseEntity.ok(memberService.login(requestDto));
    }

    // 리프레시 토큰을 이용한 토큰 재발급 메소드
    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenDto tokenRequestDto, HttpServletRequest request) throws AccessDeniedException {
        return ResponseEntity.ok(memberService.reissue(tokenRequestDto, request));
    }
}
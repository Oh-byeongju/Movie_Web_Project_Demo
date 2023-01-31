// 23-01-13 아이디 중복 검사 메소드구현(오병주)
// 23-01-16 회원가입 및 로그인 메소드구현(오병주)
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.config.SecurityUtil;
import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// 쿠키를 프론트단과 같이 사용하기 위해 allowCredentials를 true로 설정
@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    // 아이디 중복 검사를 위한 메소드, 중복된 아이디가 없을경우 noContent 리턴
    @GetMapping("/normal/id")
    public ResponseEntity<String> existsId(@RequestParam("uid") String id, HttpServletRequest request) {
        memberService.existsId(id);
        return ResponseEntity.noContent().build();
    }

    // 회원가입을 위한 메소드, 회원가입을 성공할 경우 noContent 리턴
    @PostMapping("/normal/signup")
    public ResponseEntity<String> signup(@RequestBody MemberDto requestDto) {
        memberService.signup(requestDto);
        return ResponseEntity.noContent().build();
    }

    // 로그인을 위한 메소드, id와 pw가 일치할 경우 Token을 생성하여 리턴
    @PostMapping("/normal/login")
    public ResponseEntity<MemberDto> login_check(@RequestBody MemberDto requestDto, HttpServletResponse response) {
        // 로그인한 유저의 이름
        MemberDto result = memberService.login(requestDto, response);
        return ResponseEntity.ok().body(result);
    }

    // 로그인 상태를 확인하는 메소드
    @GetMapping("/normal/login_status")
    public ResponseEntity<MemberDto> getMyInfoBySecurity(HttpServletRequest request) {


        // 지금 현재 이부분을 메소드로 하나 빼서 사용해야함(내일 할때 리액트단에 있는 임의의 그거도 스프링으로 하드코딩 하듯이 해주기)
        String paramToken = request.getHeader("Checktoken");
        System.out.println("이게 헤더에 있는거");
        System.out.println(paramToken);

        Cookie[] Cookies = request.getCookies();

        // 쿠키가 없을 예외처리
        if (Cookies == null) {
            return null;
        };

        // ATK 토큰의 값을 추출
        String bearerToken = "";
        for (Cookie cookie : Cookies) {
            if (cookie.getName().equals("CTK")) {
                bearerToken = cookie.getValue();
            }
        }

        System.out.println("이게 쿠키에 있는거");
        System.out.println(bearerToken);

        return ResponseEntity.ok(memberService.getMyInfoBySecurity(SecurityUtil.getCurrentMemberId(), request));
    }

    // 리프레시 토큰을 이용한 토큰 재발급 메소드 ((( 이거 매핑으로 바꿔야할듯 아무래도 redis가 갱신됨
    @GetMapping("/normal/reissue")
    public ResponseEntity<String> reissue(HttpServletResponse response, HttpServletRequest request) {
        memberService.reissue(response, request);
        return ResponseEntity.noContent().build();
    }

    // 로그아웃 메소드
    @GetMapping("/normal/logout")
    public ResponseEntity<String> logoutUser(HttpServletResponse response) {
        memberService.logout(response);
        return ResponseEntity.noContent().build();
    }
}
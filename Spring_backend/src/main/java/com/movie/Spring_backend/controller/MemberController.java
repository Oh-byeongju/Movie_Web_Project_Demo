// 23-01-13 아이디 중복 검사 메소드구현(오병주)
// 23-01-16 회원가입 및 로그인 메소드구현(오병주)
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.config.SecurityUtil;
import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.dto.TokenDto;
import com.movie.Spring_backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.file.AccessDeniedException;

// 쿠키를 프론트단과 같이 사용하기 위해 allowCredentials를 true로 설정
@CrossOrigin(origins = "${spring.cors.origins}", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    // 아이디 중복 검사를 위한 메소드, 중복된 아이디가 없을경우 noContent 리턴
    @GetMapping("/normal/id")
    public ResponseEntity<String> existsId(@RequestParam("uid") String id) {
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

        // 토큰을 만들기 위한 정보
        TokenDto result = memberService.login(requestDto);

        // XSS를 방지하기 위해 httpOnly 기능을 활성화
        // access 토큰을 헤더에 넣기 위한 작업
        // maxAge를 설정 안하면 세션으로, 0을 만들면 삭제
        ResponseCookie accessCookie = ResponseCookie.from("ATK", "Bearer" + result.getAccessToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge( 60 * 20)  // 20분
                .sameSite("None")
                .build();

        // XSS를 방지하기 위해 httpOnly 기능을 활성화
        // 리프레시 토큰을 헤더에 넣기 위한 작업
        ResponseCookie refreshCookie = ResponseCookie.from("RTK", result.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge( 60 * 60 * 24 * 7)  // 7일
                .sameSite("None")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        // 로그인한 사용자의 이름을 리턴
        MemberDto send_result = MemberDto.builder().uname(result.getUname()).build();

        return ResponseEntity.ok().body(send_result);
    }

    // 로그인 상태를 확인하는 메소드
    @GetMapping("/normal/login_status")
    public ResponseEntity<MemberDto> getMyInfoBySecurity() {
        return ResponseEntity.ok(memberService.getMyInfoBySecurity(SecurityUtil.getCurrentMemberId()));
    }

    // 리프레시 토큰을 이용한 토큰 재발급 메소드
    @PostMapping("/normal/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenDto tokenRequestDto, HttpServletRequest request) throws AccessDeniedException {
        return ResponseEntity.ok(memberService.reissue(tokenRequestDto, request));
    }
}
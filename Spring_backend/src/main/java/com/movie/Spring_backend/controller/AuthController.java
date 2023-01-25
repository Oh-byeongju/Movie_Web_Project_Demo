// 23-01-18 회원정보 확인을 위한 Controller 구현(오병주)
package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.config.SecurityUtil;
import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController  // JSON 형태 결과값을 반환해줌 (@ResponseBody가 필요없음)
@RequestMapping("/auth")
@RequiredArgsConstructor  // final 객체를 Constructor Injection 해줌. (Autowired 역할)
public class AuthController {

    private final AuthService authService;

    // 로그인 상태를 확인하는 메소드
    @GetMapping("/login_status")
    public ResponseEntity<MemberDto> getMyInfoBySecurity() {
        return ResponseEntity.ok(authService.getMyInfoBySecurity(SecurityUtil.getCurrentMemberId()));
    }
}

/*
  23-01-13 아이디 중복 검사 메소드구현(오병주)
  23-01-16 회원가입 및 로그인 메소드구현(오병주)
  23-01-18 토큰 재발급 관련 메소드구현(오병주)
  23-03-15 ~ 16 회원정보 수정 및 탈퇴 메소드구현(오병주)
*/
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.dto.TokenDto;
import com.movie.Spring_backend.entity.Authority;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import com.movie.Spring_backend.entity.RefreshTokenEntity;
import com.movie.Spring_backend.error.exception.ErrorCode;
import com.movie.Spring_backend.error.exception.InvalidValueException;
import com.movie.Spring_backend.exceptionlist.IdDuplicateException;
import com.movie.Spring_backend.exceptionlist.MemberNotFoundException;
import com.movie.Spring_backend.exceptionlist.PwNotCorrectException;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.jwt.TokenProvider;
import com.movie.Spring_backend.repository.MemberRepository;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.repository.RefreshTokenRepository;
import com.movie.Spring_backend.util.SecurityUtil;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder managerBuilder;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtValidCheck jwtValidCheck;

    // 아이디 중복을 확인하기 위한 메소드
    @Transactional
    public void existsId(String id) {
        // 아이디 중복을 확인하고 중복일 경우 예외를 던져줌
        if (memberRepository.existsById(id)) {
            throw new IdDuplicateException("중복된 아이디입니다.");
        }
    }

    // 회원가입을 위한 메소드
    @Transactional
    public void signup(MemberDto requestDto) {
        // 거의 희박한 확률이지만 A와 B라는 사람이 회원가입을 하고 있을 때 동시에 같은 아이디를 입력하였고,
        // 그때 그 아이디가 DB에 없어서 사전에 중복확인을 실패하여 먼저 회원가입 버튼을 누른 사람은 가입을 시켜도 되지만
        // 두번째로 회원가입 버튼을 누른 사람은 회원가입이 되면 안되므로 추가한 예외
        if (memberRepository.existsById(requestDto.getUid())) {
            throw new IdDuplicateException("중복 회원가입 방지", 1);
        }

        // 현재 시간을 sql에 사용할 수 있게 매핑
        Date nowDate = new Date();
        SimpleDateFormat DateFormatYMD = new SimpleDateFormat("yyyy-MM-dd");
        String day = DateFormatYMD.format(nowDate);

        // 파라미터로 전달받은 requestDto의 내용을 통해 MemberEntity 형의 member 생성
        MemberEntity member = MemberEntity.builder()
                .uid(requestDto.getUid())
                .upw(passwordEncoder.encode(requestDto.getUpw()))
                .uname(requestDto.getUname())
                .uemail(requestDto.getUemail())
                .utel(requestDto.getUtel())
                .uaddr(requestDto.getUaddr())
                .uaddrsecond(requestDto.getUaddrsecond())
                .ubirth(requestDto.getUbirth())
                .ujoindate(java.sql.Date.valueOf(day))
                .uauthority(Authority.ROLE_USER).build();

        // 생성된 member(회원정보)를 DB에 저장
        memberRepository.save(member);
    }

    // 로그인 메소드
    @Transactional
    public MemberDto login(MemberDto requestDto, HttpServletResponse response) {

        // 로그인 한 유저의 정보 추출
        MemberEntity Member = memberRepository.findById(requestDto.getUid())
                .orElseThrow(() -> new MemberNotFoundException("회원 정보가 존재하지 않습니다."));

        // Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = toAuthentication(requestDto.getUid(), requestDto.getUpw());

        // 실제로 검증 (사용자 비밀번호 확인)이 이루어지는 부분
        // authenticate 메소드가 실행 될 때 CustomUserDetailsService에서 구현했던 loadUserByUsername 메소드가 실행됨
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        // 인증 정보를 기반으로 Jwt 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 로그인 유지하기 버튼을 누른 상태로 로그인 했을 경우
        if (requestDto.getUname().equals("유지")) {
            // Redis에 RefreshToken 저장(로그인 상태에 대한 정보 포함)
            RefreshTokenEntity refreshToken = RefreshTokenEntity.builder()
                    .uid(authentication.getName())
                    .refreshToken(tokenDto.getRefreshToken())
                    .state("o")
                    .build();
            refreshTokenRepository.save(refreshToken);

            // XSS를 방지하기 위해 httpOnly 기능을 활성화
            // access 토큰을 헤더에 넣기 위한 작업
            // maxAge를 7일로 지정
            ResponseCookie accessCookie = ResponseCookie.from("ATK", "Bearer" + tokenDto.getAccessToken())
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge( 60 * 60 * 24 * 7)
                    .sameSite("None")
                    .build();

            // XSS를 방지하기 위해 httpOnly 기능을 활성화
            // refresh 토큰을 헤더에 넣기 위한 작업
            // maxAge를 7일로 지정
            ResponseCookie refreshCookie = ResponseCookie.from("RTK", tokenDto.getRefreshToken())
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge( 60 * 60 * 24 * 7)
                    .sameSite("None")
                    .build();

            // 응답 헤더에 두 가지 토큰을 쿠키에 할당
            response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
            response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());
        }
        // 로그인 유지하기 기능이 없을 경우
        else {
            // Redis에 RefreshToken 저장(로그인 상태에 대한 정보 포함)
            RefreshTokenEntity refreshToken = RefreshTokenEntity.builder()
                    .uid(authentication.getName())
                    .refreshToken(tokenDto.getRefreshToken())
                    .state("x")
                    .build();
            refreshTokenRepository.save(refreshToken);

            // XSS를 방지하기 위해 httpOnly 기능을 활성화
            // access 토큰을 헤더에 넣기 위한 작업
            // maxAge는 지정 안할경우 브라우저 기준으로 session
            ResponseCookie accessCookie = ResponseCookie.from("ATK", "Bearer" + tokenDto.getAccessToken())
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .sameSite("None")
                    .build();

            // XSS를 방지하기 위해 httpOnly 기능을 활성화
            // refresh 토큰을 헤더에 넣기 위한 작업
            // maxAge는 지정 안할경우 브라우저 기준으로 session
            ResponseCookie refreshCookie = ResponseCookie.from("RTK", tokenDto.getRefreshToken())
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .sameSite("None")
                    .build();

            // 응답 헤더에 두 가지 토큰을 쿠키에 할당
            response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
            response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());
        }

        // 로그인한 사용자의 아이디와 이름을 리턴
        return MemberDto.builder()
                .uid(Member.getUid())
                .uname(Member.getUname())
                .uemail(Member.getUemail())
                .utel(Member.getUtel())
                .uaddr(Member.getUaddr())
                .uaddrsecond(Member.getUaddrsecond())
                .ubirth(Member.getUbirth())
                .ujoindate(Member.getUjoindate()).build();
    }

    // 로그인 상태확인 메소드
    @Transactional
    public MemberDto getMyInfoBySecurity(HttpServletRequest request) {
        // authentication 객체에서 아이디 확보
        String currentMemberId = SecurityUtil.getCurrentMemberId();

        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // SecurityContext 에서 추출한 유저정보를 이용하여 Member 검색
        MemberEntity Member = memberRepository.findById(currentMemberId)
                .orElseThrow(() -> new MemberNotFoundException(currentMemberId));

        // 로그인 정보가 있을경우 아이디와 이름을 리턴
        return MemberDto.builder()
                .uid(Member.getUid())
                .uname(Member.getUname())
                .uemail(Member.getUemail())
                .utel(Member.getUtel())
                .uaddr(Member.getUaddr())
                .uaddrsecond(Member.getUaddrsecond())
                .ubirth(Member.getUbirth())
                .ujoindate(Member.getUjoindate()).build();
    }

    // 토큰 재발급 메소드
    @Transactional
    public void reissue(HttpServletResponse response, HttpServletRequest request) {
        // Refresh Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "RTK");

        // Access Token 에서 MemberID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(jwtValidCheck.resolveAccessToken(request));

        // Redis에서 MemberID를 기반으로 저장된 값 가져옴
        RefreshTokenEntity refreshToken = refreshTokenRepository.findById(authentication.getName())
                .orElseThrow(() -> new MemberNotFoundException(authentication.getName()));

        // 헤더의 Refresh Token과 Redis의 Refresh Token이 일치하는지 검사
        if (!refreshToken.getRefreshToken().equals(jwtValidCheck.resolveRefreshToken(request))) {
            request.setAttribute("exception", ErrorCode.INVALID_TOKEN.getCode());
            throw new JwtException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 사용자가 로그인 할때 로그인 유지기능을 사용했을 경우
        if (refreshToken.getState().equals("o")) {
            // Redis에 RefreshToken 갱신
            RefreshTokenEntity newRefreshToken = RefreshTokenEntity.builder()
                    .uid(authentication.getName())
                    .refreshToken(tokenDto.getRefreshToken())
                    .state("o")
                    .build();
            refreshTokenRepository.save(newRefreshToken);

            // XSS를 방지하기 위해 httpOnly 기능을 활성화
            // access 토큰을 헤더에 넣기 위한 작업
            // maxAge를 7일로 지정
            ResponseCookie accessCookie = ResponseCookie.from("ATK", "Bearer" + tokenDto.getAccessToken())
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge( 60 * 60 * 24 * 7)
                    .sameSite("None")
                    .build();

            // XSS를 방지하기 위해 httpOnly 기능을 활성화
            // refresh 토큰을 헤더에 넣기 위한 작업
            // maxAge를 7일로 지정
            ResponseCookie refreshCookie = ResponseCookie.from("RTK", tokenDto.getRefreshToken())
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge( 60 * 60 * 24 * 7)
                    .sameSite("None")
                    .build();

            // 응답 헤더에 두 가지 토큰을 쿠키에 할당
            response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
            response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());
        }
        // 사용자가 로그인 유지기능을 사용하지 않았을 경우
        else {
            // Redis에 RefreshToken 갱신
            RefreshTokenEntity newRefreshToken = RefreshTokenEntity.builder()
                    .uid(authentication.getName())
                    .refreshToken(tokenDto.getRefreshToken())
                    .state("x")
                    .build();
            refreshTokenRepository.save(newRefreshToken);

            // XSS를 방지하기 위해 httpOnly 기능을 활성화
            // access 토큰을 헤더에 넣기 위한 작업
            // maxAge는 지정 안할경우 브라우저 기준으로 session
            ResponseCookie accessCookie = ResponseCookie.from("ATK", "Bearer" + tokenDto.getAccessToken())
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .sameSite("None")
                    .build();

            // XSS를 방지하기 위해 httpOnly 기능을 활성화
            // refresh 토큰을 헤더에 넣기 위한 작업
            // maxAge는 지정 안할경우 브라우저 기준으로 session
            ResponseCookie refreshCookie = ResponseCookie.from("RTK", tokenDto.getRefreshToken())
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .sameSite("None")
                    .build();

            // 응답 헤더에 두 가지 토큰을 쿠키에 할당
            response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
            response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());
        }
    }

    // 로그아웃 메소드
    @Transactional
    public void logout(HttpServletResponse response, HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // authentication 객체에서 아이디 확보
        String currentMemberId = SecurityUtil.getCurrentMemberId();

        // Redis에 저장되어 있는 Refresh Token 삭제
        refreshTokenRepository.deleteById(currentMemberId);

        // 기존에 있던 두 가지 쿠키와 이름은 동일하지만 value는 빈칸, duration은 0인 쿠키들을 생성
        // 새로 생성된 쿠키들은 브라우저에 있는 기존의 쿠키들을 덮어쓴 후 사라짐
        ResponseCookie accessCookie = ResponseCookie.from("ATK", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge( 0)
                .sameSite("None")
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("RTK", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("None")
                .build();

        // 응답 헤더에 두 가지 쿠기를 할당
        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());
    }

    // 회원정보 수정 시 비밀번호를 확인하는 메소드
    @Transactional
    public void CheckPw(HttpServletRequest request, String Pw) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // authentication 객체에서 아이디 확보
        String currentMemberId = SecurityUtil.getCurrentMemberId();

        // 확보한 아이디를 이용해서 DB 검색
        MemberEntity member = memberRepository.findById(currentMemberId)
                .orElseThrow(() -> new MemberNotFoundException("회원 정보가 존재하지 않습니다."));

        // 프론트단에서 입력한 패스워드와 DB에 저장되어있는 패스워드를 비교
        if (!passwordEncoder.matches(Pw, member.getUpw())) {
            throw new PwNotCorrectException("비밀번호가 일치하지 않습니다.");
        }
    }

    // 회원정보 수정 메소드
    @Transactional
    public void MemberUpdate(HttpServletRequest request, MemberDto requestDto) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // 프론트단에서 전달받은 ID를 이용하여 사용자 검색
        MemberEntity member = memberRepository.findById(requestDto.getUid())
                .orElseThrow(() -> new MemberNotFoundException("회원 정보가 존재하지 않습니다."));

        // 프론트단에서 입력한 현재 비밀번호와 DB에 저장되어있는 비밀번호를 비교
        if (!passwordEncoder.matches(requestDto.getUpw(), member.getUpw())) {
            throw new PwNotCorrectException("비밀번호가 일치하지 않습니다.");
        }

        // 전달받은 새로운 회원정보를 통해 DB 업데이트(프로젝트에 빌더 패턴을 사용해서 update 쿼리 사용 시 JPQL을 사용)
        // 매개변수로 id, pw, 이름, 이메일, 전화번호, 주소, 생일을 전달
        memberRepository.MemberInfoUpdate(
                requestDto.getUid(),
                passwordEncoder.encode(requestDto.getNewPw()),
                requestDto.getUname(),
                requestDto.getUemail(),
                requestDto.getUtel(),
                requestDto.getUaddr(),
                requestDto.getUaddrsecond(),
                requestDto.getUbirth());
    }

    // 회원탈퇴 메소드
    @Transactional
    public void MemberDrop(HttpServletResponse response, HttpServletRequest request) {
        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");

        // authentication 객체에서 아이디 확보
        String currentMemberId = SecurityUtil.getCurrentMemberId();

        // Redis에 저장되어 있는 Refresh Token 삭제
        refreshTokenRepository.deleteById(currentMemberId);

        // 기존에 있던 두 가지 쿠키와 이름은 동일하지만 value는 빈칸, duration은 0인 쿠키들을 생성
        // 새로 생성된 쿠키들은 브라우저에 있는 기존의 쿠키들을 덮어쓴 후 사라짐
        ResponseCookie accessCookie = ResponseCookie.from("ATK", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge( 0)
                .sameSite("None")
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("RTK", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("None")
                .build();

        // 응답 헤더에 두 가지 쿠기를 할당
        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        // 사용자 테이블에서 사용자 제거(연관된 DB 내용은 CascadeType.REMOVE 때문에 연쇄 삭제)
        memberRepository.deleteById(currentMemberId);
    }

    // id와 pw를 파라미터로 전달 받아 UsernamePasswordAuthenticationToken 으로 반환하여 리턴해주는 메소드
    public UsernamePasswordAuthenticationToken toAuthentication(String uid, String upw) {
        return new UsernamePasswordAuthenticationToken(uid, upw);
    }
}

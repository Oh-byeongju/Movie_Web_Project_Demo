// 23-01-13 아이디 중복 검사 메소드구현(오병주)
// 23-01-16 회원가입 및 로그인 메소드구현(오병주)
// 23-01-18 토큰 재발급 관련 메소드구현(오병주)
package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.MemberDto;
import com.movie.Spring_backend.dto.TokenDto;
import com.movie.Spring_backend.entity.Authority;
import com.movie.Spring_backend.entity.MemberEntity;
import com.movie.Spring_backend.entity.RefreshTokenEntity;
import com.movie.Spring_backend.error.exception.ErrorCode;
import com.movie.Spring_backend.exceptionlist.IdDuplicateException;
import com.movie.Spring_backend.exceptionlist.MemberNotFoundException;
import com.movie.Spring_backend.jwt.TokenProvider;
import com.movie.Spring_backend.repository.MemberRepository;
import com.movie.Spring_backend.repository.RefreshTokenRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.nio.file.AccessDeniedException;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder managerBuilder;
    private final RefreshTokenRepository refreshTokenRepository;

    // 아이디 중복을 확인하기 위한 메소드
    @Transactional
    public void existsId(String id) {
        // 아이디 중복을 확인하고 중복일 경우 예외를 던져줌
        if (memberRepository.existsByUid(id)) {
            throw new IdDuplicateException("중복된 아이디입니다.");
        }
    }

    // 회원가입을 위한 메소드
    @Transactional
    public void signup(MemberDto requestDto) {
        // 거의 희박한 확률이지만 A와 B라는 사람이 회원가입을 하고 있을 때 동시에 같은 아이디를 입력하였고,
        // 그때 그 아이디가 DB에 없어서 사전에 중복확인을 실패하여 먼저 회원가입 버튼을 누른 사람은 가입을 시켜도 되지만
        // 두번째로 회원가입 버튼을 누른 사람은 회원가입이 되면 안되므로 추가한 예외
        if (memberRepository.existsByUid(requestDto.getUid())) {
            throw new IdDuplicateException("중복 회원가입 방지", 1);
        }

        // 파라미터로 전달받은 requestDto의 내용을 통해 MemberEntity 형의 member 생성
        MemberEntity member = MemberEntity.builder()
                .uid(requestDto.getUid())
                .upw(passwordEncoder.encode(requestDto.getUpw()))
                .uname(requestDto.getUname())
                .uemail(requestDto.getUemail())
                .utel(requestDto.getUtel())
                .uaddr(requestDto.getUaddr())
                .ubirth(requestDto.getUbirth())
                .uauthority(Authority.ROLE_USER).build();

        // 생성된 member(회원정보)를 DB에 저장
        memberRepository.save(member);
    }

    // 로그인 메소드
    @Transactional
    public TokenDto login(MemberDto requestDto) {

        // 로그인 한 유저의 이름 추출
        MemberEntity Data = memberRepository.findByUid(requestDto.getUid())
                .orElseThrow(() -> new MemberNotFoundException(requestDto.getUid()));
        String Name = Data.getUname();

        // Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = toAuthentication(requestDto.getUid(), requestDto.getUpw());

        // 실제로 검증 (사용자 비밀번호 확인)이 이루어지는 부분
        // authenticate 메소드가 실행 될 때 CustomUserDetailsService에서 구현했던 loadUserByUsername 메소드가 실행됨
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        // 인증 정보를 기반으로 Jwt 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication, Name);

        // Redis에 RefreshToken 저장
        RefreshTokenEntity refreshToken = RefreshTokenEntity.builder()
                .uid(authentication.getName())
                .refreshToken(tokenDto.getRefreshToken())
                .build();
        refreshTokenRepository.save(refreshToken);

        // 생선된 Jwt 토큰 리턴
        return tokenDto;
    }

    // 토큰 재발급 메소드
    @Transactional
    public TokenDto reissue(TokenDto tokenRequestDto, HttpServletRequest request) throws AccessDeniedException {

        // Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken(), request)) {
            throw new AccessDeniedException("Refresh Token이 유효하지 않습니다.");
        }

        // Access Token 에서 MemberID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // Redis에서 MemberID를 기반으로 저장된 값 가져옴
        RefreshTokenEntity refreshToken = refreshTokenRepository.findById(authentication.getName())
                .orElseThrow(() -> new MemberNotFoundException(authentication.getName()));

        // Refresh Token 일치하는지 검사
        if (!refreshToken.getRefreshToken().equals(tokenRequestDto.getRefreshToken())) {
            request.setAttribute("exception", ErrorCode.INVALID_TOKEN.getCode());
            throw new AccessDeniedException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 로그인 한 유저의 이름 추출
        MemberEntity Data = memberRepository.findByUid(refreshToken.getUid())
                .orElseThrow(() -> new MemberNotFoundException(refreshToken.getUid()));
        String Name = Data.getUname();

        // 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication, Name);

        // Redis에 RefreshToken 갱신
        RefreshTokenEntity newRefreshToken = RefreshTokenEntity.builder()
                .uid(authentication.getName())
                .refreshToken(tokenDto.getRefreshToken())
                .build();
        refreshTokenRepository.save(newRefreshToken);

        // 토큰 발급
        return tokenDto;
    }

    // id와 pw를 파라미터로 전달 받아 UsernamePasswordAuthenticationToken 으로 반환하여 리턴해주는 메소드
    public UsernamePasswordAuthenticationToken toAuthentication(String uid, String upw) {
        return new UsernamePasswordAuthenticationToken(uid, upw);
    }
}

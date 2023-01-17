// 23-01-15 Jwt 토큰 필터링 검증 로직 구현(오병주)
package com.movie.Spring_backend.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// Jwt의 필터링이 실행되는 곳, OncePerRequestFilter 인터페이스를 구현하기 때문에 요청 받을 때 단 한번만 실행됨
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    // 토큰 정보를 추출할 때 사용되는 값
    public static final String AUTHORIZATION_HEADER = "Authorization";
    // 토큰 정보를 확인할 때 사용되는 값
    public static final String BEARER_PREFIX = "Bearer ";
    private final TokenProvider tokenProvider;

    // 실제 필터링 로직이 수행되는 메소드
    // 가입/로그인/재발급을 제외한 모든 Request 요청은 이 필터를 거치기 때문에 토큰 정보가 없거나 유효하지 않으면 정상적으로 수행되지 않음
    // 반대로 Request가 정상적으로 Controller까지 도착했으면 SecurityContext에 Member ID가 존재한다는 것이 보장
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {


        System.out.println("그럼 이론상 이거는 매일돔");
        // Request Header에서 토큰을 꺼내 jwt 변수에 저장
        String jwt = resolveToken(request);

        // validateToken으로 토큰 유효성 검사
        // 정상 토큰이면 해당 토큰으로 Authentication을 가져와서 SecurityContext에 저장
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt, request)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // 체인의 다음 필터를 호출
        filterChain.doFilter(request, response);
    }

    // Request Header에서 토큰 정보를 꺼내오는 메소드
    private String resolveToken(HttpServletRequest request) {
        // Request Header의 내용중 Key 값이 Authorization인 Value를 추출
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

        // 추출한 Value의 문자열 유효성 검사 및 문자열의 시작이 Bearer 인지 확인 후 true 이면 Value 값에서 Bearer 를 제거하여 리턴
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        // 문자열 유효성 검사 실패 및 문자열의 시작이 다른 경우 null 리턴
        return null;
    }
}
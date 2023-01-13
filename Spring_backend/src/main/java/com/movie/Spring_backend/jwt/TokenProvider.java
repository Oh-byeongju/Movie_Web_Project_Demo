//package com.movie.Spring_backend.jwt;
//
//import com.movie.Spring_backend.dto.TokenDto;
//import io.jsonwebtoken.*;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import java.nio.file.AccessDeniedException;
//import java.security.AccessControlException;
//import java.security.Key;
//import java.util.Arrays;
//import java.util.Collection;
//import java.util.Date;
//import java.util.stream.Collectors;
//
//@Component
//public class TokenProvider {
//
//    // 토큰을 생성하고 검증할 때 쓰이는 값
//    private static final String AUTHORITIES_KEY = "auth";
//    // 토큰을 생성하고 검증할 때 쓰이는 값
//    private static final String BEARER_TYPE = "bearer";
//    // 토큰의 만료 시간 (현재 적용은 30분)
//    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;
//    // jwt를 만들기 위해 사용되는 key 값
//    private final Key key;
//
//    // 여기서 @Value는 `springframework.beans.factory.annotation.Value`소속이다! lombok의 @Value와 착각하지 말것!
//    // application.yml에 있는 secret key 값을 가져와서 decode 한 후 의존성이 주입된 key 값으로 설정
//    public TokenProvider(@Value("${jwt.secret}") String secretKey) {
//        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//        this.key = Keys.hmacShaKeyFor(keyBytes);
//    }
//
//    // 토큰을 생성하는 메서드
//    // Authentication 인터페이스를 확장한 매개변수를 받아서 그 값을 string으로 변환한 뒤
//    // 현재시각과 만료시각을 만든 후 Jwts의 builder를 이용하여 Token을 생성 이후 TokenDto에 생성한 token의 정보를 넣음
//    public TokenDto generateTokenDto(Authentication authentication) {
//
//        String authorities = authentication.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .collect(Collectors.joining(","));
//
//        long now = (new Date()).getTime();
//
//        Date tokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
//        String accessToken = Jwts.builder()
//                .setSubject(authentication.getName())
//                .claim(AUTHORITIES_KEY, authorities)
//                .setExpiration(tokenExpiresIn)
//                .signWith(key, SignatureAlgorithm.HS512)
//                .compact();
//
//        return TokenDto.builder()
//                .grantType(BEARER_TYPE)
//                .accessToken(accessToken)
//                .tokenExpiresIn(tokenExpiresIn.getTime())
//                .build();
//    }
//
//    // 토큰을 받았을 때 토큰의 인증을 꺼내는 메소드
//    public Authentication getAuthentication(String accessToken) throws AccessDeniedException {
//        Claims claims = parseClaims(accessToken);
//
//        if (claims.get(AUTHORITIES_KEY) == null) {
//            throw new AccessDeniedException("권한 정보가 없는 토큰입니다.");
//        }
//
//        Collection<? extends GrantedAuthority> authorities =
//                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
//                        .map(SimpleGrantedAuthority::new)
//                        .collect(Collectors.toList());
//
//        UserDetails principal = new User(claims.getSubject(), "", authorities);
//
//        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
//    }
//
//    public boolean validateToken(String token) {
//        try {
//            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
//            return true;
//        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
//            log.info("잘못된 JWT 서명입니다.");
//        } catch (ExpiredJwtException e) {
//            log.info("만료된 JWT 토큰입니다.");
//        } catch (UnsupportedJwtException e) {
//            log.info("지원되지 않는 JWT 토큰입니다.");
//        } catch (IllegalArgumentException e) {
//            log.info("JWT 토큰이 잘못되었습니다.");
//        }
//        return false;
//    }
//
//    private Claims parseClaims(String accessToken) {
//        try {
//            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
//        } catch (ExpiredJwtException e) {
//            return e.getClaims();
//        }
//    }
//}

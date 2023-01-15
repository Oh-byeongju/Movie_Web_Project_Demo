//// 23-01-16 Security 기본적인 설정 구현(오병주)
//package com.movie.Spring_backend.config;
//
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.context.SecurityContextHolder;
//
//// SecurityContext에 유저 정보가 저장되는 시점을 다루는 클래스
//public class SecurityUtil {
//
//    // 여기는 지금 뭐가 날라오는지 봐야할듯
//    private SecurityUtil() { }
//
//    public static String getCurrentMemberId() {
//        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        if (authentication == null || authentication.getName() == null) {
//            throw new AuthenticationException("Security Context에 인증 정보가 없습니다.") {
//            };
//        }
//
//        System.out.println("여기가 확인시점");
//        System.out.println(authentication.getName());
//
//        return authentication.getName();
//    }
//}
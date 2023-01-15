//// 23-01-15 Security 단에서 발생하는 예외 처리 로직 구현(오병주)
//package com.movie.Spring_backend.jwt;
//
//import org.springframework.security.access.AccessDeniedException;
//import org.springframework.security.web.access.AccessDeniedHandler;
//import org.springframework.stereotype.Component;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//// Security 단에서 발생하는 예외는 ControllerAdvice을 통해 처리가 불가능 하여 따로 처리 해줘야 함
//// 필요한 권한 없이 접근하려 할때 예외처리
//@Component
//public class JwtAccessDeniedHandler implements AccessDeniedHandler {
//
//    // 유저 정보는 있으나 자원에 접근할 수 있는 권한이 없는 경우 403 응답을 내려줌
//    // 이거도 GlobalException Handler가 적용 되는지 나중에 확인 해봐야함
//    // Global에서 처리 불가하면 만들었던거 없애야함 ~~.class
//    @Override
//    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
//        response.sendError(HttpServletResponse.SC_FORBIDDEN);
//    }
//}

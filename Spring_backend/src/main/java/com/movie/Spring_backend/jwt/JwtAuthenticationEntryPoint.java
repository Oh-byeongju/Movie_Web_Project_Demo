// 23-01-15 Security 단에서 발생하는 예외 처리 로직 구현(오병주)
package com.movie.Spring_backend.jwt;

import com.movie.Spring_backend.error.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// Security 단에서 발생하는 예외는 ControllerAdvice를 통해 처리가 불가능 하여 따로 처리 해줘야 함
// 유효한 자격증명을 제공하지 않고 접근하려 할때 예외처리(401)
@Component
@Slf4j
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        String exception = (String) request.getAttribute("exception");
        ErrorCode errorCode;

        // 로그인 토큰이 없는 경우
        if (exception == null) {
            log.error("JwtAuthenticationEntryPointException errorCode : {}", "S001");
            errorCode = ErrorCode.LOGIN_IS_NONE;
            setResponse(response, errorCode);
            return;
        }

        // 토큰이 만료된 경우
        if (exception.equals(ErrorCode.EXPIRED_TOKEN.getCode())) {
            log.error("JwtAuthenticationEntryPointException errorCode : {}", exception);
            errorCode = ErrorCode.EXPIRED_TOKEN;
            setResponse(response, errorCode);
            return;
        }

        // 토큰 시그니처가 다른 경우
        if (exception.equals(ErrorCode.INVALID_TOKEN.getCode())) {
            log.error("JwtAuthenticationEntryPointException errorCode : {}", exception);
            errorCode = ErrorCode.INVALID_TOKEN;
            setResponse(response, errorCode);
        }
    }

    // 한글 출력을 위해 getWriter() 사용, 프론트단으로 보내는 error 가공
    private void setResponse(HttpServletResponse response, ErrorCode errorCode) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().println("{ \"message\" : \"" + errorCode.getMessage()
                + "\", \"status\" : " + errorCode.getStatus()
                + ", \"errors\" : [ ]"
                + ", \"code\" : " + "\"" + errorCode.getCode()
                + "\"" + "}");
    }
}

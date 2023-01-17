// 23-01-15 Security 단에서 발생하는 예외 처리 로직 구현(오병주)
package com.movie.Spring_backend.jwt;

import com.movie.Spring_backend.error.exception.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// Security 단에서 발생하는 예외는 ControllerAdvice을 통해 처리가 불가능 하여 따로 처리 해줘야 함
// 유효한 자격증명을 제공하지 않고 접근하려 할때 예외처리
@Component
@Slf4j
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    // 유저 정보 없이 접근하면 401 응답을 내려줌
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        String exception = (String) request.getAttribute("exception");
        ErrorCode errorCode;

//        System.out.println(authException.getMessage());
//        System.out.println(authException.getClass());

        System.out.println(exception);
        System.out.println("여기 확인 해보이소");
        log.error("JwtAuthenticationEntryPointException: {}", exception);

        errorCode = ErrorCode.LOGIN_IS_NONE;
        setResponse(response, errorCode);
    }


    /**
     * 한글 출력을 위해 getWriter() 사용
     */
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

// 23-01-12 공통 예외처리 구현(오병주)
package com.movie.Spring_backend.error.exception;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {

    // Common
    INVALID_INPUT_VALUE(400, "C001", " Invalid Input Value"),
    METHOD_NOT_ALLOWED(405, "C002", " Invalid Input Value"),
    ENTITY_NOT_FOUND(400, "C003", " Entity Not Found"),
    INTERNAL_SERVER_ERROR(500, "C004", "Server Error"),
    INVALID_TYPE_VALUE(400, "C005", " Invalid Type Value"),
    HANDLE_ACCESS_DENIED(403, "C006", "Access is Denied"),
    AUTHENTICATION_ERROR(401, "C007", "Authentication Error"),

    // Member
    ID_DUPLICATION(400, "M001", "중복된 아이디입니다."),
    SIGN_UNEXPECTED_ERROR(400, "M002", "예기치 못한 오류가 발생하였습니다. 다시 회원가입 해주십시오."),
    MEMBER_NOT_FOUND(400, "M003", "회원정보가 존재하지 않습니다."),

    // Security
    LOGIN_IS_NONE(401, "S001", "Login is none"),
    EXPIRED_TOKEN(401, "S002", "Token is expired"),
    INVALID_TOKEN(401, "S003", "Token is Invalid"),

    ;
    private final String code;
    private final String message;
    private final int status;

    ErrorCode(final int status, final String code, final String message) {
        this.status = status;
        this.message = message;
        this.code = code;
    }

    public String getMessage() {
        return this.message;
    }

    public String getCode() {
        return code;
    }

    public int getStatus() {
        return status;
    }
}
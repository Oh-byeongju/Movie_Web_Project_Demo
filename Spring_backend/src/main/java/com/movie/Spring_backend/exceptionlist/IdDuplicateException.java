package com.movie.Spring_backend.exceptionlist;

import com.movie.Spring_backend.error.exception.ErrorCode;
import com.movie.Spring_backend.error.exception.InvalidValueException;

public class IdDuplicateException extends InvalidValueException {

    // 아이디 중복시 실행되는 메소드
    public IdDuplicateException(String id) {
        super(id, ErrorCode.ID_DUPLICATION);
    }
}
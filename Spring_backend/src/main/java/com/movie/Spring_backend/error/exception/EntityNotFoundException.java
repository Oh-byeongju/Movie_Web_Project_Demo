// 23-01-12 에러처리 구현(오병주)
package com.movie.Spring_backend.error.exception;

public class EntityNotFoundException extends BusinessException {

    public EntityNotFoundException(String message) {
        super(message, ErrorCode.ENTITY_NOT_FOUND);
    }
}
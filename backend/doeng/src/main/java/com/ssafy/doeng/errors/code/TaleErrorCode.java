package com.ssafy.doeng.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TaleErrorCode implements ErrorCode{

    TALE_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 동화입니다.")
    ;
    private final HttpStatus httpStatus;
    private final String message;
}

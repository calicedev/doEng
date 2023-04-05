package com.ssafy.doeng.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum PictureErrorCode implements ErrorCode {
    
    PICTURE_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 사진입니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}

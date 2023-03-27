package com.ssafy.doeng.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum PaymentErrorCode implements ErrorCode {
    PAYMENT_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "구매하지 않은 동화입니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;

}

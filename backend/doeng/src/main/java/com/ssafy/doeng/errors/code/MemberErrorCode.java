package com.ssafy.doeng.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MemberErrorCode implements ErrorCode{
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다."),
    MEMBER_DUPLICATE_UID(HttpStatus.CONFLICT, "중복된 아이디가 존재합니다."),
    MEMBER_DUPLICATE_NAME(HttpStatus.CONFLICT, "중복된 닉네임이 존재합니다."),
    MEMBER_DUPLICATE_EMAIL(HttpStatus.CONFLICT, "중복된 이메일이 존재합니다."),
    MEMBER_WRONG_UID(HttpStatus.UNAUTHORIZED, "아이디가 틀렸습니다."),
    MEMBER_WRONG_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호가 틀렸습니다."),
    MEMBERID_EXIST(HttpStatus.UNAUTHORIZED, "memberId를 데이터베이스에서 찾을 수 없습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}

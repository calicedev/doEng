package com.ssafy.doeng.errors.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MemberErrorCode implements ErrorCode{
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다."),
    MEMBER_DUPLICATE(HttpStatus.NOT_FOUND, "이미 존재하는 회원입니다."),
    MEMBER_DUPLICATE_UID(HttpStatus.CONFLICT, "중복된 아이디가 존재합니다."),
    MEMBER_DUPLICATE_NAME(HttpStatus.CONFLICT, "중복된 닉네임이 존재합니다."),
    MEMBER_DUPLICATE_EMAIL(HttpStatus.CONFLICT, "중복된 이메일이 존재합니다."),
    MEMBER_WRONG_UID(HttpStatus.UNAUTHORIZED, "아이디가 틀렸습니다."),
    MEMBER_WRONG_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호가 틀렸습니다."),
    MEMBERID_NOTEXIST(HttpStatus.UNAUTHORIZED, "memberId를 데이터베이스에서 찾을 수 없습니다."),
    REFRESHTOKEN_NOTVALIDATE(HttpStatus.UNAUTHORIZED, "RefreshToken 이 유효하지 않습니다."),
    NO_PERMISSION_TOKEN(HttpStatus.UNAUTHORIZED, "권한 정보가 없는 토큰입니다."),
    ACCESSTOKEN_NOTVALIDATE(HttpStatus.UNAUTHORIZED, "만료된 Access토큰입니다."),
    REFRESHTOKEN_BADREQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다. (로그아웃 되었음)" ),
    NOMATCH_TOKEN(HttpStatus.BAD_REQUEST,"토큰의 유저 정보가 일치하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}

package com.ssafy.doeng.googleLogin;

import com.ssafy.doeng.data.dto.member.TokenDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

//클라이언트로 보낼 jwtToken, accessToken등이 담긴 객체
@Getter
@Setter
@AllArgsConstructor
public class GetSocialOAuthRes {
    private TokenDto tokenDto;
    private String username;
    private String accessToken;
    private String tokenType;
}

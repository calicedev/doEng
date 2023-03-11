package com.ssafy.doeng.data.dto.member.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RequestTokenDto {
    private String accessToken;
    private String refreshToken;
}
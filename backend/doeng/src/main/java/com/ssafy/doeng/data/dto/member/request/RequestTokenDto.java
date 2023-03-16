package com.ssafy.doeng.data.dto.member.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RequestTokenDto {
    private String accesstoken;
    private String refreshtoken;
}
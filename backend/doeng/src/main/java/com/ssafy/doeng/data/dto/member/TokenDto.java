package com.ssafy.doeng.data.dto.member;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDto {
    private String grantType;
    private String accesstoken;
    private String refreshtoken;
    private Long accessTokenExpiresIn;
}
package com.ssafy.doeng.data.dto.info.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
public class RequestWordInfoDto {
    private String engWord;
    private String korWord;
    private String image;
    private String voice;
}

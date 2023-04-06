package com.ssafy.doeng.data.dto.tale.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class ResopnseWordDto {

    private int id;
    private String image;
    private String engWord;
    private String korWord;
    private String voice;
    private boolean correct;
}

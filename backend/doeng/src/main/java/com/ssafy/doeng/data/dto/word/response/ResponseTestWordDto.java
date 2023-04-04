package com.ssafy.doeng.data.dto.word.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseTestWordDto {
    private long id;
    private String voice;
    private String korVoice;
    private String image;
    private String engWord;
    private String korWord;
    private String wrongImage;
}

package com.ssafy.doeng.data.dto.game.response;

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
public class ResponseSceneWordDto {
    private long id;
    private String image;
    private String engWord;
    private String korWord;
    private String voice;
}

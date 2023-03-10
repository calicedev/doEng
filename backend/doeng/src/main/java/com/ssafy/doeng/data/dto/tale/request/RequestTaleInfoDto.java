package com.ssafy.doeng.data.dto.tale.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
public class RequestTaleInfoDto {
    private String title;
    private String description;
    private int price;
    private String backgroundImage;
    private String mainImage;

    private long wordId;
    private String sceneTitle;
    private String sceneImage;
    private int sceneOrder;
    private int interactiveType;
    private String backgroundMusic;

    private long sceneId;
    private int scriptOrder;
    private String content;
    private String voice;


}

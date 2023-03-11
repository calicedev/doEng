package com.ssafy.doeng.data.dto.info.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestSceneInfoDto {
    private long taleId;
    private long wordId;
    private String title;
    private String image;
    private int sceneOrder;
    private int interactiveType;
    private String backgroundMusic;
}

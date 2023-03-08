package com.ssafy.doeng.data.dto.game.response;

import java.util.List;
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
public class ResponseSceneDto {
    private long id;
    private String image;
    private int sceneOrder;
    private int interactiveType;
    private String backgroundMusic;
    private List<ResponseScriptDto> scriptList;
    private ResponseSceneWordDto word;
}

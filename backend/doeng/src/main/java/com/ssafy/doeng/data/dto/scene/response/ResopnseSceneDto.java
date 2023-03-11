package com.ssafy.doeng.data.dto.scene.response;

import com.ssafy.doeng.data.dto.game.response.ResponseScriptDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordDto;
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
public class ResopnseSceneDto {

    private long id;
    private int sceneOrder;
    private int interactiveType;
    private String image;
    private String backgroundMusic;
    private ResponseWordDto word;
    private List<ResponseScriptDto> scriptList;
}

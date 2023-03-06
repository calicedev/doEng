package com.ssafy.doeng.data.dto.tale.response;

import com.ssafy.doeng.data.dto.scene.response.ResponseProgressSceneDto;
import com.ssafy.doeng.data.dto.word.response.ResponseProgressTestResultDto;
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
public class ResponseProgressTaleDetailDto {
    private String title;
    private String backgroundImage;
    private List<ResponseProgressSceneDto> sceneList;
    private List<ResponseProgressTestResultDto> testList;
}

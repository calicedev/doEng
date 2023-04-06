package com.ssafy.doeng.data.dto.scene.response;

import com.ssafy.doeng.data.dto.picture.response.ResponseProgressImageDto;
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
public class ResponseProgressSceneDto {
    private long id;
    private String sceneTitle;
    private List<ResponseProgressImageDto> imageList;
}

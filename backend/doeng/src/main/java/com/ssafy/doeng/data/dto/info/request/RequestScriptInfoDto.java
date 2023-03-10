package com.ssafy.doeng.data.dto.info.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
public class RequestScriptInfoDto {
    private long sceneId;
    private int scriptOrder;
    private String content;
    private String voice;
}

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
public class RequestScriptInfoDto {
    private long sceneId;
    private int scriptOrder;
    private String content;
    private String voice;
}

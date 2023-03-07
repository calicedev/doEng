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
public class ResponseScriptDto {
    private int scriptOrder;
    private String content;
    private String voice;
}

package com.ssafy.doeng.data.dto.tale.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class ResponseMainTaleDto {

    private int id;
    private String title;
    private String backgroundImage;
    private boolean purchased;
}

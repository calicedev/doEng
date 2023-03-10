package com.ssafy.doeng.data.dto.info.request;

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
}

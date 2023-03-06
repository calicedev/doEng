package com.ssafy.doeng.data.dto.tale.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
public class ResponseMainTaleDetailDto {

    private String title;
    private int progress;
    private String mainImage;
    private List<ResponseWordDto> wordList;
}

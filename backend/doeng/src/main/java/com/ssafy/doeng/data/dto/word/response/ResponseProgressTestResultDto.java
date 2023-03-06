package com.ssafy.doeng.data.dto.word.response;

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
public class ResponseProgressTestResultDto {
    private int testCount;
    private boolean engWord;
}

package com.ssafy.doeng.data.dto.word.response;


import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseWordTestResultDto {
    private String title;
    List<ResponseTestWordResultDto> testList;
}

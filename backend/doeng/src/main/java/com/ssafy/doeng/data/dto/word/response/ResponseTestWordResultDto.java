package com.ssafy.doeng.data.dto.word.response;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseTestWordResultDto {
    private long id;
    private String image;
    private String engWord;
    private String korWord;
}

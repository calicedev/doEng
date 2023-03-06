package com.ssafy.doeng.data.dto.picture.response;

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
public class ResponseProgressImageDto {
    private long id;
    private String image;
}

package com.ssafy.doeng.data.dto.tale.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
@Setter
public class RequestTailDetailDto {

    private long memberId;
    private int taleId;
}

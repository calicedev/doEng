package com.ssafy.doeng.data.dto.tale.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
@Setter
public class RequestTaleDetailDto {

    private long memberId;
    private long taleId;
}

package com.ssafy.doeng.data.dto.tale.response;

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
public class ResponsePaymentTaleDto {
    private long id;
    private String title;
    private String backgroundImage;
    private double score;
    private boolean purchased;
}

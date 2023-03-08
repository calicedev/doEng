package com.ssafy.doeng.data.dto.review.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewSum {
    private long taleId;
    private long count;
    private long sum;
}

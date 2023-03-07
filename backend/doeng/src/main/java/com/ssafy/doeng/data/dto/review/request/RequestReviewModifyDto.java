package com.ssafy.doeng.data.dto.review.request;

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
public class RequestReviewModifyDto {
    private long reviewId;
    private int score;
    private String content;

    public void setReviewId(long reviewId) { this.reviewId = reviewId; }
}

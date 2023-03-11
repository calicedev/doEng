package com.ssafy.doeng.data.dto.review.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseAllReviewDto {
    private ResponseReviewDto myReview;
    private List<ResponseReviewDto> reviewList;
}

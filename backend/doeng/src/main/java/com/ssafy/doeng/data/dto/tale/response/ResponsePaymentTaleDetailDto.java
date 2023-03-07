package com.ssafy.doeng.data.dto.tale.response;

import com.ssafy.doeng.data.dto.review.response.ResponseReviewDto;
import com.ssafy.doeng.data.dto.review.response.ResponseReviewListDto;
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
public class ResponsePaymentTaleDetailDto {
    private long id;
    private String title;
    private String backgroundImage;
    private String description;
    private double score;
    private int price;
    private boolean purchased;
    private ResponseReviewDto myReview;
    private ResponseReviewListDto reviewList;
}

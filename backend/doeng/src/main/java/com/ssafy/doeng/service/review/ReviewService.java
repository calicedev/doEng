package com.ssafy.doeng.service.review;

import com.ssafy.doeng.data.dto.review.request.RequestReviewDto;
import com.ssafy.doeng.data.dto.review.request.RequestReviewModifyDto;
import com.ssafy.doeng.data.dto.review.response.ResponseReviewListDto;
import com.ssafy.doeng.data.entity.review.Review;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface ReviewService {
    void save(RequestReviewDto requestReviewDto);
    void modifyReview(RequestReviewModifyDto requestReviewModifyDto);
    void deleteReview(long reviewId);
    ResponseReviewListDto getReviewList(long taleId, long memberId, Pageable pageable);
}

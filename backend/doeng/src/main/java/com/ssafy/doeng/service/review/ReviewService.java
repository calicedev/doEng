package com.ssafy.doeng.service.review;

import com.ssafy.doeng.data.dto.review.request.RequestReviewDto;
import com.ssafy.doeng.data.dto.review.request.RequestReviewModifyDto;
import com.ssafy.doeng.data.dto.review.response.ResponseAllReviewDto;
import org.springframework.data.domain.Pageable;

public interface ReviewService {
    void save(RequestReviewDto requestReviewDto);
    void modifyReview(RequestReviewModifyDto requestReviewModifyDto, long memberId);
    void deleteReview(long reviewId, long memberId);
    ResponseAllReviewDto getReviewList(long taleId, long memberId, Pageable pageable);
}

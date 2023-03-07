package com.ssafy.doeng.service.review.impl;

import com.ssafy.doeng.data.dto.review.request.RequestReviewDto;
import com.ssafy.doeng.data.dto.review.request.RequestReviewModifyDto;
import com.ssafy.doeng.data.dto.review.response.ResponseReviewDto;
import com.ssafy.doeng.data.dto.review.response.ResponseReviewListDto;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.review.Review;
import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.repository.member.MemberRepository;
import com.ssafy.doeng.data.repository.review.ReviewRepository;
import com.ssafy.doeng.data.repository.tale.TaleRepository;
import com.ssafy.doeng.service.review.ReviewService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class ReviewServiceImpl implements ReviewService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ReviewServiceImpl.class);
    private final MemberRepository memberRepository;
    private final TaleRepository taleRepository;
    private final ReviewRepository reviewRepository;

    @Override
    public void save(RequestReviewDto requestReviewDto) {
        LOGGER.info("[리뷰 저장 service 들어옴]");
        Member member = memberRepository.getById(requestReviewDto.getMemberId());
        Tale tale = taleRepository.getById(requestReviewDto.getTaleId());
        Review review = Review.builder()
                .member(member)
                .tale(tale)
                .score(requestReviewDto.getScore())
                .content(requestReviewDto.getContent())
                .build();
        reviewRepository.save(review);
    }

    @Override
    public void modifyReview(RequestReviewModifyDto requestReviewModifyDto) {
        LOGGER.info("[리뷰 수정 api: {}]", requestReviewModifyDto.getReviewId());
        Review review = reviewRepository.getById(requestReviewModifyDto.getReviewId());
        review.setScore(requestReviewModifyDto.getScore());
        review.setContent(requestReviewModifyDto.getContent());
    }

    @Override
    public void deleteReview(long reviewId) {
        LOGGER.info("[리뷰 삭제 api: {}]", reviewId);
        if (reviewRepository.existsById(reviewId)) {
            reviewRepository.deleteById(reviewId);
        } else {
            throw new RuntimeException();
        }
    }

    @Override
    public ResponseReviewListDto getReviewList(long taleId, long memberId, Pageable pageable) {
        LOGGER.info("[리뷰 리스트 api 들어옴]");
        Tale tale = taleRepository.getById(taleId);
        List<ResponseReviewDto> reviewDtoList = new ArrayList<>();
        Slice<Review> reviews = reviewRepository.findByTaleOrderByCreatedAtDesc(tale, pageable);

        for (Review r: reviews) {
            if(r.getMember().getId() == memberId) continue;
            ResponseReviewDto reviewDto = ResponseReviewDto.builder()
                    .id(r.getId())
                    .memberId(r.getMember().getId())
                    .score(r.getScore())
                    .content(r.getContent())
                    .build();
            reviewDtoList.add(reviewDto);
        }

        ResponseReviewListDto reviewListDto = ResponseReviewListDto.builder()
                .reviewList(reviewDtoList)
                .build();

        return reviewListDto;
    }
}

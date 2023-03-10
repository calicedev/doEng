package com.ssafy.doeng.controller;

import com.ssafy.doeng.data.dto.review.request.RequestReviewDto;
import com.ssafy.doeng.data.dto.review.request.RequestReviewModifyDto;
import com.ssafy.doeng.data.dto.review.response.ResponseReviewListDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleListDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleListDto;
import com.ssafy.doeng.data.repository.progress.ProgressRepository;
import com.ssafy.doeng.service.review.ReviewService;
import com.ssafy.doeng.service.tale.TaleService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MyPageController {
    private static final Logger LOGGER = LoggerFactory.getLogger(MyPageController.class);
    private final TaleService taleService;
    private final ReviewService reviewService;

    @GetMapping("/progress")
    public ResponseEntity<ResponseProgressTaleListDto> getProgress(Pageable pageable) {
        LOGGER.info("진행률 리스트 api 들어옴");
        long memberId = 1;
        ResponseProgressTaleListDto progressTaleListDto = taleService.getProgressTaleList(memberId, pageable);

        return ResponseEntity.ok().body(progressTaleListDto);
    }

    @GetMapping("/progress/{taleId}")
    public ResponseEntity<ResponseProgressTaleDetailDto> getProgressDetail(@PathVariable("taleId") long taleId) {
        LOGGER.info("진행률 상세 api 들어옴 : {}", taleId);
        long memberId = 1;
        ResponseProgressTaleDetailDto responseProgressTaleDetailDto
                = taleService.getProgressTaleDetail(memberId, taleId);
        return ResponseEntity.ok().body(responseProgressTaleDetailDto);
    }

    @GetMapping("/tale-list")
    public ResponseEntity<ResponsePaymentTaleListDto> getPaymentTaleList(Pageable pageable) {
        LOGGER.info("구매 관련 책 목록 들어옴");
        long memberId = 2;
        ResponsePaymentTaleListDto paymentTaleListDto = taleService.getPaymentTaleList(memberId, pageable);
        return ResponseEntity.ok().body(paymentTaleListDto);
    }

    @GetMapping("/tale-list/{taleId}")
    public ResponseEntity<ResponsePaymentTaleDetailDto> getPaymentDetail(@PathVariable("taleId") long taleId) {
        LOGGER.info("책 구매 목록 상세 api 들어옴: {}", taleId);
        long memberId = 1;
        ResponsePaymentTaleDetailDto responsePaymentTaleDetailDto = taleService.getPaymentTaleDetail(memberId, taleId);
        return ResponseEntity.ok().body(responsePaymentTaleDetailDto);
    }

    @PostMapping("/review/{taleId}")
    private ResponseEntity<String> postReview(@PathVariable("taleId") long taleId,
            @RequestBody RequestReviewDto requestReviewDto) {
        LOGGER.info("리뷰 post 들어옴 {}", taleId);
        requestReviewDto.setMemberId(1);
        requestReviewDto.setTaleId(taleId);
        reviewService.save(requestReviewDto);

        return ResponseEntity.ok().body("review 저장 완료");
    }

    @PutMapping("/review/{reviewId}")
    private ResponseEntity<String> putReview(@PathVariable("reviewId") long reviewId,
            @RequestBody RequestReviewModifyDto requestReviewModifyDto) {
        LOGGER.info("리뷰 수정 api {}", reviewId);
        requestReviewModifyDto.setReviewId(reviewId);
        reviewService.modifyReview(requestReviewModifyDto);

        return ResponseEntity.ok().body("review 수정 완료");
    }

    @DeleteMapping("/review/{reviewId}")
    private ResponseEntity<String> deleteReview(@PathVariable("reviewId") long reviewId) {
        LOGGER.info("리뷰 삭제 api {}", reviewId);
        reviewService.deleteReview(reviewId);

        return ResponseEntity.ok().body("review 삭제 완료");
    }

    @GetMapping("/review/{taleId}/review-list")
    private ResponseEntity<ResponseReviewListDto> getReviewList(@PathVariable("taleId") long taleId, Pageable pageable) {
        LOGGER.info("리뷰 리스트 get api 호출");
        //로그인 어떻게 되는지에 따라 바뀔 수도 있음
        long memberId = 1;
        ResponseReviewListDto reviewListDto = reviewService.getReviewList(taleId, memberId, pageable);

        return ResponseEntity.ok().body(reviewListDto);
    }
}

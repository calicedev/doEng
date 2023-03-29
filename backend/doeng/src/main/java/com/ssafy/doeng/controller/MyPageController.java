package com.ssafy.doeng.controller;

import com.ssafy.doeng.config.auth.LoginId;
import com.ssafy.doeng.data.dto.review.request.RequestReviewDto;
import com.ssafy.doeng.data.dto.review.request.RequestReviewModifyDto;
import com.ssafy.doeng.data.dto.review.response.ResponseAllReviewDto;
import com.ssafy.doeng.data.dto.tale.request.RequestTalePaymentDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleListDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleListDto;
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
    public ResponseEntity<ResponseProgressTaleListDto> getProgress(Pageable pageable, @LoginId Long id) {
        LOGGER.info("진행률 리스트 api 들어옴");

        ResponseProgressTaleListDto progressTaleListDto = taleService.getProgressTaleList(id, pageable);

        return ResponseEntity.ok().body(progressTaleListDto);
    }

    @GetMapping("/progress/{taleId}")
    public ResponseEntity<ResponseProgressTaleDetailDto> getProgressDetail(@PathVariable("taleId") long taleId, @LoginId Long id) {
        LOGGER.info("진행률 상세 api 들어옴 : {}", taleId);

        ResponseProgressTaleDetailDto responseProgressTaleDetailDto
                = taleService.getProgressTaleDetail(id, taleId);
        return ResponseEntity.ok().body(responseProgressTaleDetailDto);
    }

    @GetMapping("/tale-list")
    public ResponseEntity<ResponsePaymentTaleListDto> getPaymentTaleList(Pageable pageable, @LoginId Long id) {
        LOGGER.info("구매 관련 책 목록 들어옴");

        ResponsePaymentTaleListDto paymentTaleListDto = taleService.getPaymentTaleList(id, pageable);
        return ResponseEntity.ok().body(paymentTaleListDto);
    }

    @GetMapping("/tale-list/{taleId}")
    public ResponseEntity<ResponsePaymentTaleDetailDto> getPaymentDetail(@PathVariable("taleId") long taleId, @LoginId Long id) {
        LOGGER.info("책 구매 목록 상세 api 들어옴: {}", taleId);

        ResponsePaymentTaleDetailDto responsePaymentTaleDetailDto = taleService.getPaymentTaleDetail(id, taleId);
        return ResponseEntity.ok().body(responsePaymentTaleDetailDto);
    }

    @PostMapping("/review/{taleId}")
    public ResponseEntity<String> postReview(@PathVariable("taleId") long taleId,
            @RequestBody RequestReviewDto requestReviewDto, @LoginId Long id) {
        LOGGER.info("리뷰 post 들어옴 {}", taleId);
        requestReviewDto.setMemberId(id);
        requestReviewDto.setTaleId(taleId);
        reviewService.save(requestReviewDto);

        return ResponseEntity.ok().body("review 저장 완료");
    }

    @PutMapping("/review/{reviewId}")
    public ResponseEntity<String> putReview(@PathVariable("reviewId") long reviewId,
            @RequestBody RequestReviewModifyDto requestReviewModifyDto, @LoginId Long id) {
        LOGGER.info("리뷰 수정 api {}", reviewId);
        requestReviewModifyDto.setReviewId(reviewId);
        reviewService.modifyReview(requestReviewModifyDto, id);

        return ResponseEntity.ok().body("review 수정 완료");
    }

    @DeleteMapping("/review/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable("reviewId") long reviewId, @LoginId Long id) {
        LOGGER.info("리뷰 삭제 api {}", reviewId);
        reviewService.deleteReview(reviewId, id);

        return ResponseEntity.ok().body("review 삭제 완료");
    }

    @GetMapping("/review/{taleId}/review-list")
    public ResponseEntity<ResponseAllReviewDto> getReviewList(@PathVariable("taleId") long taleId, Pageable pageable, @LoginId Long id) {
        LOGGER.info("리뷰 리스트 get api 호출");

        ResponseAllReviewDto reviewListDto = reviewService.getReviewList(taleId, id, pageable);

        return ResponseEntity.ok().body(reviewListDto);
    }

    @PostMapping("/purchased")
    public ResponseEntity<String> postPurchased(@RequestBody RequestTalePaymentDto requestTalePaymentDto, @LoginId Long id) {
        LOGGER.info("[MyPageController] 결제 받기 api 호출");
        requestTalePaymentDto.setMemberId(id);
        taleService.postTalePayment(requestTalePaymentDto);
        return ResponseEntity.ok().body("결제 정보 저장을 완료하였습니다.");
    }
}

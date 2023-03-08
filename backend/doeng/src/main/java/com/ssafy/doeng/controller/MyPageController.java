package com.ssafy.doeng.controller;

import com.ssafy.doeng.data.dto.picture.response.ResponseProgressImageDto;
import com.ssafy.doeng.data.dto.picture.response.ResponseProgressImageListDto;
import com.ssafy.doeng.data.dto.review.request.RequestReviewDto;
import com.ssafy.doeng.data.dto.review.request.RequestReviewModifyDto;
import com.ssafy.doeng.data.dto.review.response.ResponseReviewDto;
import com.ssafy.doeng.data.dto.review.response.ResponseReviewListDto;
import com.ssafy.doeng.data.dto.scene.response.ResponseProgressSceneDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleListDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleListDto;
import com.ssafy.doeng.data.dto.word.response.ResponseProgressTestResultDto;
import com.ssafy.doeng.data.entity.progress.Progress;
import com.ssafy.doeng.data.repository.progress.ProgressRepository;
import com.ssafy.doeng.service.review.ReviewService;
import com.ssafy.doeng.service.tale.TaleService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Transactional
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MyPageController {
    private static final Logger LOGGER = LoggerFactory.getLogger(MyPageController.class);
    private final TaleService taleService;
    private final ReviewService reviewService;
    private final ProgressRepository progressRepository;

    @GetMapping("/progress")
    public ResponseEntity<ResponseProgressTaleListDto> getProgress() {
        LOGGER.info("진행률 리스트 api 들어옴");
        List<ResponseProgressTaleDto> taleList = new ArrayList<>();
        taleList.add(new ResponseProgressTaleDto(1, "백설공주", "path", 75, 3, 5));
        taleList.add(new ResponseProgressTaleDto(2, "워녕곤듀", "path2", 50, 5, 5));
        ResponseProgressTaleListDto progressTaleListDto = ResponseProgressTaleListDto.builder()
                .taleList(taleList)
                .build();

        return ResponseEntity.ok().body(progressTaleListDto);
    }

    @GetMapping("/progress/{taleId}")
    public ResponseEntity<ResponseProgressTaleDetailDto> getProgressDetail(@PathVariable("taleId") long taleId) {
        LOGGER.info("진행률 상세 api 들어옴 : {}", taleId);
        long memberId = 2;
        List<ResponseProgressImageDto> progressImageDtoList = new ArrayList<>();
        List<Progress> progressList = progressRepository.getProgressDetailsByMember(memberId, taleId);
        LOGGER.info(progressList.get(0).getPictures().get(0).getImage());
        LOGGER.info(progressList.get(0).getPictures().get(1).getImage());
        LOGGER.info(progressList.get(0).getScene().getTitle());
        ResponseProgressImageDto progressImageDto = ResponseProgressImageDto.builder()
                .id(1)
                .image("path")
                .build();
        progressImageDtoList.add(progressImageDto);

        List<ResponseProgressSceneDto> progressSceneDtoList = new ArrayList<>();
        ResponseProgressSceneDto progressSceneDto1 = ResponseProgressSceneDto.builder()
                .id(1)
                .sceneTitle("재밌는 놀이")
                .imageList(progressImageDtoList)
                .build();
        ResponseProgressSceneDto progressSceneDto2 = ResponseProgressSceneDto.builder()
                .id(2)
                .sceneTitle("신나는 놀이")
                .imageList(progressImageDtoList)
                .build();
        progressSceneDtoList.add(progressSceneDto1);
        progressSceneDtoList.add(progressSceneDto2);

        List<ResponseProgressTestResultDto> progressTestResultDtoList = new ArrayList<>();
        List<Boolean> engList = new ArrayList<>(){{add(true); add(true); add(false); add(true); add(false);}};
        ResponseProgressTestResultDto progressTestResultDto1 = ResponseProgressTestResultDto.builder()
                .testCount(1)
                .engList(engList)
                .build();
        ResponseProgressTestResultDto progressTestResultDto2 = ResponseProgressTestResultDto.builder()
                .testCount(2)
                .engList(engList)
                .build();
        progressTestResultDtoList.add(progressTestResultDto1);
        progressTestResultDtoList.add(progressTestResultDto2);

        ResponseProgressTaleDetailDto responseProgressTaleDetailDto = ResponseProgressTaleDetailDto.builder()
                .title("백설곤듀")
                .backgroundImage("path1")
                .sceneList(progressSceneDtoList)
                .testList(progressTestResultDtoList)
                .build();
        return ResponseEntity.ok().body(responseProgressTaleDetailDto);
    }

    @GetMapping("/progress/{taleId}/{sceneId}")
    public ResponseEntity<ResponseProgressImageListDto> getProgressImageList(@PathVariable("taleId") long taleId,
            @PathVariable("sceneId") long sceneId) {
        LOGGER.info("학습 앨범 리스트 api 들어옴 {} {}", taleId, sceneId);

        List<ResponseProgressImageDto> progressImageDtoList = new ArrayList<>();
        ResponseProgressImageDto progressImageDto1 = ResponseProgressImageDto.builder()
                .id(1)
                .image("path")
                .build();
        progressImageDtoList.add(progressImageDto1);
        ResponseProgressImageDto progressImageDto2 = ResponseProgressImageDto.builder()
                .id(2)
                .image("path2")
                .build();
        progressImageDtoList.add(progressImageDto2);

        ResponseProgressImageListDto imageListDto = ResponseProgressImageListDto.builder()
                .imageList(progressImageDtoList)
                .build();

        return ResponseEntity.ok().body(imageListDto);
    }

    @GetMapping("/tale-list")
    public ResponseEntity<ResponsePaymentTaleListDto> getPaymentTaleList(Pageable pageable) {
        LOGGER.info("구매 관련 책 목록 들어옴");
        long memberId = 1;
        ResponsePaymentTaleListDto paymentTaleListDto = taleService.getPaymentTaleList(memberId, pageable);
        return ResponseEntity.ok().body(paymentTaleListDto);
    }

    @GetMapping("/tale-list/{taleId}")
    public ResponseEntity<ResponsePaymentTaleDetailDto> getPaymentDetail(@PathVariable("taleId") long taleId) {
        LOGGER.info("책 구매 목록 상세 api 들어옴: {}", taleId);

        ResponseReviewDto myReview = ResponseReviewDto.builder()
                .id(1)
                .memberId(1)
                .score(4)
                .content("너무 조아요")
                .build();

        List<ResponseReviewDto> reviewDtoList = new ArrayList<>();
        ResponseReviewDto reviewDto1 = ResponseReviewDto.builder()
                .id(2)
                .memberId(2)
                .score(3)
                .content("그저 그래여")
                .build();
        ResponseReviewDto reviewDto2 = ResponseReviewDto.builder()
                .id(3)
                .memberId(3)
                .score(1)
                .content("너무 별로에여")
                .build();
        reviewDtoList.add(reviewDto1);
        reviewDtoList.add(reviewDto2);

        ResponseReviewListDto reviewListDto = ResponseReviewListDto.builder()
                .reviewList(reviewDtoList)
                .build();

        ResponsePaymentTaleDetailDto responsePaymentTaleDetailDto = ResponsePaymentTaleDetailDto.builder()
                .id(1)
                .title("백설공쥬")
                .backgroundImage("path")
                .description("백설곤듀와 난쟁이들 블라블ㄹ라")
                .score(4.5)
                .price(15000)
                .purchased(true)
                .myReview(myReview)
                .reviewList(reviewListDto)
                .build();
        return ResponseEntity.ok().body(responsePaymentTaleDetailDto);
    }

    @PostMapping("/review/{taleId}")
    private ResponseEntity<String> postReview(@PathVariable("taleId") long taleId,
            @RequestBody RequestReviewDto requestReviewDto) {
        requestReviewDto.setMemberId(2);
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

package com.ssafy.doeng.controller;

import com.ssafy.doeng.data.dto.picture.response.ResponseProgressImageDto;
import com.ssafy.doeng.data.dto.scene.response.ResponseProgressSceneDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleListDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleListDto;
import com.ssafy.doeng.data.dto.word.response.ResponseProgressTestResultDto;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MyPageController {
    private static final Logger LOGGER = LoggerFactory.getLogger(MyPageController.class);

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

        List<ResponseProgressImageDto> progressImageDtoList = new ArrayList<>();
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

    @GetMapping("/tale-list")
    public ResponseEntity<ResponsePaymentTaleListDto> getPaymentTaleList() {
        LOGGER.info("구매 관련 책 목록 들어옴");

        List<ResponsePaymentTaleDto> paymentTaleDtoList = new ArrayList<>();
        ResponsePaymentTaleDto paymentTaleDto1 = ResponsePaymentTaleDto.builder()
                .id(1)
                .title("Snow White")
                .backgroundImage("path1")
                .score(4.5)
                .purchased(true)
                .build();
        ResponsePaymentTaleDto paymentTaleDto2 = ResponsePaymentTaleDto.builder()
                .id(2)
                .title("토끼와 거북잉")
                .backgroundImage("path2")
                .score(4.9)
                .purchased(false)
                .build();
        paymentTaleDtoList.add(paymentTaleDto1);
        paymentTaleDtoList.add(paymentTaleDto2);
        ResponsePaymentTaleListDto paymentTaleListDto = ResponsePaymentTaleListDto.builder()
                .taleList(paymentTaleDtoList)
                .build();

        return ResponseEntity.ok().body(paymentTaleListDto);
    }
}

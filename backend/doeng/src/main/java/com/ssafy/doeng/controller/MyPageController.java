package com.ssafy.doeng.controller;

import com.ssafy.doeng.data.dto.picture.response.ResponseProgressImageDto;
import com.ssafy.doeng.data.dto.scene.response.ResponseProgressSceneDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleDto;
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
    public ResponseEntity<List<ResponseProgressTaleDto>> getProgress() {
        LOGGER.info("진행률 리스트 api 들어옴");
        List<ResponseProgressTaleDto> taleList = new ArrayList<>();
        taleList.add(new ResponseProgressTaleDto(1, "백설공주", "path", 75, 3, 5));
        taleList.add(new ResponseProgressTaleDto(2, "워녕곤듀", "path2", 50, 5, 5));
        return new ResponseEntity<>(taleList, HttpStatus.OK);
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
        ResponseProgressTestResultDto progressTestResultDto1 = ResponseProgressTestResultDto.builder()
                .testCount(1)
                .engWord(true)
                .build();
        ResponseProgressTestResultDto progressTestResultDto2 = ResponseProgressTestResultDto.builder()
                .testCount(2)
                .engWord(false)
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
}

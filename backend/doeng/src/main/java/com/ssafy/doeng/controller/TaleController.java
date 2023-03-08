package com.ssafy.doeng.controller;

import com.ssafy.doeng.data.dto.tale.request.RequestTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseWordDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDto;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tale")
public class TaleController {

    private final static Logger LOGGER = LoggerFactory.getLogger(TaleController.class);
    @GetMapping("/list")
    public ResponseEntity<List<ResponseMainTaleDto>> getTaleList() {
        LOGGER.info("[TaleController] getTaleList loginId : {}", 1);
        List<ResponseMainTaleDto> resopnseDto = new ArrayList<>();
        resopnseDto.add(ResponseMainTaleDto.builder()
                .id(1)
                .title("백설공주")
                .backgroundImage("path")
                .purchased(true)
                .build());
        LOGGER.info("[TaleController] getTaleList 종료");
        return ResponseEntity.ok().body(resopnseDto);
    }

    @GetMapping("{taleId}/detail")
    public ResponseEntity<ResponseMainTaleDetailDto> getTaleDetail(
            @PathVariable("taleId") int taleId) {
        RequestTaleDetailDto requestDto = new RequestTaleDetailDto(taleId, 1);

        LOGGER.info("[TaleController] getTaleDetail taleId: {} loginId : {}",
                requestDto.getTaleId(), requestDto.getMemberId());

        List<ResponseWordDto> wordList = new ArrayList<>();
        wordList.add(ResponseWordDto.builder()
                .id(1)
                .engWord("apple")
                .korWord("사과")
                .voice("음성 파일 위치")
                .image("사진 위치")
                .correct(true)
                .build());

        ResponseMainTaleDetailDto resopnseDto = ResponseMainTaleDetailDto.builder()
                .title("백설공주")
                .wordList(wordList)
                .sceneOrder(1)
                .sceneCount(10)
                .mainImage("메인 이미지 위치")
                .build();
        LOGGER.info("[TaleController] getTaleDetail 종료");
        return ResponseEntity.ok().body(resopnseDto);
    }
}

package com.ssafy.doeng.controller;

import com.ssafy.doeng.data.dto.tale.request.RequestTailDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResopnseWordDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDto;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
        return ResponseEntity.ok().body(resopnseDto);
    }

    @GetMapping("{taleId}/detail")
    public ResponseEntity<ResponseMainTaleDetailDto> getTaledeTailDto(
            @PathVariable("taleId") int tailId) {
        RequestTailDetailDto requestDto = new RequestTailDetailDto(tailId, 1);

        LOGGER.info("[TaleController] getTaleDetailList taleId: {} loginId : {}",
                requestDto.getTaleId(), requestDto.getMemberId());

        List<ResopnseWordDto> wordList = new ArrayList<>();
        wordList.add(ResopnseWordDto.builder()
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
                .progress(1)
                .mainImage("메인 이미지 위치")
                .build();

        return ResponseEntity.ok().body(resopnseDto);
    }
}

package com.ssafy.doeng.controller;


import com.ssafy.doeng.data.dto.word.request.RequestListPostGetWord;
import com.ssafy.doeng.data.dto.word.request.RequestPostGetWord;
import com.ssafy.doeng.data.dto.word.request.RequestWordTestDto;
import com.ssafy.doeng.data.dto.word.response.ResponseTestWordDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordTestDto;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/word-test")
public class WordTestController {
    private final static Logger LOGGER = LoggerFactory.getLogger(TaleController.class);
    @GetMapping("/{taleId}")
    public ResponseEntity<ResponseWordTestDto> getWordTest(@PathVariable("taleId") long taleId) {
        RequestWordTestDto requestDto = new RequestWordTestDto(1, taleId);
        LOGGER.info("[WordTestController] getWordTest taleId : {}, memberId : {}", requestDto.getTaleId(), requestDto.getMemberId());

        List<ResponseTestWordDto> testWordList = new ArrayList<>();
        ///////////// 더미
        testWordList.add(ResponseTestWordDto.builder()
                        .id(1)
                        .engWord("apple")
                        .korWord("사과")
                        .image("사과 이미지")
                        .voice("사과 음성")
                        .wrongImage("배 이미지")
                .build());
        testWordList.add(ResponseTestWordDto.builder()
                .id(2)
                .engWord("eat")
                .korWord("먹다")
                .image("먹는 이미지")
                .voice("먹다 음성")
                .wrongImage("뱉는 이미지")
                .build());
        testWordList.add(ResponseTestWordDto.builder()
                .id(3)
                .engWord("word3")
                .korWord("단어3")
                .image("단어3 이미지")
                .voice("단어3 음성")
                .wrongImage("word4 이미지")
                .build());
        ResponseWordTestDto resopnseDto = ResponseWordTestDto.builder()
                .title("백설공주")
                .testList(testWordList)
                .build();
        //////////////더미

        LOGGER.info("[WordTestController] getWordTest 종료");
        return ResponseEntity.ok().body(resopnseDto);
    }

    @PostMapping()
    public ResponseEntity<String> postGetWord(@RequestBody RequestListPostGetWord wordList) {
        wordList.setMemberId(1);
        LOGGER.info("[WordTestController] postGetWord getSize : {}, memberId : {}", wordList.getWordList().size(), wordList.getMemberId());
        LOGGER.info("[WordTestController] postGetWord 종료");
        return ResponseEntity.ok().body("정상적으로 저장을 처리했습니다.");
    }
}

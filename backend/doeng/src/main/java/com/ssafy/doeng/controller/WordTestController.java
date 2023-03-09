package com.ssafy.doeng.controller;


import com.ssafy.doeng.data.dto.word.request.RequestListPostGetWord;
import com.ssafy.doeng.data.dto.word.request.RequestPostGetWord;
import com.ssafy.doeng.data.dto.word.request.RequestWordTestDto;
import com.ssafy.doeng.data.dto.word.response.ResponseTestWordDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordTestDto;
import com.ssafy.doeng.service.review.ReviewService;
import com.ssafy.doeng.service.test.TestService;
import com.ssafy.doeng.service.word.WordService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/word-test")
public class WordTestController {
    private final static Logger LOGGER = LoggerFactory.getLogger(TaleController.class);
    private final WordService wordService;
    private final TestService testService;

    @GetMapping("/{taleId}")
    public ResponseEntity<ResponseWordTestDto> getWordTest(@PathVariable("taleId") long taleId) {
        RequestWordTestDto requestDto = new RequestWordTestDto(1, taleId);
        LOGGER.info("[WordTestController] getWordTest taleId : {}, memberId : {}", requestDto.getTaleId(), requestDto.getMemberId());

        ResponseWordTestDto resopnseDto = wordService.getWordTest(requestDto);
        LOGGER.info("[WordTestController] getWordTest 종료");

        return ResponseEntity.ok().body(resopnseDto);
    }

    @PostMapping()
    public ResponseEntity<String> postGetWord(@RequestBody RequestListPostGetWord wordList) {
        wordList.setMemberId(1);
        LOGGER.info("[WordTestController] postGetWord getSize : {}, memberId : {}", wordList.getWordList().size(), wordList.getMemberId());
        testService.save(wordList);
        LOGGER.info("[WordTestController] postGetWord 종료");
        return ResponseEntity.ok().body("정상적으로 저장을 처리했습니다.");
    }
}

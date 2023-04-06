package com.ssafy.doeng.controller;


import com.ssafy.doeng.config.auth.LoginId;
import com.ssafy.doeng.data.dto.word.request.RequestListPostGetWord;
import com.ssafy.doeng.data.dto.word.request.RequestWordTestDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordTestDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordTestResultDto;
import com.ssafy.doeng.service.test.TestService;
import com.ssafy.doeng.service.word.WordService;
import javax.validation.Valid;
import javax.validation.constraints.Min;
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
    public ResponseEntity<ResponseWordTestDto> getWordTest(@PathVariable("taleId") @Min(1) long taleId, @LoginId long memberId) {
        RequestWordTestDto requestDto = new RequestWordTestDto(memberId, taleId);
        LOGGER.info("[WordTestController] getWordTest taleId : {}, memberId : {}", requestDto.getTaleId(), requestDto.getMemberId());

        ResponseWordTestDto resopnseDto = wordService.getWordTest(requestDto);
        LOGGER.info("[WordTestController] getWordTest 종료");

        return ResponseEntity.ok().body(resopnseDto);
    }

    @PostMapping()
    public ResponseEntity<ResponseWordTestResultDto> postGetWord(@RequestBody @Valid RequestListPostGetWord wordList, @LoginId long memberId) {
        wordList.setMemberId(memberId);
        System.out.println();
        LOGGER.info("[WordTestController] postGetWord getSize : {}, memberId : {}", wordList.getWordList().size(), wordList.getMemberId());
        int count = testService.save(wordList);
        long taleId = wordList.getWordList().get(0).getTaleId();
        LOGGER.info("[WordTestController] postGetWord 종료");
        testService.getWordTestResult(count, taleId , memberId);
        return ResponseEntity.ok().body(testService.getWordTestResult(count, taleId, memberId));
    }


}

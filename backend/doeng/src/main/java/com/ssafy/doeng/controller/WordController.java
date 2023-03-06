package com.ssafy.doeng.controller;


import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDto;
import com.ssafy.doeng.data.dto.word.response.ResponseTestWordDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordListDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordTestDto;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/word")
public class WordController {
    private final static Logger LOGGER = LoggerFactory.getLogger(TaleController.class);
    @GetMapping()
    public ResponseEntity<ResponseWordListDto> getWord() {
        LOGGER.info("[WordController] getWord loginId : {}", 1);
        ////// 더미

        List<ResponseWordDto> wordList = new ArrayList<>();
        wordList.add(ResponseWordDto.builder()
                .id(1)
                .engWord("apple")
                .korWord("사과")
                .image("사과 이미지")
                .voice("사과 음성")
                .build());
        wordList.add(ResponseWordDto.builder()
                .id(2)
                .engWord("eat")
                .korWord("먹다")
                .image("먹는 이미지")
                .voice("먹다 음성")
                .build());
        wordList.add(ResponseWordDto.builder()
                .id(3)
                .engWord("word3")
                .korWord("단어3")
                .image("단어3 이미지")
                .voice("단어3 음성")
                .build());

        ////// 더미
        ResponseWordListDto resopnseDto = ResponseWordListDto.builder()
                .wordList(wordList)
                .build();
        LOGGER.info("[WordController] getWord 종료");
        return ResponseEntity.ok().body(resopnseDto);
    }

}

package com.ssafy.doeng.controller;

import com.ssafy.doeng.data.dto.word.response.ResponseWordDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordListDto;
import com.ssafy.doeng.service.word.WordService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/word")
public class WordController {

    private final WordService wordService;
    private final static Logger LOGGER = LoggerFactory.getLogger(TaleController.class);
    @GetMapping()
    public ResponseEntity<ResponseWordListDto> getWord() {
        LOGGER.info("[WordController] getWord loginId : {}", 1);
        ResponseWordListDto responseDto = wordService.getWord(1);
        LOGGER.info("[WordController] getWord 종료");
        return ResponseEntity.ok().body(responseDto);
    }
}

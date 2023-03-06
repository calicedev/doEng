package com.ssafy.doeng.controller;

import com.ssafy.doeng.data.dto.tale.response.responseProgressTaleDto;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mypage")
@Slf4j
@RequiredArgsConstructor
public class MyPageController {
    private static final Logger LOGGER = LoggerFactory.getLogger(MyPageController.class);

    @GetMapping("/progress")
    public ResponseEntity<List<responseProgressTaleDto>> getProgress() {
        List<responseProgressTaleDto> taleList = new ArrayList<>();
        taleList.add(new responseProgressTaleDto(1, "백설공주", "path", 75, 3, 5));
        taleList.add(new responseProgressTaleDto(2, "워녕곤듀", "path2", 50, 5, 5));
        return new ResponseEntity<>(taleList, HttpStatus.OK);
    }

}

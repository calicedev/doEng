package com.ssafy.doeng.controller;

import com.ssafy.doeng.config.auth.LoginId;
import com.ssafy.doeng.data.dto.tale.request.RequestTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseWordDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDto;
import com.ssafy.doeng.service.tale.TaleService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/tale")
public class TaleController {

    private final TaleService taleService;
    private final static Logger LOGGER = LoggerFactory.getLogger(TaleController.class);
    @GetMapping("/list")
    public ResponseEntity<List<ResponseMainTaleDto>> getTaleList(@LoginId long memberId) {
        LOGGER.info("[TaleController] getTaleList loginId : {}", 1);

        List<ResponseMainTaleDto> resopnseDto = taleService.getTaleList(memberId);
        LOGGER.info("[TaleController] getTaleList 종료");
        return ResponseEntity.ok().body(resopnseDto);
    }

    @GetMapping("{taleId}/detail")
    public ResponseEntity<ResponseMainTaleDetailDto> getTaleDetail(
            @PathVariable("taleId") int taleId, @LoginId long memberId) {
        RequestTaleDetailDto requestDto = new RequestTaleDetailDto(memberId, taleId);

        LOGGER.info("[TaleController] getTaleDetail taleId: {} loginId : {}",
                requestDto.getTaleId(), requestDto.getMemberId());

        ResponseMainTaleDetailDto resopnseDto = taleService.getTaleDetail(requestDto);

        LOGGER.info("[TaleController] getTaleDetail 종료");
        return ResponseEntity.ok().body(resopnseDto);
    }
}

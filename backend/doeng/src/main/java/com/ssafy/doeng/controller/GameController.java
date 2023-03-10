package com.ssafy.doeng.controller;

import com.ssafy.doeng.config.auth.LoginId;
import com.ssafy.doeng.data.dto.progress.request.RequestPostProgressDto;
import com.ssafy.doeng.data.dto.scene.response.ResopnseSceneDto;
import com.ssafy.doeng.data.dto.scene.response.ResopnseSceneListDto;
import com.ssafy.doeng.service.progress.ProgressService;
import com.ssafy.doeng.service.scene.SceneService;
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
@RequestMapping("/game")
public class GameController {

    private static final Logger LOGGER = LoggerFactory.getLogger(GameController.class);
    private final SceneService sceneService;
    private final ProgressService progressService;

    @GetMapping("/{taleId}/scene")
    public ResponseEntity<ResopnseSceneListDto> getSceneListByTale(@PathVariable @Min(1) long taleId, @LoginId long memberId) {
        LOGGER.info("[GameController] getSceneListByTale 동화 전체 scene taleId : {}", taleId);
        ResopnseSceneListDto responseDto = sceneService.getSceneListByTale(taleId, memberId);

        LOGGER.info("[GameController] getSceneListByTale 종료");
        return ResponseEntity.ok().body(responseDto);
    }

    @GetMapping("/{taleId}/scene/{sceneOrder}")
    public ResponseEntity<ResopnseSceneDto> getSceneByTale(@PathVariable @Min(1) long taleId,
            @PathVariable @Min(1) int sceneOrder, @LoginId long memberId) {
        LOGGER.info("[GameController] getSceneByTale 동화 scene taleId : {}", taleId);
        ResopnseSceneDto responseDto = sceneService.getSceneByTale(taleId, memberId, sceneOrder);

        LOGGER.info("[GameController] getSceneByTale 종료");
        return ResponseEntity.ok().body(responseDto);
    }

    @PostMapping("/scene")
    public ResponseEntity<String> getSceneByTale(@RequestBody @Valid RequestPostProgressDto requestDto, @LoginId long memberId) {
        requestDto.setMemberId(memberId);
        LOGGER.info("[GameController] getSceneByTale 동화 진행도 저장 request : {}", requestDto);
        progressService.save(requestDto);
        LOGGER.info("[GameController] getSceneByTale 동화 진행도 저장");
        return ResponseEntity.ok().body("진행도가 저장되었습니다.");
    }

}

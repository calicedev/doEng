package com.ssafy.doeng.service.scene.impl;

import com.ssafy.doeng.data.dto.game.response.ResponseScriptDto;
import com.ssafy.doeng.data.dto.scene.response.ResopnseSceneDto;
import com.ssafy.doeng.data.dto.scene.response.ResopnseSceneListDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordDto;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.scene.Scene;
import com.ssafy.doeng.data.entity.script.Script;
import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.entity.word.Word;
import com.ssafy.doeng.data.repository.scene.SceneRepository;
import com.ssafy.doeng.data.repository.tale.TaleRepository;
import com.ssafy.doeng.errors.code.SceneErrorCode;
import com.ssafy.doeng.errors.code.TaleErrorCode;
import com.ssafy.doeng.errors.exception.ErrorException;
import com.ssafy.doeng.service.Common;
import com.ssafy.doeng.service.aws.AwsS3Service;
import com.ssafy.doeng.service.scene.SceneService;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class SceneServiceImpl implements SceneService {

    final private static Logger LOGGER = LoggerFactory.getLogger(SceneServiceImpl.class);
    final private Common common;
    private final TaleRepository taleRepository;
    private final SceneRepository sceneRepository;
    private final AwsS3Service awsS3Service;
    @Override
    @Transactional(readOnly = true)
    public ResopnseSceneListDto getSceneListByTale(long taleId, long memberId) {
        LOGGER.info("[SceneServiceImpl] getSceneListByTale taleId : {}, memberId : {}", taleId, memberId);
        Member member = common.getMember(memberId);
        Tale tale = taleRepository.findByIdFetchSceneListScriptWord(taleId)
                .orElseThrow(() -> new ErrorException(TaleErrorCode.TALE_NOT_FOUND));
        common.notPaymentThrowException(member, tale);

        var resopnseDto = ResopnseSceneListDto.builder()
                .sceneList(makeSceneList(tale.getScenes()))
                .build();
        LOGGER.info("[SceneServiceImpl] getSceneListByTale 종료");
        return resopnseDto;
    }
    private List<ResopnseSceneDto> makeSceneList(List<Scene> scenes) {
        LOGGER.info("[SceneServiceImpl] makeSceneList sceneSize : {}", scenes.size());
        List<ResopnseSceneDto> returnDto = scenes.stream().map(
                scene -> ResopnseSceneDto.builder()
                        .id(scene.getId())
                        .image(scene.getImage())
                        .sceneOrder(scene.getSceneOrder())
                        .interactiveType(scene.getInteractiveType())
                        .backgroundMusic(scene.getBackgroundMusic())
                        .scriptList(makeScriptList(scene.getScripts()))
                        .word(wordToDto(scene.getWord()))
                        .build()
        ).collect(Collectors.toList());
        LOGGER.info("[SceneServiceImpl] makeSceneList 종료");
        return returnDto;
    }
    private List<ResponseScriptDto> makeScriptList(List<Script> scripts) {
        LOGGER.info("[SceneServiceImpl] makeScriptList scriptSize : {}", scripts.size());
        if (scripts.isEmpty()) {
            LOGGER.info("[SceneServiceImpl] makeScriptList 스크립트가 존재하지 않는 씬");
            return new ArrayList<>();
        }
        List<ResponseScriptDto> returnDto = scripts.stream().map(
                script -> ResponseScriptDto.builder()
                        .voice(awsS3Service.getTemporaryUrl(script.getVoice()))
                        .content(script.getContent())
                        .scriptOrder(script.getScriptOrder())
                        .build()
        ).collect(Collectors.toList());

        LOGGER.info("[SceneServiceImpl] makeScriptList 종료");
        return returnDto;
    }

    private ResponseWordDto wordToDto(Word word) {
        if (word == null) {
            LOGGER.info("[SceneServiceImpl] wordToDto 단어가 존재하지 않는 스크립트 입니다.");
            return null;
        }
        LOGGER.info("[SceneServiceImpl] wordToDto wordId : {}", word.getId());
        var returnDto = ResponseWordDto.builder()
                .id(word.getId())
                .image(awsS3Service.getTemporaryUrl(word.getImage()))
                .engWord(word.getEngWord())
                .korWord(word.getKorWord())
                .voice(awsS3Service.getTemporaryUrl(word.getVoice()))
                .build();
        LOGGER.info("[SceneServiceImpl] wordToDto 종료");
        return returnDto;
    }

    @Override
    @Transactional(readOnly = true)
    public ResopnseSceneDto getSceneByTale(long taleId, long memberId, int sceneOrder) {
        LOGGER.info("[SceneServiceImpl] getSceneByTale taleId : {}, sceneOrder : {}, memberId : {}", taleId, sceneOrder,  memberId);
        Member member = common.getMember(memberId);
        Tale tale = common.getTale(taleId);
        common.notPaymentThrowException(member, tale);

        Scene scene = sceneRepository.findByTaleIdAndSceneOrderFetch(tale, sceneOrder)
                .orElseThrow(() -> new ErrorException(SceneErrorCode.SCENE_NOT_FOUND));

        var responseDto = ResopnseSceneDto.builder()
                .id(scene.getId())
                .image(awsS3Service.getTemporaryUrl(scene.getImage()))
                .sceneOrder(scene.getSceneOrder())
                .interactiveType(scene.getInteractiveType())
                .backgroundMusic(awsS3Service.getTemporaryUrl(scene.getBackgroundMusic()))
                .scriptList(makeScriptList(scene.getScripts()))
                .word(wordToDto(scene.getWord()))
                .build();

        LOGGER.info("[SceneServiceImpl] getSceneByTale 종료");
        return responseDto;
    }

}

package com.ssafy.doeng.service.info.impl;

import com.ssafy.doeng.data.dto.info.request.RequestSceneInfoDto;
import com.ssafy.doeng.data.dto.info.request.RequestScriptInfoDto;
import com.ssafy.doeng.data.dto.info.request.RequestTaleInfoDto;
import com.ssafy.doeng.data.dto.info.request.RequestWordInfoDto;
import com.ssafy.doeng.data.entity.scene.Scene;
import com.ssafy.doeng.data.entity.script.Script;
import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.entity.word.Word;
import com.ssafy.doeng.data.repository.scene.SceneRepository;
import com.ssafy.doeng.data.repository.script.ScriptRepository;
import com.ssafy.doeng.data.repository.tale.TaleRepository;
import com.ssafy.doeng.data.repository.word.WordRepository;
import com.ssafy.doeng.errors.code.TaleErrorCode;
import com.ssafy.doeng.errors.exception.ErrorException;
import com.ssafy.doeng.service.info.InfoService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class InfoServiceImpl implements InfoService {

    private static final Logger LOGGER = LoggerFactory.getLogger(InfoServiceImpl.class);
    private final TaleRepository taleRepository;
    private final SceneRepository sceneRepository;
    private final ScriptRepository scriptRepository;
    private final WordRepository wordRepository;
    @Override
    public void saveTale(RequestTaleInfoDto requestTaleInfoDto) {
        Tale tale = Tale.builder()
                .title(requestTaleInfoDto.getTitle())
                .description(requestTaleInfoDto.getDescription())
                .price(requestTaleInfoDto.getPrice())
                .backgroundImage(requestTaleInfoDto.getBackgroundImage())
                .mainImage(requestTaleInfoDto.getMainImage())
                .build();
        taleRepository.save(tale);
    }

    @Override
    public void saveScene(RequestSceneInfoDto requestSceneInfoDto) {
        Tale tale = taleRepository.findById(requestSceneInfoDto.getTaleId())
                .orElseThrow(() -> new ErrorException(TaleErrorCode.TALE_NOT_FOUND));
        Word word = wordRepository.findById(requestSceneInfoDto.getWordId())
                .orElseThrow(() -> new RuntimeException("단어를 찾을 수 없습니다."));
        Scene scene = Scene.builder()
                .tale(tale)
                .word(word)
                .title(requestSceneInfoDto.getTitle())
                .image(requestSceneInfoDto.getImage())
                .sceneOrder(requestSceneInfoDto.getSceneOrder())
                .interactiveType(requestSceneInfoDto.getInteractiveType())
                .backgroundMusic(requestSceneInfoDto.getBackgroundMusic())
                .build();

        sceneRepository.save(scene);
    }

    @Override
    public void saveScript(RequestScriptInfoDto requestScriptInfoDto) {
        Scene scene = sceneRepository.findById(requestScriptInfoDto.getSceneId())
                .orElseThrow(() -> new RuntimeException("씬을 찾을 수 없습니다."));
        Script script = Script.builder()
                .scene(scene)
                .scriptOrder(requestScriptInfoDto.getScriptOrder())
                .content(requestScriptInfoDto.getContent())
                .voice(requestScriptInfoDto.getVoice())
                .build();
        scriptRepository.save(script);
    }

    @Override
    public void saveWord(RequestWordInfoDto requestWordInfoDto) {
        Word word = Word.builder()
                .engWord(requestWordInfoDto.getEngWord())
                .korWord(requestWordInfoDto.getKorWord())
                .image(requestWordInfoDto.getImage())
                .voice(requestWordInfoDto.getVoice())
                .build();
        wordRepository.save(word);
    }
}

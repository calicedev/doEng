package com.ssafy.doeng.service.info.impl;

import com.ssafy.doeng.data.dto.aws.FileDto;
import com.ssafy.doeng.data.dto.info.request.RequestMaterialInfoDto;
import com.ssafy.doeng.data.dto.info.request.RequestSceneInfoDto;
import com.ssafy.doeng.data.dto.info.request.RequestScriptInfoDto;
import com.ssafy.doeng.data.dto.info.request.RequestTaleHasMaterialInfoDto;
import com.ssafy.doeng.data.dto.info.request.RequestTaleInfoDto;
import com.ssafy.doeng.data.dto.info.request.RequestWordInfoDto;
import com.ssafy.doeng.data.entity.TaleHasMaterial;
import com.ssafy.doeng.data.entity.material.Material;
import com.ssafy.doeng.data.entity.scene.Scene;
import com.ssafy.doeng.data.entity.script.Script;
import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.entity.word.Word;
import com.ssafy.doeng.data.repository.material.MaterialRepository;
import com.ssafy.doeng.data.repository.material.TaleHasMaterialRepository;
import com.ssafy.doeng.data.repository.scene.SceneRepository;
import com.ssafy.doeng.data.repository.script.ScriptRepository;
import com.ssafy.doeng.data.repository.tale.TaleRepository;
import com.ssafy.doeng.data.repository.word.WordRepository;
import com.ssafy.doeng.errors.code.TaleErrorCode;
import com.ssafy.doeng.errors.exception.ErrorException;
import com.ssafy.doeng.service.aws.AwsS3Service;
import com.ssafy.doeng.service.info.InfoService;
import java.io.IOException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Transactional
@Service
public class InfoServiceImpl implements InfoService {

    private static final Logger LOGGER = LoggerFactory.getLogger(InfoServiceImpl.class);
    private final TaleRepository taleRepository;
    private final SceneRepository sceneRepository;
    private final ScriptRepository scriptRepository;
    private final WordRepository wordRepository;
    private final MaterialRepository materialRepository;
    private final TaleHasMaterialRepository taleHasMaterialRepository;
    private final AwsS3Service awsS3Service;

    @Override
    public void saveTale(RequestTaleInfoDto requestTaleInfoDto) {
        LOGGER.info("[InfoServiceImpl] tale 저장");
        MultipartFile backImage = requestTaleInfoDto.getBackgroundImage();
        MultipartFile mainImage = requestTaleInfoDto.getMainImage();
        FileDto backImageDto;
        FileDto mainImageDto;
        try {
            backImageDto = awsS3Service.upload(backImage, "tale");
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        try {
            mainImageDto = awsS3Service.upload(mainImage, "tale");
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        Tale tale = Tale.builder()
                .title(requestTaleInfoDto.getTitle())
                .description(requestTaleInfoDto.getDescription())
                .price(requestTaleInfoDto.getPrice())
                .backgroundImage(backImageDto.getFileName())
                .mainImage(mainImageDto.getFileName())
                .build();
        LOGGER.info("[InfoServiceImpl] tale ti : {} \n des : {} \n fname : {} \nfname : {} ", requestTaleInfoDto.getTitle()
        , requestTaleInfoDto.getDescription(), backImageDto.getFileName(), mainImageDto.getFileName());
        taleRepository.save(tale);
        LOGGER.info("[InfoServiceImpl] tale 저장 완료");
    }

    @Override
    public void saveScene(RequestSceneInfoDto requestSceneInfoDto) {
        LOGGER.info("[InfoServiceImpl] scene 저장");

        MultipartFile image = requestSceneInfoDto.getImage();
        FileDto imageDto;
        try {
            imageDto = awsS3Service.upload(image, "tale");
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        Tale tale = taleRepository.findById(requestSceneInfoDto.getTaleId())
                .orElseThrow(() -> new ErrorException(TaleErrorCode.TALE_NOT_FOUND));
        Word word = wordRepository.findById(requestSceneInfoDto.getWordId())
                .orElseThrow(() -> new RuntimeException("단어를 찾을 수 없습니다."));
        Scene scene = Scene.builder()
                .tale(tale)
                .word(word)
                .title(requestSceneInfoDto.getTitle())
                .image(imageDto.getFileName())
                .sceneOrder(requestSceneInfoDto.getSceneOrder())
                .interactiveType(requestSceneInfoDto.getInteractiveType())
                .backgroundMusic(requestSceneInfoDto.getBackgroundMusic())
                .build();

        sceneRepository.save(scene);
        LOGGER.info("[InfoServiceImpl] scene 저장 완료");
    }

    @Override
    public void saveScript(RequestScriptInfoDto requestScriptInfoDto) {
        LOGGER.info("[InfoServiceImpl] script 저장");

        MultipartFile voice = requestScriptInfoDto.getVoice();
        FileDto voiceDto;
        try {
            voiceDto = awsS3Service.upload(voice, "tale");
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        Scene scene = sceneRepository.findById(requestScriptInfoDto.getSceneId())
                .orElseThrow(() -> new RuntimeException("씬을 찾을 수 없습니다."));
        Script script = Script.builder()
                .scene(scene)
                .scriptOrder(requestScriptInfoDto.getScriptOrder())
                .content(requestScriptInfoDto.getContent())
                .voice(voiceDto.getFileName())
                .build();
        scriptRepository.save(script);

        LOGGER.info("[InfoServiceImpl] script 저장 완료");
    }

    @Override
    public void saveWord(RequestWordInfoDto requestWordInfoDto) {
        LOGGER.info("[InfoServiceImpl] word 저장");

        MultipartFile image = requestWordInfoDto.getImage();
        FileDto imageDto;
        try {
            imageDto = awsS3Service.upload(image, "word");
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        MultipartFile voice = requestWordInfoDto.getVoice();
        FileDto voiceDto;
        try {
            voiceDto = awsS3Service.upload(voice, "word");
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        Word word = Word.builder()
                .engWord(requestWordInfoDto.getEngWord())
                .korWord(requestWordInfoDto.getKorWord())
                .image(imageDto.getFileName())
                .voice(voiceDto.getFileName())
                .build();
        wordRepository.save(word);

        LOGGER.info("[InfoServiceImpl] word 저장 완료");
    }

    @Override
    public void saveMaterial(RequestMaterialInfoDto requestMaterialInfoDto) {
        LOGGER.info("[InfoServiceImpl] material 저장");

        Material material = Material.builder()
                .name(requestMaterialInfoDto.getName())
                .build();
        materialRepository.save(material);

        LOGGER.info("[InfoServiceImpl] material 저장 완료");
    }

    @Override
    public void saveTaleHasMaterial(RequestTaleHasMaterialInfoDto requestTaleHasMaterialInfoDto) {
        LOGGER.info("[InfoServiceImpl] talehasmaterial 저장");
        Tale tale = taleRepository.findById(requestTaleHasMaterialInfoDto.getTaleId())
                .orElseThrow(() -> new ErrorException(TaleErrorCode.TALE_NOT_FOUND));
        Material material = materialRepository.findById(
                requestTaleHasMaterialInfoDto.getMaterialId())
                .orElseThrow(() -> new RuntimeException("material을 찾을 수 없습니다."));
        TaleHasMaterial taleHasMaterial = TaleHasMaterial.builder()
                .tale(tale)
                .material(material)
                .build();

        taleHasMaterialRepository.save(taleHasMaterial);
    }
}

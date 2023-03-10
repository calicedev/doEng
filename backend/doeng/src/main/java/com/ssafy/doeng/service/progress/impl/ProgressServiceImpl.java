package com.ssafy.doeng.service.progress.impl;

import com.ssafy.doeng.data.dto.progress.request.RequestPostProgressDto;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.progress.Progress;
import com.ssafy.doeng.data.entity.scene.Scene;
import com.ssafy.doeng.data.repository.progress.ProgressRepository;
import com.ssafy.doeng.data.repository.scene.SceneRepository;
import com.ssafy.doeng.errors.code.SceneErrorCode;
import com.ssafy.doeng.errors.exception.ErrorException;
import com.ssafy.doeng.service.Common;
import com.ssafy.doeng.service.progress.ProgressService;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProgressServiceImpl implements ProgressService {
    private final static Logger LOGGER = LoggerFactory.getLogger(ProgressServiceImpl.class);
    private final ProgressRepository progressRepository;
    private final Common common;
    private final SceneRepository sceneRepositroy;

    @Override
    public void save(RequestPostProgressDto requestDto) {
        long memberId, sceneId, taleId;
        memberId = requestDto.getMemberId();
        sceneId = requestDto.getSceneId();
        taleId = requestDto.getTaleId();
        LOGGER.info("[ProgressServiceImpl] save memberId: {}, sceneId: {}", memberId,sceneId);

        Member member = common.getMember(memberId);
        Scene scene = sceneRepositroy.findById(sceneId)
                .orElseThrow(() -> new ErrorException(SceneErrorCode.SCENE_NOT_FOUND));

        Optional<Progress> progress = progressRepository.findByMemberAndScene(member, scene);

        Progress progressForSave;
        if (progress.isEmpty()) {
            progressForSave = Progress.builder()
                    .member(member)
                    .scene(scene)
                    .playedAt(LocalDateTime.now())
                    .build();
        } else {
            progressForSave = progress.get();
            progressForSave.setPlayedAt(LocalDateTime.now());
        }
        progressRepository.save(progressForSave);
        LOGGER.info("[ProgressServiceImpl] save 종료");
    }
}

package com.ssafy.doeng.service.scene;

import com.ssafy.doeng.data.dto.scene.response.ResopnseSceneDto;
import com.ssafy.doeng.data.dto.scene.response.ResopnseSceneListDto;

public interface SceneService {

    ResopnseSceneListDto getSceneListByTale(long taleId, long memberId);

    ResopnseSceneDto getSceneByTale(long taleId, long memberId, int sceneOrder);
}

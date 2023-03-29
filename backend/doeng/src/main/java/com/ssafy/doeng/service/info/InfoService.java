package com.ssafy.doeng.service.info;

import com.ssafy.doeng.data.dto.info.request.RequestMaterialInfoDto;
import com.ssafy.doeng.data.dto.info.request.RequestSceneInfoDto;
import com.ssafy.doeng.data.dto.info.request.RequestSceneInfoOnlyDto;
import com.ssafy.doeng.data.dto.info.request.RequestScriptInfoDto;
import com.ssafy.doeng.data.dto.info.request.RequestTaleHasMaterialInfoDto;
import com.ssafy.doeng.data.dto.info.request.RequestTaleInfoDto;
import com.ssafy.doeng.data.dto.info.request.RequestWordInfoDto;

public interface InfoService {
    void saveTale(RequestTaleInfoDto requestTaleInfoDto);
    void saveScene(RequestSceneInfoDto requestSceneInfoDto);
    void saveScript(RequestScriptInfoDto requestScriptInfoDto);
    void saveWord(RequestWordInfoDto requestWordInfoDto);
    void saveMaterial(RequestMaterialInfoDto requestMaterialInfoDto);

    void saveTaleHasMaterial(RequestTaleHasMaterialInfoDto requestTaleHasMaterialInfoDto);
    void saveSceneOnly(RequestSceneInfoOnlyDto requestSceneInfoOnlyDto);
}

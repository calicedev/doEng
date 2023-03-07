package com.ssafy.doeng.data.dto.game.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RequestSceneImageDto {
    private long sceneId;
    private MultipartFile image;
}

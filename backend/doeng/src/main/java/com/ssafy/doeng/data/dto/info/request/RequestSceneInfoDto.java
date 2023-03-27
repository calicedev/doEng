package com.ssafy.doeng.data.dto.info.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestSceneInfoDto {
    private long taleId;
    private long wordId;
    private String title;
    private MultipartFile image;
    private int sceneOrder;
    private int interactiveType;
    private String backgroundMusic;
}

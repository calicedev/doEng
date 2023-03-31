package com.example.doenggameflux.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FaceAiRequestDto {

    private long taleId;
    private long sceneId;
    private long memberId;
    private String answer;
    private String image;

}

package com.ssafy.doeng.data.dto.info.request;

import javax.persistence.Entity;
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
public class RequestWordInfoDto {
    private String engWord;
    private String korWord;
    private MultipartFile image;
    private MultipartFile voice;
}

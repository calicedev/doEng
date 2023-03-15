package com.ssafy.doeng.data.dto.aws;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileDto {

    private String fileName;
    private String url;

    public FileDto(String fileName, String url) {
        this.fileName = fileName;
        this.url = url;
    }

}

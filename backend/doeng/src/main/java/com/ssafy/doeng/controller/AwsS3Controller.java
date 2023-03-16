package com.ssafy.doeng.controller;

import com.ssafy.doeng.data.dto.aws.FileDto;
import com.ssafy.doeng.service.aws.AwsS3Service;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/s3")

public class AwsS3Controller {

    private final AwsS3Service awsS3service;

    //this is upload image and make a link to public
    //this is insecure because this link can access from everyone.
    @PostMapping("/upload")
    public FileDto upload(@RequestParam(value = "file") MultipartFile multipartFile)
            throws IOException {
        return awsS3service.upload(multipartFile, "picture");
    }

    //this is upload image and making temporary link to access image
    @PostMapping("/getPresignedUrl")
    public FileDto getPresignedUrl(@RequestParam(value = "file") MultipartFile multipartFile)
            throws IOException {
        return awsS3service.uploadToPresignUrl(multipartFile, "sccs");
    }

    //get temporary presignedurl from filename
    @GetMapping("/temporaryUrl")
    public String getTemporaryUrl(@RequestParam(value = "file") String filename)
            throws IOException {
        System.out.println(filename);
        return awsS3service.getTemporaryUrl(filename);
    }

}


package com.example.doenggameflux.s3;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import software.amazon.awssdk.services.s3.model.CompletedPart;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@ToString
class UploadState {
    String bucket;
    String filekey;
    String uploadId;
    int partCounter;
    Map<Integer, CompletedPart> completedParts = new HashMap<>();
    int buffered = 0;
    // ... getters/setters omitted
    UploadState(String bucket, String filekey) {
        this.bucket = bucket;
        this.filekey = filekey;
    }
}

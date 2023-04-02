package com.example.doenggameflux.component;

import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.Arrays;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class CustomFilePart implements FilePart {

    private String filename;
    private MediaType mediaType;
    private byte[] content;
    public CustomFilePart(String filename, MediaType mediaType, byte[] content) {
        this.filename = filename;
        this.mediaType = mediaType;
        this.content = content;
    }
    @Override
    public String filename() {
        return this.filename;
    }

    @Override
    public Mono<Void> transferTo(Path dest) {
        return Mono.fromRunnable(() -> {
            // 이 부분에서 파일을 생성하고 byte[] 를 써넣는 로직을 구현합니다.
            // dest 에 생성된 파일의 경로를 입력받아 사용합니다.
            // 이 예시에서는 byte[] 의 값을 그대로 파일에 써넣습니다.
            try {
                java.nio.file.Files.write(dest, Arrays.asList(new String(content, StandardCharsets.UTF_8)), StandardCharsets.UTF_8);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    @Override
    public String name() {
        return "file";
    }

    @Override
    public HttpHeaders headers() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        headers.setContentDispositionFormData(name(), filename);
        return headers;
    }

    @Override
    public Flux<DataBuffer> content() {
        return Flux.just(DefaultDataBufferFactory.sharedInstance.wrap(content));
    }

    public static CustomFilePart create(String filename, byte[] content) {
        return new CustomFilePart(filename, MediaType.IMAGE_JPEG, content);
    }
}

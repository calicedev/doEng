package com.example.doenggameflux.contoller;

import com.example.doenggameflux.component.DBComponentHttp;
import com.example.doenggameflux.component.TokenComponent;
import com.example.doenggameflux.config.WebSocketConfig;
import com.example.doenggameflux.config.urlEnum.WebSocketMapping;
import com.example.doenggameflux.dto.response.FaceResultResponseDto;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping()
public class AiGameController {

    static private final String URL = WebSocketMapping.FACE.getUrl();
    static private final String BASIC_URL = "http://70.12.245.22:8000/analyze";
    static final Logger LOGGER = LoggerFactory.getLogger(WebSocketConfig.class);
    private final DBComponentHttp dbComponent;
    private final TokenComponent tokenComponent;
    @GetMapping("/test")
    public Mono<String> test() {
        return Mono.just("안녕하세요");
    }

    @PostMapping("/face")
    public Mono<String> requestFaceAi(@RequestBody Mono<String> image,
            @RequestParam("answer") String answer,
            @RequestParam("sceneId") long sceneId,
            @RequestParam("memberId") long memberId,
            ServerWebExchange exchange) {
        return image.map(s -> {
                    Map<String, String> map = new HashMap<>();
                    map.put("answer", answer);
                    map.put("image", s);
                    return map;
                })
                .flatMap(map -> makeWebClient(map, "/face"))
                .flatMap(message -> {
                    boolean rtn = message.isResult();
                    if (rtn) {
                        byte[] decodedImage = Base64.getDecoder().decode(message.getImage());
                        return dbComponent.saveData(decodedImage, sceneId, memberId)
                                .then(Mono.just("true"));
                    }
                    return Mono.just("false");
                }).log();
    }

    @PostMapping("/object")
    public Mono<String> requestObjectAi(@RequestBody Mono<String> image,
            @RequestParam("answer") String answer,
            @RequestParam("sceneId") long sceneId,
            @RequestParam("memberId") long memberId) {
        LOGGER.info("[requestObjectAi] answer : {}", answer);
        return image.map(s -> {
                    Map<String, String> map = new HashMap<>();
                    map.put("answer", answer);
                    map.put("image", s);
                    return map;
                })
                .flatMap(map -> makeWebClient(map, "/object"))
                .flatMap(message -> {
                    boolean rtn = message.isResult();
                    if (rtn) {
                        byte[] decodedImage = Base64.getDecoder().decode(message.getImage());
                        return dbComponent.saveData(decodedImage, sceneId, memberId)
                                .then(Mono.just("true"));
                    }
                    return Mono.just("false");
                }).log();
    }

    @PostMapping("/doodle")
    public Mono<String> requestDoodleAi(@RequestBody Mono<String> image,
            @RequestParam("answer") String answer,
            @RequestParam("sceneId") long sceneId,
            ServerWebExchange exchange) {
        return image.map(s -> {
                    Map<String, String> map = new HashMap<>();
                    map.put("answer", answer);
                    map.put("image", s);
                    Mono<Long> memberId = tokenComponent.jwtConfirm(exchange.getRequest().getHeaders().getFirst("Authorization"));
                    System.out.println("+++++++++++++++");
                    memberId.subscribe(memberIdValue -> {
                        // memberId 값을 사용하는 코드 작성
                        System.out.println("Member ID: " + memberIdValue);
                    });

                    return map;
                })
                .flatMap(map -> makeWebClient(map, "/doodle"))
                .flatMap(message -> {
                    boolean rtn = message.isResult();
                    if (rtn) {
                        byte[] decodedImage = Base64.getDecoder().decode(message.getImage());
                        Mono<Long> memberId = tokenComponent.jwtConfirm(exchange.getRequest().getHeaders().getFirst("Authorization"));

                        return memberId.flatMap(aLong -> )dbComponent.saveData(decodedImage, sceneId, memberId.block())
                                .then(Mono.just("true"));
                    }
                    return Mono.just("false");
                }).log();
    }
    private Mono<FaceResultResponseDto> makeWebClient(Map<String, String> map, String url) {
        return WebClient.builder()
                .baseUrl(BASIC_URL)
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1024))
                .build()
                .post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .bodyValue(map)
                .retrieve()
                .bodyToMono(FaceResultResponseDto.class)
                .onErrorResume(e -> {
                    String errorMessage = "Error: " + e.getMessage();
                    return Mono.error(new Exception(errorMessage)); // Exception을 던지는 Mono 반환
                    // 에러 처리 추가
                });
    }
}

package com.example.doenggameflux.contoller;

import com.example.doenggameflux.component.DBComponentHttp;
import com.example.doenggameflux.component.TokenComponent;
import com.example.doenggameflux.config.WebSocketConfig;
import com.example.doenggameflux.config.urlEnum.WebSocketMapping;
import com.example.doenggameflux.dto.request.ImageRequestDto;
import com.example.doenggameflux.dto.response.FaceResultResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping()
public class
AiGameController {

    static private final String URL = WebSocketMapping.FACE.getUrl();
    static private final String BASIC_URL = "http://localhost:8000/analyze";
    static final Logger LOGGER = LoggerFactory.getLogger(WebSocketConfig.class);
    private final DBComponentHttp dbComponent;
    private final TokenComponent tokenComponent;
    private static final ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/test")

    public Mono<String> test() {
        return Mono.just("안녕하세요");
    }

    @PostMapping("/game/face")
    public Mono<ResponseEntity<String>> requestFaceAi(@RequestBody Mono<ImageRequestDto> image,
            @RequestParam("answer") String answer,
            @RequestParam("sceneId") long sceneId,
            ServerWebExchange exchange) {
        if (exchange.getRequest().getHeaders().getFirst("Authorization") == null) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token Not Found")).log();
        }
        Mono<Long> memberId = tokenComponent.jwtConfirm(
                exchange.getRequest().getHeaders().getFirst("Authorization")).cache();
        return image.map(s -> {
                    return memberId.map(memberIdValue -> {
                        Map<String, String> map = new HashMap<>();
                        map.put("answer", answer);
                        map.put("image", s.getImage());
                        return map;
                    });
                })
                .flatMap(map -> map.flatMap(param -> makeWebClient(param, "/face")))
                .flatMap(message -> {
                    boolean rtn = message.isResult();
                    if (rtn) {
                        byte[] decodedImage = Base64.getDecoder().decode(message.getImage());
                        return memberId.cache().flatMap(memberIdValue -> {
                            System.out.println(memberIdValue);
                            return dbComponent.saveData(decodedImage, sceneId, memberIdValue)
                                    .doOnSuccess(
                                            result -> System.out.println("Saved data: " + result))
                                    .then(Mono.just(ResponseEntity.ok().body("true")));
                        });
                    }
                    return Mono.just(ResponseEntity.ok().body("false"));
                })
                .onErrorResume(WebClientResponseException.class, e -> {
                    return Mono.just(ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString()));
                })
                .log();
    }

    @PostMapping("/game/object")
    public Mono<ResponseEntity<String>> requestObjectAi(@RequestBody Mono<ImageRequestDto> image,
            @RequestParam("answer") String answer,
            @RequestParam("sceneId") long sceneId,
            ServerWebExchange exchange) {
        if (exchange.getRequest().getHeaders().getFirst("Authorization") == null) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token Not Found")).log();
        }
        Mono<Long> memberId = tokenComponent.jwtConfirm(
                exchange.getRequest().getHeaders().getFirst("Authorization")).cache();
        return image.map(s -> {
                    return memberId.map(memberIdValue -> {
                        Map<String, String> map = new HashMap<>();
                        map.put("answer", answer);
                        map.put("image", s.getImage());
                        return map;
                    });
                })
                .flatMap(map -> map.flatMap(param -> makeWebClient(param, "/object")))
                .flatMap(message -> {
                    boolean rtn = message.isResult();
                    if (rtn) {
                        byte[] decodedImage = Base64.getDecoder().decode(message.getImage());
                        return memberId.cache().flatMap(memberIdValue -> {
                            System.out.println(memberIdValue);
                            return dbComponent.saveData(decodedImage, sceneId, memberIdValue)
                                    .doOnSuccess(
                                            result -> System.out.println("Saved data: " + result))
                                    .then(Mono.just(ResponseEntity.ok().body("true")));
                        });
                    }
                    return Mono.just(ResponseEntity.ok().body("false"));
                })
                .onErrorResume(WebClientResponseException.class, e -> {
                    return Mono.just(ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString()));
                })
                .log();
    }

    @PostMapping("/game/doodle")
    public Mono<ResponseEntity<String>> requestDoodleAi(@RequestBody Mono<ImageRequestDto> image,
            @RequestParam("answer") String answer,
            @RequestParam("sceneId") long sceneId,
            ServerWebExchange exchange) {
        if (exchange.getRequest().getHeaders().getFirst("Authorization") == null) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token Not Found")).log();
        }
        Mono<Long> memberId = tokenComponent.jwtConfirm(
                exchange.getRequest().getHeaders().getFirst("Authorization")).cache();
        return image.map(s -> {
                    return memberId.map(memberIdValue -> {
                        Map<String, String> map = new HashMap<>();
                        map.put("answer", answer);
                        map.put("image", s.getImage());
                        return map;
                    });
                })
                .flatMap(map -> map.flatMap(param -> makeWebClient(param, "/doodle")))
                .flatMap(message -> {
                    boolean rtn = message.isResult();
                    if (rtn) {
                        byte[] decodedImage = Base64.getDecoder().decode(message.getImage());
                        return memberId.cache().flatMap(memberIdValue -> {
                            return dbComponent.saveData(decodedImage, sceneId, memberIdValue)
                                    .doOnSuccess(
                                            result -> System.out.println("Saved data: " + result))
                                    .then(Mono.just(ResponseEntity.ok().body("true")));
                        });
                    }
                    return Mono.just(ResponseEntity.ok().body("false"));
                })
                .onErrorResume(WebClientResponseException.class, e -> {
                    return Mono.just(ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString()));
                })
                .log();
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
                .bodyToMono(FaceResultResponseDto.class);
    }

    @ToString
    @Getter
    @Setter
    @AllArgsConstructor
    private static class ErrorResponse {

        private final String code;
        private final String message;

        public String getCode() {
            return code;
        }

        public String getMessage() {
            return message;
        }
    }

}


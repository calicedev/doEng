package com.example.doenggameflux.handler;

import com.example.doenggameflux.component.DBComponent;
import com.example.doenggameflux.component.TokenComponent;
import com.example.doenggameflux.config.urlEnum.WebSocketMapping;
import com.example.doenggameflux.dto.response.FaceResultResponseDto;
import java.net.URI;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class FaceWebsocketHandler implements WebSocketHandler {

    static private final String URL = WebSocketMapping.FACE.getUrl();
    static private final String BASIC_URL = "http://localhost:8000/analyze";

    private final DBComponent dbComponent;
    private final TokenComponent tokenComponent;

    @Override

    public Mono<Void> handle(WebSocketSession session) {
        Flux<WebSocketMessage> input = session.receive().log();

        URI uri = session.getHandshakeInfo().getUri();
        MultiValueMap<String, String> queryParams = UriComponentsBuilder.fromUri(uri).build()
                .getQueryParams();


        if (session.getAttributes().containsKey("memberId")) {

            Flux<Map<String, String>> webParam = input
                    .map(webSocketMessage -> {
                        // 파라미터 생성
                        Map<String, String> map = new HashMap<>();
                        // 이미지 입력 받기
                        byte[] bytes = new byte[webSocketMessage.getPayload().readableByteCount()];
                        webSocketMessage.getPayload().asByteBuffer().get(bytes);

                        // map 생성
                        String encode = Base64.getEncoder().encodeToString(bytes);
                        map.put("image", encode);
                        map.put("answer", queryParams.getFirst("answer"));

                        return map;
                    }).log();

            Flux<FaceResultResponseDto> webResult = webParam
                    .flatMap(map -> makeWebClient(map, session));

            Mono<Void> webFinal = webResult.flatMap(message -> {
                        boolean rtn = message.isResult();

                        if (rtn) {
                            byte[] decodedImage = Base64.getDecoder().decode(message.getImage());
                            dbComponent.saveData(session, decodedImage,
                                            Long.parseLong(queryParams.getFirst("sceneId")),
                                            Long.parseLong(String.valueOf(session.getAttributes().get("memberId"))))
                                    .subscribe();

                            return session.send(Flux.just(session.textMessage("true")))
                                    .then(session.close());
                        }
                        return Mono.empty();
                    })
                    .then().log();
            return webFinal;
        }

        return Mono.empty();
    }

    private Mono<FaceResultResponseDto> makeWebClient(Map<String, String> map,
            WebSocketSession session) {
        return WebClient.builder()
                .baseUrl(BASIC_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.MULTIPART_FORM_DATA_VALUE)
                .build()
                .post()
                .uri(URL)
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

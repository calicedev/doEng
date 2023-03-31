package com.example.doenggameflux.handler;

import com.example.doenggameflux.config.urlEnum.WebSocketMapping;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class ObjectWebsocketHandler implements WebSocketHandler {
    static private final String URL = WebSocketMapping.OBJECT.getUrl();
    static private final String BASIC_URL = "http://localhost:8000/analyze";


    @Override
    public Mono<Void> handle(WebSocketSession session) {
        Flux<WebSocketMessage> input = session.receive().log();

        return input
                .map(webSocketMessage -> {
                    Map<String, String> map = new HashMap<>();
                    byte[] bytes = new byte[webSocketMessage.getPayload().readableByteCount()];
                    webSocketMessage.getPayload().asByteBuffer().get(bytes);

                    String encode = Base64.getEncoder().encodeToString(bytes);
                    map.put("image", encode);
                    return map;
                }).log()
                .flatMap(map ->  makeWebClient(map, session)
                ).flatMap(message ->  session.send(Flux.just(message)))
                .then();
    }
    private Mono<WebSocketMessage> makeWebClient(Map<String, String> map, WebSocketSession session) {
        return WebClient.builder()
                .baseUrl(BASIC_URL)
                .build()
                .post()
                .uri(URL)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .bodyValue(map)
                .retrieve()
                .bodyToMono(String.class)
                .onErrorResume(e -> Mono.just("Error: " + e.getMessage())) // 에러 처리 추가
                .map(session::textMessage).log();
    }
}
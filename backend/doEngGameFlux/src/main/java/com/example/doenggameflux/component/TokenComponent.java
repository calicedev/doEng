package com.example.doenggameflux.component;

import java.net.URI;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.socket.WebSocketSession;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

@Component
public class TokenComponent {
    public static Mono<HttpHeaders> jwtConfirm(WebSocketSession session) {
        HttpHeaders headers = session.getHandshakeInfo().getHeaders();
        Mono<HttpHeaders> confirm = Mono.just(headers);
        return confirm.map(httpHeaders -> {
            System.out.println("여기는 jwt Confirm" + session.getId());
            URI uri = session.getHandshakeInfo().getUri();
            MultiValueMap<String, String> queryParams = UriComponentsBuilder.fromUri(uri).build().getQueryParams();
            session.getAttributes().put("memberId", queryParams.getFirst("memberId"));
            return httpHeaders;
        });
    }
}

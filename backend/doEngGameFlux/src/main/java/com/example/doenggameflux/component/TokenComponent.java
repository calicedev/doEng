package com.example.doenggameflux.component;

import com.example.doenggameflux.contoller.AiGameController;
import java.util.HashMap;
import java.util.Map;

import com.example.doenggameflux.dto.response.TokenResponseDto;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;


@Component
public class TokenComponent {
    static private final String BASIC_URL = "https://j8a601.p.ssafy.io/api/member/ai";
    public static Mono<Long> jwtConfirm(String auth) {
        Mono<String> token = Mono.just(auth);
        return token.map(s -> {
                    Map<String, String> map = new HashMap<>();
                    map.put("accesstoken", s);
                    return map;
                })
                .flatMap(map -> makeWebClient(map))
                .flatMap(message -> {
                    return Mono.just(message.getId());
                })
                .doOnSuccess(response -> System.out.println("Final response: " + response));
    }

    private static Mono<TokenResponseDto> makeWebClient(Map<String, String> map)  {
        return WebClient.builder()
                .baseUrl(BASIC_URL)
                .defaultHeader(HttpHeaders.AUTHORIZATION, map.get("accesstoken"))
                .build()
                .get()
                .retrieve()
                .bodyToMono(TokenResponseDto.class);
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

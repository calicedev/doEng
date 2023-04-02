package com.example.doenggameflux.filter;

import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

public class CustomWebFilter implements WebFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        // 요청이 오기 전에 실행됩니다.
        System.out.println("오긴오나");
        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            // 요청 처리가 완료된 후에 실행됩니다.
        }));
    }
}
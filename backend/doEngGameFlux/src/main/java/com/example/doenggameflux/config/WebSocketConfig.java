package com.example.doenggameflux.config;

import com.example.doenggameflux.component.DBComponent;
import com.example.doenggameflux.component.TokenComponent;
import com.example.doenggameflux.config.urlEnum.WebSocketMapping;
import com.example.doenggameflux.filter.CustomWebFilter;
import com.example.doenggameflux.handler.DoodleWebsocketHandler;
import com.example.doenggameflux.handler.FaceWebsocketHandler;
import com.example.doenggameflux.handler.ObjectWebsocketHandler;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;

@Configuration
@RequiredArgsConstructor
public class WebSocketConfig implements WebFluxConfigurer {

    static final Logger LOGGER = LoggerFactory.getLogger(WebSocketConfig.class);
    private final DBComponent dbComponent;
    private final TokenComponent tokenComponent;

    @Bean
    public HandlerMapping handlerMapping() {
        Map<String, WebSocketHandler> map = new HashMap<>();
        map.put("/ws" + WebSocketMapping.FACE.getUrl(), new FaceWebsocketHandler(dbComponent, tokenComponent));
        map.put("/ws" + WebSocketMapping.OBJECT.getUrl(), new ObjectWebsocketHandler());
        map.put("/ws" + WebSocketMapping.DODDLE.getUrl(), new DoodleWebsocketHandler());

        int order = -1; // before annotated controllers
        return new SimpleUrlHandlerMapping(map, order);
    }

    @Bean
    public WebSocketHandlerAdapter handlerAdapter() {
        return new WebSocketHandlerAdapter();
    }
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//
//        configuration.addAllowedOrigin( "70.12.246.181");
//        configuration.addAllowedOrigin( "localhost:3000");
//        configuration.addAllowedHeader("*");
//        configuration.addAllowedMethod();
//        configuration.setAllowCredentials(true);
//        configuration.addExposedHeader("refreshtoken");
//        configuration.addExposedHeader("accesstoken");
//        configuration.addAllowedHeader("Authorization");
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
//                .allowedOrigins("*")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .exposedHeaders()
                .exposedHeaders("Access-Control-Allow-Origin");
    }
}

package com.ssafy.doeng.config.security;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@RequiredArgsConstructor
public class WebConfiguration implements WebMvcConfigurer {

    public static final Logger logger = LoggerFactory.getLogger(WebConfiguration.class);


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 주석임
                .allowedOriginPatterns("*")
                .exposedHeaders("refreshtoken","accesstoken")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD")
                .allowCredentials(true)
                .maxAge(1800);
    }



}


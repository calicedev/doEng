//package com.example.doenggameflux.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.reactive.CorsConfigurationSource;
//import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
//import org.springframework.web.reactive.config.CorsRegistry;
//import org.springframework.web.reactive.config.WebFluxConfigurer;
//
//@Configuration
//public class WebConfig implements WebFluxConfigurer {
//
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//
//        configuration.addAllowedOriginPattern("*");
//        configuration.addAllowedHeader("*");
//        configuration.addAllowedMethod("*");
//        configuration.setAllowCredentials(true);
//        configuration.addExposedHeader("refreshtoken");
//        configuration.addExposedHeader("accesstoken");
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
////    @Override
////    public void addCorsMappings(CorsRegistry registry) {
//////
//////        configuration.addAllowedOriginPattern("*");
//////        configuration.addAllowedHeader("*");
//////        configuration.addAllowedMethod("*");
//////        configuration.setAllowCredentials(true);
//////        configuration.addExposedHeader("refreshtoken");
//////        configuration.addExposedHeader("accesstoken");
//////        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//////        source.registerCorsConfiguration("/**", configuration);
//////        return source;
////        registry.addMapping("/**")
////            .allowedOrigins("*")
////            .allowedMethods("*")
////            .allowedHeaders("*")
////            .allowCredentials(true)
////                .all
////            .exposedHeaders("Access-Control-Allow-Origin", "accesstoken", "refreshtoken");
////    }
//
//}
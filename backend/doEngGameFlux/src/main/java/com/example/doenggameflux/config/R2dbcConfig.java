//package com.example.doenggameflux.config;
//
//import io.r2dbc.spi.ConnectionFactories;
//import io.r2dbc.spi.ConnectionFactory;
//import io.r2dbc.spi.ConnectionFactoryOptions;
//import lombok.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.r2dbc.config.EnableR2dbcAuditing;
//
//@Configuration
//@EnableR2dbcAuditing
//public class R2dbcConfig {
//    @Bean
//    public ConnectionFactory connectionFactory() {
//        ConnectionFactoryOptions options = ConnectionFactoryOptions.builder()
//                .option(ConnectionFactoryOptions.DRIVER, "mariadb")
//                .option(ConnectionFactoryOptions.HOST, "localhost")
//                .option(ConnectionFactoryOptions.PORT, 3306)
//                .option(ConnectionFactoryOptions.USER, "root")
//                .option(ConnectionFactoryOptions.PASSWORD, "1234")
//                .option(ConnectionFactoryOptions.DATABASE, "doeng")
//                .build();
//
//        return ConnectionFactories.get(options);
//    }
//}

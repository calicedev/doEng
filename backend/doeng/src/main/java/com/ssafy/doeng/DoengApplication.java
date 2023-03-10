package com.ssafy.doeng;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class DoengApplication {

    public static void main(String[] args) {
        SpringApplication.run(DoengApplication.class, args);
    }

}

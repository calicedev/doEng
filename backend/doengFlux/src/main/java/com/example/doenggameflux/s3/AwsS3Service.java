package com.example.doenggameflux.s3;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
@Slf4j
public class AwsS3Service {


    public Mono<String> getUser()
    {
        Mono<String> a= Mono.just("calicedev");
        return a;
    }




}

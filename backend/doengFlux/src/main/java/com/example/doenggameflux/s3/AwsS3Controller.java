package com.example.doenggameflux.s3;
;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RestController
@Slf4j
@RequestMapping("/aws")
@AllArgsConstructor
public class AwsS3Controller {
    private static final String AUTH_CREDENTIALS = "auth_credentials";
    private final PictureUtil pictureUtil;

    private final AwsS3Service awsS3Service;


    @PutMapping(value = "/profile_picture",consumes = { MediaType.MULTIPART_FORM_DATA_VALUE } )
    public Mono<Void> userProfilePictureUpdate(
            @RequestHeader(AUTH_CREDENTIALS) String authStr,
         @RequestPart("picture") FilePart picture){

        awsS3Service
                .getUser()
                .flatMap(deleteResponse -> {
                    return pictureUtil
                            .uploadUserProfilePict(picture, "3");
                })
                .subscribeOn(Schedulers.boundedElastic())
                .subscribe();


        return Mono.empty();

    }

}

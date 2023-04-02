package com.example.doenggameflux.component;

import com.example.doenggameflux.entity.Picture;
import com.example.doenggameflux.entity.Progress;
import com.example.doenggameflux.repository.PictureRepository;
import com.example.doenggameflux.repository.ProgressRepository;
import com.example.doenggameflux.s3.AwsS3Service;
import com.example.doenggameflux.s3.PictureUtil;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Component
@RequiredArgsConstructor
public class DBComponent {
    private static final String AUTH_CREDENTIALS = "auth_credentials";
    private final PictureUtil pictureUtil;
    private final AwsS3Service awsS3Service;
    private final ProgressRepository progressRepository;
    private final PictureRepository pictureRepository;

    public Mono<String> saveData(WebSocketSession session, byte[] saveImage, long sceneId, long memberId){
        String filename = UUID.randomUUID().toString();
        CustomFilePart customFilePart = CustomFilePart.create(filename, saveImage);

        Mono<Progress> progress = progressRepository.getByMemberIdAndSceneId(memberId, sceneId);
        awsS3Service
                .getUser()
                .flatMap(deleteResponse -> {
                    return pictureUtil
                            .uploadUserProfilePict(customFilePart, filename);
                })
                .log()
                .subscribeOn(Schedulers.boundedElastic())
                .subscribe();

        progress.map(progress1 -> {
            System.out.println(progress1.getId());
            Picture picture = Picture.builder()
                    .progressId(progress1.getId())
                    .image("picture/" + filename)
                    .build();
            pictureRepository.save(picture).log().subscribe();
            return progress1;
        }).log().subscribe();


        return Mono.empty();
    }

}

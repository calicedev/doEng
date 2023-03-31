package com.example.doenggameflux.component;

import com.example.doenggameflux.entity.Picture;
import com.example.doenggameflux.entity.Progress;
import com.example.doenggameflux.repository.PictureRepository;
import com.example.doenggameflux.repository.ProgressRepository;
import com.example.doenggameflux.s3.AwsS3Service;
import com.example.doenggameflux.s3.PictureUtil;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Component
@RequiredArgsConstructor
public class DBComponentHttp {
    private static final String AUTH_CREDENTIALS = "auth_credentials";
    private final PictureUtil pictureUtil;
    private final AwsS3Service awsS3Service;
    private final ProgressRepository progressRepository;
    private final PictureRepository pictureRepository;

    public Mono<String> saveData(byte[] saveImage, long sceneId, long memberId){

        String filename = UUID.randomUUID().toString();
        CustomFilePart customFilePart = CustomFilePart.create(filename, saveImage);

        Mono<Progress> progress = progressRepository.getByMemberIdAndSceneId(memberId, sceneId);
//        awsS3Service
//                .getUser()
//                .flatMap(deleteResponse -> {
//                    return pictureUtil
//                            .uploadUserProfilePict(customFilePart, filename);
//                })
//                .log()
//                .subscribeOn(Schedulers.boundedElastic())
//                .subscribe();
        saveDataBase(progress, sceneId, memberId, filename).subscribe();
        return Mono.empty();
    }

    @Transactional
    public Mono<Progress> saveDataBase(Mono<Progress> progress, long sceneId, long memberId, String filename) {

        return progress.switchIfEmpty(progressRepository.save(
                        Progress.builder()
                                .memberId(memberId)
                                .sceneId(sceneId)
                                .playedAt(LocalDateTime.now())
                                .build()))
                .map(progress1 -> {
                    Picture picture = Picture.builder()
                            .progressId(progress1.getId())
                            .image("picture/" + filename)
                            .createdAt(LocalDateTime.now())
                            .build();
                    pictureRepository.save(picture).log().subscribe();
                    System.out.println(progress1);
                    progressRepository.updateProgress(LocalDateTime.now(), progress1.getId()).subscribe();
                    System.out.println(progress1);
                    return progress1;
                });
    }


}

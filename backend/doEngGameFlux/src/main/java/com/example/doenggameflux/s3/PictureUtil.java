package com.example.doenggameflux.s3;



import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import software.amazon.awssdk.core.async.AsyncRequestBody;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.model.*;

import java.nio.ByteBuffer;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Slf4j
public class PictureUtil {
    private final S3AsyncClient s3AsyncClient;
    private final int MIN_MULTIPART_UPLOAD = 5000000;

    @Value("${cloud.aws.s3.bucket}")
    private String BUCKET_NAME;

    @Value("picture")
    private String FOLDER_NAME;

    @Value("${cloud.aws.region.static}")
    private String REGION;

    //upload file through multipart upload
    //returns path
    public Mono<String> uploadUserProfilePict(FilePart part, String userId) {
        String[] tempArr = part.headers().getContentType().toString().split("/");
        String extension = tempArr[tempArr.length - 1];

        String contentType = part.headers().getContentType().toString();

        String key = FOLDER_NAME + "/" + String.valueOf(userId) + "." + extension;

        UploadState uploadState = new UploadState(BUCKET_NAME,key);
        CompletableFuture<CreateMultipartUploadResponse> uploadRequest = s3AsyncClient
                .createMultipartUpload(CreateMultipartUploadRequest.builder()
                        .acl(ObjectCannedACL.PUBLIC_READ)
                        .contentType(contentType)
                        .key(key)
                        .bucket(BUCKET_NAME)
                        .build());

        return Mono
                .fromFuture(uploadRequest)
                .flatMapMany((response) -> {

                    //save uploadId in the object
                    uploadState.uploadId = response.uploadId();
                    return part.content();
                })
                .bufferUntil((buffer) -> {
                    //wait until the buffered data are greater or equl to 5Mb
                    uploadState.buffered += buffer.readableByteCount();
                    if ( uploadState.buffered >= MIN_MULTIPART_UPLOAD) {
                        uploadState.buffered = 0;
                        return true;
                    } else {
                        return false;
                    }
                })
                .map((buffers) -> {
                    //join buffers and convert them as ByteBuffer
                    DataBuffer lastBuffer = buffers.remove(buffers.size() - 1);
                    if(buffers.isEmpty())
                    {
                        return lastBuffer.asByteBuffer();
                    }
                    return lastBuffer.factory().join(buffers).asByteBuffer();

                })
                .flatMap((buffer) -> uploadPart(uploadState,buffer))
                .reduce(uploadState,(state,completedPart) -> {
                    //combine all completedPart to one Object(UploadState)
                    //the completePart will be used to tell s3 that it is done!
                    log.debug(completedPart.toString());
                    state.completedParts.put(completedPart.partNumber(), completedPart);
                    return state;
                })
                .flatMap((state) -> completeUpload(state))
                .map((response) -> {

                    return getPath(userId, extension);
                });
    }

    private Mono<CompletedPart> uploadPart(UploadState uploadState, ByteBuffer buffer) {
        //upload data in ByteBuffer

        //increment the parts that are uploaded
        final int partNumber = ++uploadState.partCounter;

        //create UploadPartRequest
        CompletableFuture<UploadPartResponse> request = s3AsyncClient.uploadPart(UploadPartRequest.builder()
                        .bucket(uploadState.bucket)
                        .key(uploadState.filekey)
                        .partNumber(partNumber)
                        .uploadId(uploadState.uploadId)
                        .contentLength((long) buffer.capacity())
                        .build(),
                AsyncRequestBody.fromPublisher(Mono.just(buffer)));


        return Mono
                .fromFuture(request)
                .map((uploadPartResult) -> {

                    return CompletedPart.builder()
                            .eTag(uploadPartResult.eTag())
                            .partNumber(partNumber)
                            .build();
                });
    }
    private Mono<CompleteMultipartUploadResponse> completeUpload(UploadState state) {
        //tell s3 that we are done with uploading
        CompletedMultipartUpload multipartUpload = CompletedMultipartUpload.builder()
                .parts(state.completedParts.values())
                .build();
        return Mono.fromFuture(s3AsyncClient.completeMultipartUpload(CompleteMultipartUploadRequest.builder()
                .bucket(state.bucket)
                .uploadId(state.uploadId)
                .multipartUpload(multipartUpload)
                .key(state.filekey)
                .build()));
    }

    public Mono<DeleteObjectResponse> deletePicture(String path)
    {
        String key = getKeyFromPath(path);
        log.info("key to delete: " + key);

        CompletableFuture deleteFuture = s3AsyncClient.deleteObject(
                DeleteObjectRequest.builder()
                        .bucket(BUCKET_NAME)
                        .key(key)
                        .build()
        );

        return Mono.fromFuture(deleteFuture);
    }

    private String getPath(String userId, String extension)
    {
        String prefix = "https://" + BUCKET_NAME + ".s3." + REGION + ".amazonaws.com"+"/" + FOLDER_NAME + "/";
        return prefix + String.valueOf(userId) + "." + extension;
    }

    private String getKeyFromPath(String path)
    {
        String prefix = "https://" + BUCKET_NAME + ".s3." + REGION + ".amazonaws.com"+"/";
        return path.substring(prefix.length(), path.length());
    }

    //the methods below are not used since it has to load data in memory at once
    private Mono<PutObjectResponse> uploadProfilePictureAtOnce(FilePart picture, String userId, Long contentLength)
    {
        String[] tempArr = picture.headers().getContentType().toString().split("/");
        String extension = tempArr[tempArr.length - 1];

        String contentType = picture.headers().getContentType().toString();

        log.debug("content length is " + String.valueOf(contentLength));

        return DataBufferUtils.join(picture.content()).flatMap( df ->{
                    String key = FOLDER_NAME + "/" + String.valueOf(userId) + "." + extension;
                    log.debug("converting to future");
                    return Mono.fromFuture(getUploadProfilePictureFuture( BUCKET_NAME, key, contentType, extension, df.asByteBuffer()));
                }
        );

    }
    private CompletableFuture<PutObjectResponse> getUploadProfilePictureFuture(String bucketName, String key, String contentType, String extension, ByteBuffer byteBuffer)
    {
        return s3AsyncClient
                .putObject(PutObjectRequest.builder()
                                .bucket(bucketName)
                                .key(key)
                                .contentType(contentType)
                                .build(),
                        AsyncRequestBody.fromByteBuffer(byteBuffer
                        ));
    }
}

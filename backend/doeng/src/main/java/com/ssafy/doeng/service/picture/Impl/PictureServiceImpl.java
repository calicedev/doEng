package com.ssafy.doeng.service.picture.Impl;

import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.picture.Picture;
import com.ssafy.doeng.data.repository.picture.PictureRepository;
import com.ssafy.doeng.errors.code.PictureErrorCode;
import com.ssafy.doeng.errors.exception.ErrorException;
import com.ssafy.doeng.service.Common;
import com.ssafy.doeng.service.aws.AwsS3Service;
import com.ssafy.doeng.service.picture.PictureService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PictureServiceImpl implements PictureService {
    private static final Logger LOGGER = LoggerFactory.getLogger(PictureServiceImpl.class);
    private final PictureRepository pictureRepository;
    private final AwsS3Service awsS3Service;
    private final Common common;
    public void deletePicture(long pictureId, long memberId) {
        LOGGER.info("[PictureServiceImpl] 이미지 삭제 서비스 들어옴");
        Member member = common.getMember(memberId);
        Picture picture = pictureRepository.findById(pictureId)
                .orElseThrow(() -> new ErrorException(PictureErrorCode.PICTURE_NOT_FOUND));

        if(picture.getProgress().getMember().equals(member)) {
            awsS3Service.delete(picture.getImage());
            pictureRepository.deleteById(picture.getId());
        }

        LOGGER.info("[PictureServiceImpl] 이미지 삭제 서비스 성공");
    }
}

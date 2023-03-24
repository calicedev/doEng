package com.ssafy.doeng.service.tale.impl;

import com.ssafy.doeng.data.dto.material.response.ResponseMaterialDto;
import com.ssafy.doeng.data.dto.picture.response.ResponseProgressImageDto;
import com.ssafy.doeng.data.dto.review.response.ResponseReviewDto;
import com.ssafy.doeng.data.dto.review.vo.ReviewSum;
import com.ssafy.doeng.data.dto.scene.response.ResponseProgressSceneDto;
import com.ssafy.doeng.data.dto.tale.request.RequestTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.request.RequestTalePaymentDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleListDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleListDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseWordDto;
import com.ssafy.doeng.data.dto.word.response.ResponseProgressTestResultDto;
import com.ssafy.doeng.data.dto.word.response.ResponseProgressWordListDto;
import com.ssafy.doeng.data.entity.material.Material;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.payment.Payment;
import com.ssafy.doeng.data.entity.picture.Picture;
import com.ssafy.doeng.data.entity.progress.Progress;
import com.ssafy.doeng.data.entity.review.Review;
import com.ssafy.doeng.data.entity.scene.Scene;
import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.entity.test.Test;
import com.ssafy.doeng.data.entity.word.Word;
import com.ssafy.doeng.data.repository.material.MaterialRepository;
import com.ssafy.doeng.data.repository.member.MemberRepository;
import com.ssafy.doeng.data.repository.payment.PaymentRepository;
import com.ssafy.doeng.data.repository.progress.ProgressRepository;
import com.ssafy.doeng.data.repository.review.ReviewRepository;
import com.ssafy.doeng.data.repository.scene.SceneRepository;
import com.ssafy.doeng.data.repository.tale.TaleRepository;
import com.ssafy.doeng.data.repository.test.TestRepository;
import com.ssafy.doeng.data.repository.word.WordRepository;
import com.ssafy.doeng.errors.code.PaymentErrorCode;
import com.ssafy.doeng.errors.code.TaleErrorCode;
import com.ssafy.doeng.errors.exception.ErrorException;
import com.ssafy.doeng.service.Common;
import com.ssafy.doeng.service.tale.TaleService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class TaleServiceImpl implements TaleService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TaleServiceImpl.class);
    private final MemberRepository memberRepository;
    private final TaleRepository taleRepository;
    private final SceneRepository sceneRepository;
    private final PaymentRepository paymentRepository;
    private final ReviewRepository reviewRepository;
    private final ProgressRepository progressRepository;
    private final WordRepository wordRepository;
    private final Common common;
    private final TestRepository testRepository;
    private final MaterialRepository materialRepository;

    @Override
    public List<ResponseMainTaleDto> getTaleList(long memberId) {
        //// 에러처리 확실히 하기!
        LOGGER.info("[TaleServiceImpl] getTaleList memberId : {}", memberId);
        Member member = common.getMember(memberId);

        Set<Long> purchasedIdSet = paymentRepository.findIdByMember(member);
        List<Tale> taleList = taleRepository.findAll();
        List<ResponseMainTaleDto> responseDto = taleList.stream().map(
                tale -> (ResponseMainTaleDto.builder()
                        .id(tale.getId())
                        .backgroundImage(tale.getBackgroundImage())
                        .title(tale.getTitle())
                        .purchased(purchasedIdSet.contains(tale.getId()))
                        .build())
        ).collect(Collectors.toList());
        LOGGER.info("[TaleServiceImpl] getTaleList 종료");
        return responseDto;
    }

    @Override
    public ResponseMainTaleDetailDto getTaleDetail(RequestTaleDetailDto requestDto) {
        long taleId, memberId;
        taleId = requestDto.getTaleId();
        memberId = requestDto.getMemberId();
        LOGGER.info("[TaleServiceImpl] getTaleList memberId : {}, taleId : {}", memberId, taleId);

        Member member = common.getMember(memberId);
        Tale tale = taleRepository.findByIdFetchScene(taleId)
                .orElseThrow(() -> new ErrorException(TaleErrorCode.TALE_NOT_FOUND));

        common.notPaymentThrowException(member, tale);

        List<Word> wordList = wordRepository.findTaleWordsByTale(tale);
        List<Progress> progresses = progressRepository.getProgressDetailsByMember(memberId,taleId);
        Set<Long> correctWords = wordRepository.findByMemberIdAndTaleId(memberId,taleId);

        var responseDto = ResponseMainTaleDetailDto.builder()
                .id(tale.getId())
                .title(tale.getTitle())
                .wordList(makeWordList(wordList, correctWords))
                .sceneOrder(getOrder(progresses))
                .taleDone(progresses.size() == tale.getScenes().size())
                .sceneCount(tale.getScenes().size())
                .mainImage("메인 이미지 위치")
                .build();

        LOGGER.info("[TaleServiceImpl] getTaleList 종료");
        return responseDto;
    }

    private int getOrder(List<Progress> progresses) {
        if (progresses.isEmpty()) {
            return 0;
        }
        int rtn = 0;
        LocalDateTime recentlyPosted = progresses.get(0).getPlayedAt();
        for (Progress p : progresses) {
           if (recentlyPosted.isAfter(p.getPlayedAt())){
               Scene crtScene = p.getScene();
               rtn = crtScene.getSceneOrder();
               recentlyPosted = p.getPlayedAt();
           }
        }
        return rtn;
    }

    private List<ResponseWordDto> makeWordList(List<Word> wordList, Set<Long> correctIdList) {
        return wordList.stream().map(
                word -> ResponseWordDto.builder()
                        .id(word.getId())
                        .engWord(word.getEngWord())
                        .korWord(word.getKorWord())
                        .image(word.getImage())
                        .voice(word.getVoice())
                        .correct(correctIdList.contains(word.getId()))
                        .build()
        ).collect(Collectors.toList());
    }

    @Override
    public ResponseProgressTaleListDto getProgressTaleList(long memberId, Pageable pageable) {
        LOGGER.info("[학습 진행롤 리스트 service]");
        Slice<Tale> tales = paymentRepository.findByMember_Id(memberId, pageable);
        List<ResponseProgressTaleDto> taleList = new ArrayList<>();
        for (Tale t:tales) {
            int progress = 0;
            List<Integer> progressList = progressRepository.findProgressByMemberAndTale(memberId, t.getId());
            if(progressList != null && !progressList.isEmpty()) {
                int progressMax = Collections.max(progressList);
                int sceneCount = sceneRepository.findByTale(t).size();
                progress = (progressMax * 100 / sceneCount);
            }

            ResponseProgressTaleDto progressTaleDto = ResponseProgressTaleDto.builder()
                    .id(t.getId())
                    .title(t.getTitle())
                    .backgroundImage(t.getBackgroundImage())
                    .progress(progress)
                    .build();
            taleList.add(progressTaleDto);
        }

        ResponseProgressTaleListDto progressTaleListDto = ResponseProgressTaleListDto.builder()
                .taleList(taleList)
                .build();

        return progressTaleListDto;
    }

    @Override
    public ResponseProgressTaleDetailDto getProgressTaleDetail(long memberId, long taleId) {

        Tale tale = common.getTale(taleId);
        List<Scene> scenes = sceneRepository.findDetailByTale(tale);
        Member member = common.getMember(memberId);

        List<Test> testList = testRepository.findByTaleAndMemberFetchWord(tale, member);
        List<Integer> testCountList = testRepository.getTestCountByTaleAndMember(tale, member);

        int maxCount = 0;
        if (testCountList != null && !testCountList.isEmpty()) {
            maxCount = Collections.max(testCountList);
        }

        LOGGER.info("[TaleServiceImpl] getProgressTaleDetail dto 작성");
        var progressTaleDetailDto = ResponseProgressTaleDetailDto.builder()
                .id(tale.getId())
                .title(tale.getTitle())
                .backgroundImage(tale.getBackgroundImage())
                .sceneList(makeSceneList(scenes))
                .testResult(maxCount == 0 ? null : makeTest(testList, maxCount))
                .build();
        LOGGER.info("[TaleServiceImpl] getProgressTaleDetail dto 종료");
        return progressTaleDetailDto;
    }

    private ResponseProgressTestResultDto makeTest(List<Test> testList, int maxCount) {
        LOGGER.info("[TaleServiceImpl] makeTest dto 시작");

        List<ResponseProgressWordListDto> testResult = new ArrayList<>();
        int wordCount = testList.size() / maxCount;
        for(int i = 0; i < wordCount; i++) {
            List<Boolean> correctList = new ArrayList<>();
            for (int j = i * maxCount; j < (i + 1) * maxCount; j++) {
                correctList.add(testList.get(j).isCorrect());
            }
            testResult.add(ResponseProgressWordListDto.builder()
                            .engWord(testList.get(i*maxCount).getWord().getEngWord())
                            .correctList(correctList)
                    .build());
        }
        LOGGER.info("[TaleServiceImpl] makeTest dto 종료");

        return ResponseProgressTestResultDto.builder()
                .testCount(maxCount)
                .wordList(testResult)
                .build();
    }

    private List<ResponseProgressSceneDto> makeSceneList(List<Scene> sceneList) {
        LOGGER.info("[TaleServiceImpl] makeSceneList 시작");
        List<ResponseProgressSceneDto> returnDto = sceneList.stream().map(
                scene -> ResponseProgressSceneDto.builder()
                        .id(scene.getId())
                        .sceneTitle(scene.getTitle())
                        .imageList(findProgress(scene))
                        .build()
        ).collect(Collectors.toList());
        LOGGER.info("[TaleServiceImpl] makeSceneList 종료");
        return returnDto;
    }

    private List<ResponseProgressImageDto> findProgress(Scene scene) {
        if (!scene.getProgresses().isEmpty() && scene.getProgresses() != null) {
            return makeImageList(scene.getProgresses().get(0).getPictures());
        }
        return null;
    }

    private List<ResponseProgressImageDto> makeImageList(List<Picture> pictures) {
        LOGGER.info("[TaleServiceImpl] makeImageList 시작");
        List<ResponseProgressImageDto> returnDtoList = pictures.stream().map(picture -> ResponseProgressImageDto.builder()
                .id(picture.getId())
                .image(picture.getImage())
                .build()
        ).collect(Collectors.toList());
        LOGGER.info("[TaleServiceImpl] makeImageList 종료");
        return returnDtoList;
    }

    @Override
    public ResponsePaymentTaleListDto getPaymentTaleList(long memberId, Pageable pageable) {

        Slice<Tale> tales = taleRepository.findAll(pageable);
        Member member = common.getMember(memberId);
        List<ResponsePaymentTaleDto> paymentTaleDtoList = new ArrayList<>();
        for (Tale t:tales) {
            boolean isPurchased = paymentRepository.existsByMemberAndTale(member, t);
            double score = getReviewSum(t.getId());
            ResponsePaymentTaleDto paymentTaleDto = ResponsePaymentTaleDto.builder()
                    .id(t.getId())
                    .title(t.getTitle())
                    .backgroundImage(t.getBackgroundImage())
                    .score(score)
                    .purchased(isPurchased)
                    .build();
            paymentTaleDtoList.add(paymentTaleDto);
        }
        ResponsePaymentTaleListDto paymentTaleListDto = ResponsePaymentTaleListDto.builder()
                .taleList(paymentTaleDtoList)
                .build();

        return paymentTaleListDto;
    }

    public ResponsePaymentTaleDetailDto getPaymentTaleDetail(long memberId, long taleId) {
        LOGGER.info("[책 구매 상세 목록 service] memberId {}, taleId {}", memberId, taleId);
        Tale tale = common.getTale(taleId);
        long tId = tale.getId();

        ResponseReviewDto myReview = null;

        List<ResponseReviewDto> reviewDtoList = new ArrayList<>();
        List<Review> reviews = reviewRepository.findByTale_IdOrderByCreatedAtDesc(tId);
        for (Review r: reviews) {
            if(r.getMember().getId() == memberId) {
                myReview = ResponseReviewDto.builder()
                        .id(r.getId())
                        .userId(r.getMember().getMemberId())
                        .score(r.getScore())
                        .content(r.getContent())
                        .build();
            } else {
                ResponseReviewDto reviewDto = ResponseReviewDto.builder()
                        .id(r.getId())
                        .userId(r.getMember().getMemberId())
                        .score(r.getScore())
                        .content(r.getContent())
                        .build();
                reviewDtoList.add(reviewDto);
            }
        }

        List<Material> materials = materialRepository.findByTale(tale);
        List<ResponseMaterialDto> responseMaterialDtoList = new ArrayList<>();
        for (Material m:materials) {
            ResponseMaterialDto materialDto = ResponseMaterialDto.builder()
                    .id(m.getId())
                    .name(m.getName())
                    .build();
            responseMaterialDtoList.add(materialDto);
        }

        boolean isPurchased = paymentRepository.existsByMemberAndTale(common.getMember(memberId), tale);
        var responsePaymentTaleDetailDto = ResponsePaymentTaleDetailDto.builder()
                .id(tale.getId())
                .title(tale.getTitle())
                .backgroundImage(tale.getBackgroundImage())
                .description(tale.getDescription())
                .score(getReviewSum(taleId))
                .price(tale.getPrice())
                .purchased(isPurchased)
                .materialList(responseMaterialDtoList)
                .myReview(myReview)
                .reviewList(reviewDtoList)
                .build();

        return responsePaymentTaleDetailDto;
    }

    private double getReviewSum(long taleId) {
        Optional<ReviewSum> reviewSum = reviewRepository.findReviewsGroupByTale(taleId);
        double score = 0.0;
        if(reviewSum.isPresent()) {
            double sum = reviewSum.get().getSum();
            score = Math.round((sum / reviewSum.get().getCount()) * 10) / 10.0;
        }
        return score;
    }

    public void postTalePayment(RequestTalePaymentDto requestDto) {
        LOGGER.info("[TaleServiceImpl] 결제 저장 service 들어옴");
        Member member = common.getMember(requestDto.getMemberId());
        Tale tale = common.getTale(requestDto.getTaleId());

        Payment payment = Payment.builder()
                .tale(tale)
                .member(member)
                .build();

        paymentRepository.save(payment);
        LOGGER.info("[TaleServiceImpl] 결제 저장 완료");
    }
}

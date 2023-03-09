package com.ssafy.doeng.service.tale.impl;

import com.ssafy.doeng.data.dto.review.response.ResponseReviewDto;
import com.ssafy.doeng.data.dto.review.response.ResponseReviewListDto;
import com.ssafy.doeng.data.dto.review.vo.ReviewSum;
import com.ssafy.doeng.data.dto.tale.request.RequestTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleListDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleListDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseWordDto;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.progress.Progress;
import com.ssafy.doeng.data.entity.review.Review;
import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.entity.word.Word;
import com.ssafy.doeng.data.repository.member.MemberRepository;
import com.ssafy.doeng.data.repository.payment.PaymentRepository;
import com.ssafy.doeng.data.repository.progress.ProgressRepository;
import com.ssafy.doeng.data.repository.review.ReviewRepository;
import com.ssafy.doeng.data.repository.scene.SceneRepository;
import com.ssafy.doeng.data.repository.tale.TaleRepository;
import com.ssafy.doeng.data.repository.word.WordRepository;
import com.ssafy.doeng.errors.code.TaleErrorCode;
import com.ssafy.doeng.errors.exception.ErrorException;
import com.ssafy.doeng.service.Common;
import com.ssafy.doeng.service.tale.TaleService;
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

        common.getMember(memberId);

        Tale tale = taleRepository.findByIdFetchScene(taleId)
                .orElseThrow(() -> new ErrorException(TaleErrorCode.TALE_NOT_FOUND));

        List<Word> wordList = wordRepository.findTaleWordsByTale(tale);
        Set<Long> correctWords = wordRepository.findByMemberIdAndTaleId(memberId,taleId);

        var responseDto = ResponseMainTaleDetailDto.builder()
                .id(tale.getId())
                .title(tale.getTitle())
                .wordList(makeWordList(wordList, correctWords))
                .sceneOrder(1)
                .sceneCount(tale.getScenes().size())
                .mainImage("메인 이미지 위치")
                .build();

        LOGGER.info("[TaleServiceImpl] getTaleList 종료");
        return responseDto;
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
        Optional<Review> review = reviewRepository.findByTale_IdAndMember_Id(taleId, memberId);
        ResponseReviewDto myReview = null;
        if (review.isPresent()) {
            myReview = ResponseReviewDto.builder()
                    .id(review.get().getId())
                    .memberId(review.get().getMember().getId())
                    .score(review.get().getScore())
                    .content(review.get().getContent())
                    .build();
        }

        List<ResponseReviewDto> reviewDtoList = new ArrayList<>();
        List<Review> reviews = reviewRepository.findByTale_IdOrderByCreatedAtDesc(taleId);
        for (Review r: reviews) {
            if(r.getMember().getId() == memberId) continue;
            ResponseReviewDto reviewDto = ResponseReviewDto.builder()
                    .id(r.getId())
                    .memberId(r.getMember().getId())
                    .score(r.getScore())
                    .content(r.getContent())
                    .build();
            reviewDtoList.add(reviewDto);
        }

        ResponseReviewListDto reviewList = ResponseReviewListDto.builder()
                .reviewList(reviewDtoList)
                .build();

        Tale tale = taleRepository.findByIdFetchScene(taleId)
                .orElseThrow(() -> new ErrorException(TaleErrorCode.TALE_NOT_FOUND));

        boolean isPurchased = paymentRepository.existsByMemberAndTale(common.getMember(memberId), tale);
        var responsePaymentTaleDetailDto = ResponsePaymentTaleDetailDto.builder()
                .id(tale.getId())
                .title(tale.getTitle())
                .backgroundImage(tale.getBackgroundImage())
                .description(tale.getDescription())
                .score(getReviewSum(taleId))
                .price(tale.getPrice())
                .purchased(isPurchased)
                .myReview(myReview)
                .reviewList(reviewList)
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
}

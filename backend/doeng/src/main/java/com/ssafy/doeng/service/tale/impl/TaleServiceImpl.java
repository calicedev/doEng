package com.ssafy.doeng.service.tale.impl;

import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleListDto;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.repository.member.MemberRepository;
import com.ssafy.doeng.data.repository.payment.PaymentRepository;
import com.ssafy.doeng.data.repository.review.ReviewRepository;
import com.ssafy.doeng.data.repository.tale.TaleRepository;
import com.ssafy.doeng.service.tale.TaleService;
import java.util.ArrayList;
import java.util.List;
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
    private final PaymentRepository paymentRepository;
    private final ReviewRepository reviewRepository;

    @Override
    public ResponsePaymentTaleListDto getPaymentTaleList(long memberId, Pageable pageable) {

        Slice<Tale> tales = taleRepository.findAll(pageable);
        Member member = memberRepository.getById(memberId);
        List<ResponsePaymentTaleDto> paymentTaleDtoList = new ArrayList<>();
        for (Tale t:tales) {
            boolean isPurchased = paymentRepository.existsByMemberAndTale(member, t);
//            reviewRepository.findReviewsGroupByTale().stream()
            ResponsePaymentTaleDto paymentTaleDto = ResponsePaymentTaleDto.builder()
                    .id(t.getId())
                    .title(t.getTitle())
                    .backgroundImage(t.getBackgroundImage())
                    .score(5)
                    .purchased(isPurchased)
                    .build();
            paymentTaleDtoList.add(paymentTaleDto);
        }
        ResponsePaymentTaleListDto paymentTaleListDto = ResponsePaymentTaleListDto.builder()
                .taleList(paymentTaleDtoList)
                .build();

        return paymentTaleListDto;
    }
}

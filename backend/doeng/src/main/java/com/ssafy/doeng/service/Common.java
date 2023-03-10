package com.ssafy.doeng.service;

import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.repository.member.MemberRepository;
import com.ssafy.doeng.data.repository.payment.PaymentRepository;
import com.ssafy.doeng.data.repository.tale.TaleRepository;
import com.ssafy.doeng.errors.code.PaymentErrorCode;
import com.ssafy.doeng.errors.code.TaleErrorCode;
import com.ssafy.doeng.errors.exception.ErrorException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Component
public class Common {

    private final MemberRepository memberRepository;
    private final TaleRepository taleRepository;
    private final PaymentRepository paymentRepository;

    @Transactional(readOnly = true)
    public Member getMember(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(RuntimeException::new);
    }

    @Transactional(readOnly = true)
    public Tale getTale(long taleId) {
        return taleRepository.findById(taleId)
                .orElseThrow(() -> new ErrorException(TaleErrorCode.TALE_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public void notPaymentThrowException(Member member, Tale tale) {
        if (!paymentRepository.existsByMemberAndTale(member, tale)) {
            throw new ErrorException(PaymentErrorCode.PAYMENT_UNAUTHORIZED);
        }
    }
}

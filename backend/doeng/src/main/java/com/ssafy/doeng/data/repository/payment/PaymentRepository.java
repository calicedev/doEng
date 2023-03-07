package com.ssafy.doeng.data.repository.payment;

import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.payment.Payment;
import com.ssafy.doeng.data.entity.tale.Tale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    boolean existsByMemberAndTale(Member member, Tale tale);
}

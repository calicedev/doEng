package com.ssafy.doeng.data.repository.payment;

import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.payment.Payment;
import com.ssafy.doeng.data.entity.tale.Tale;
import java.util.Set;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    boolean existsByMemberAndTale(Member member, Tale tale);

    @Query("select distinct p.tale.id from Payment p where p.member=:member")
    Set<Long> findIdByMember(@Param("member") Member member);

    @Query("select t from Tale t "
            + "left join Payment p on t.id = p.tale.id "
            + "where p.member.id = :memberId")
    Slice<Tale> findByMember_Id(@Param("memberId") long memberId, Pageable pageable);
}

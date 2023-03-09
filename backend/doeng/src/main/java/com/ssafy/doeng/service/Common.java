package com.ssafy.doeng.service;

import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Component
public class Common {
    private final MemberRepository memberRepository;

    @Transactional
    public Member getMember(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(RuntimeException::new);
    }
}

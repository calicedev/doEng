package com.ssafy.doeng.service.member.Impl;

import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.repository.member.MemberRepository;
import com.ssafy.doeng.service.member.MemberService;
import com.ssafy.doeng.service.review.impl.ReviewServiceImpl;
import com.ssafy.doeng.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberServiceImpl implements MemberService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReviewServiceImpl.class);

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

//
//    public void checkMemberId(String memberId) {
//        LOGGER.info("[checkMemberIdDuplicate] 회원 memberId 중복 검사 시작");
//        if (memberRepository.existsByMemberId(memberId)) {
//            throw new ErrorException(MemberErrorCode.MEMBERID_EXIST);
//        }
//        LOGGER.info("[checkMemberIdDuplicate] 회원 memberId 중복 검사 완료");
//    }
//
//    @Override
//    public void checkNickname(String nickname) {
//        LOGGER.info("[checkMemberIdDuplicate] 회원 memberId 중복 검사 시작");
//        if (memberRepository.existsByNickname(nickname)) {
//            throw new ErrorException(MemberErrorCode.MEMBERID_EXIST);
//        }
//        LOGGER.info("[checkMemberIdDuplicate] 회원 memberId 중복 검사 완료");
//    }




}
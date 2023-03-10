package com.ssafy.doeng.service.member.Impl;

import com.ssafy.doeng.data.dto.member.request.RequestModifyMemberDto;
import com.ssafy.doeng.data.dto.member.response.ResponseMemberDto;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.repository.member.MemberRepository;
import com.ssafy.doeng.service.member.MemberService;
import com.ssafy.doeng.service.review.impl.ReviewServiceImpl;
import com.ssafy.doeng.util.SecurityUtil;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberServiceImpl implements MemberService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReviewServiceImpl.class);

    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public ResponseMemberDto getMemberInfo() {
        LOGGER.info("회원 정보 서비스 들어옴");
        return memberRepository.findByMemberId(SecurityUtil.getCurrentMemberId())
                .map(ResponseMemberDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }

    @Transactional
    public void modifyMemberInfo(RequestModifyMemberDto requestDto) {
        LOGGER.info("회원 정보 수정 서비스 들어옴");
        Optional<Member> tMember = memberRepository.findByMemberId(SecurityUtil.getCurrentMemberId());
        Member member = tMember.get();
        if(requestDto.getNickname()!=null || requestDto.getNickname()!=""){
            member.setNickname(requestDto.getNickname());
        } else if(requestDto.getName()!=null || requestDto.getName()!=""){
            member.setName(requestDto.getName());
        }
        memberRepository.save(member);
    }

    @Override
    public void MemberWithdrawal() {
        LOGGER.info("회원 탈퇴 서비스 들어옴");
        Optional<Member> member = memberRepository.findByMemberId(SecurityUtil.getCurrentMemberId());
        member.ifPresent(memberRepository::delete);
    }

    @Override
    public boolean checkMemberId(String memberId) {
        LOGGER.info("아이디 중복 확인 서비스 들어옴");
        return memberRepository.existsByMemberId(memberId);
    }

    @Override
    public boolean checkNickname(String nickname) {
        LOGGER.info("닉네임 중복 확인 드렁옴");
        return memberRepository.existsByNickname(nickname);
    }

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
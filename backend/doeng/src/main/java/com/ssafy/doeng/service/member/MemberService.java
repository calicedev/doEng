package com.ssafy.doeng.service.member;

import com.ssafy.doeng.data.dto.member.TokenDto;
import com.ssafy.doeng.data.dto.member.request.RequestMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestModifyMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestSignupDto;
import com.ssafy.doeng.data.dto.member.request.RequestTokenDto;
import com.ssafy.doeng.data.entity.member.Member;

public interface MemberService {
    void signup(RequestSignupDto requestDto);
    TokenDto login(RequestMemberDto requestDto);
    TokenDto reissue(RequestTokenDto requestDto);
    void logout(Long id);
    Member getMemberInfo(Long id);
    void modifyMemberInfo(RequestModifyMemberDto requestDto);
    void MemberWithdrawal();

    boolean checkMemberId(String memberId);

    boolean checkNickname(String nickname);

    Object getLoginMemberEmail();
}

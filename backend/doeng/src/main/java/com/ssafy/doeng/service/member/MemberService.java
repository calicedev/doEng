package com.ssafy.doeng.service.member;

import com.ssafy.doeng.data.dto.member.request.RequestModifyMemberDto;
import com.ssafy.doeng.data.dto.member.response.ResponseMemberDto;

public interface MemberService {

    ResponseMemberDto getMemberInfo();
    void modifyMemberInfo(RequestModifyMemberDto requestDto);
    void MemberWithdrawal();

    boolean checkMemberId(String memberId);

    boolean checkNickname(String nickname);
}

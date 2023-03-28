package com.ssafy.doeng.service.member;

import com.ssafy.doeng.data.dto.member.TokenDto;
import com.ssafy.doeng.data.dto.member.request.RequestCheckPasswordDto;
import com.ssafy.doeng.data.dto.member.request.RequestEmailDto;
import com.ssafy.doeng.data.dto.member.request.RequestEmailValidateDto;
import com.ssafy.doeng.data.dto.member.request.RequestFindIdDto;
import com.ssafy.doeng.data.dto.member.request.RequestMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestModifyMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestModifyMemberPasswordDto;
import com.ssafy.doeng.data.dto.member.request.RequestResetMemberPasswordDto;
import com.ssafy.doeng.data.dto.member.request.RequestSignupDto;
import com.ssafy.doeng.data.dto.member.request.RequestSignupEmailDto;
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

    void checkEmailSend(RequestEmailDto requestDto);

    String checkEmailConfirm(RequestEmailValidateDto requestDto);

    String checkPassword(Long id, RequestCheckPasswordDto requestDto);

    void resetMemberPassword(RequestResetMemberPasswordDto requestDto);

    void modifyMemberPassword(Long id, RequestModifyMemberPasswordDto requestDto);

    boolean checkEmail(String email);

    String findId(RequestFindIdDto requestDto);

    void checkSignUpEmailSend(RequestSignupEmailDto requestDto);

    boolean checkPhone(String phone);

    String checkEmailDuplicate(String email);
}

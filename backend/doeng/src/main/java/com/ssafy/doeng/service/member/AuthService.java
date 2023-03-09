package com.ssafy.doeng.service.member;

import com.ssafy.doeng.data.dto.member.TokenDto;
import com.ssafy.doeng.data.dto.member.request.RequestMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestSignupDto;
import com.ssafy.doeng.data.dto.member.request.RequestTokenDto;
import com.ssafy.doeng.data.dto.member.response.ResponseMemberDto;

public interface AuthService {
    ResponseMemberDto signup(RequestSignupDto requestDto);
    TokenDto login(RequestMemberDto requestDto);
    TokenDto reissue(RequestTokenDto requestDto);

}

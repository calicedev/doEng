package com.ssafy.doeng.controller;

import com.ssafy.doeng.config.auth.LoginId;
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
import com.ssafy.doeng.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MemberController.class);
    private final MemberService memberService;

    @GetMapping("test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("auto CI/CD");
    }


    @DeleteMapping("/logout")
    public ResponseEntity logout(@LoginId Long id) {
        LOGGER.info("[logout] 로그아웃 controller 들어옴");
        memberService.logout(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Member> getMemberInfo(@LoginId Long id){
        LOGGER.info("[GetMemberInfo] 회원 정보 조회 controller 들어옴");
        return ResponseEntity.ok(memberService.getMemberInfo(id));
    }


    @PatchMapping
    public ResponseEntity modifyMemberInfo(@RequestBody RequestModifyMemberDto requestDto){
        LOGGER.info("[ModifyMemberInfo] 회원 수정 정보 들어옴");
        memberService.modifyMemberInfo(requestDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity memberWithdrawal(){
        LOGGER.info("[MemberWithdrawal] 회원 탈퇴 요청 controller 들어옴");
        memberService.MemberWithdrawal();
        return new ResponseEntity(HttpStatus.OK);
    }


    @PatchMapping("/password")
    public ResponseEntity modifyMemberPassword(@LoginId Long id,  @RequestBody RequestModifyMemberPasswordDto requestDto){
        LOGGER.info("[ModifyMemberPassword] 비밀번호 수정 controller 들어옴");
        memberService.modifyMemberPassword(id,requestDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/check/password")
    public ResponseEntity<String> checkPassword(@LoginId Long id, @RequestBody RequestCheckPasswordDto requestDto){
        LOGGER.info("[CheckPassowrd] 비밀번호 검증 controller 들어옴");
        return ResponseEntity.ok(memberService.checkPassword(id,requestDto));
    }


    @PostMapping("/check/email/send")
    public ResponseEntity checkEmailSend(@RequestBody RequestEmailDto requestDto){
        LOGGER.info("[checkEmailSend] 이메일 인증번호 요청 controller 들어옴");
        memberService.checkEmailSend(requestDto);
        LOGGER.info("[checkEmailSend] 이메일 인증번호 요청 controller 나감");
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/ai")
    public ResponseEntity<Long> ai(@LoginId Long id){
        return ResponseEntity.ok(id);
    }


}

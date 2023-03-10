package com.ssafy.doeng.controller;

import com.ssafy.doeng.data.dto.member.request.RequestCheckPasswordDto;
import com.ssafy.doeng.data.dto.member.request.RequestEmailDto;
import com.ssafy.doeng.data.dto.member.request.RequestEmailValidateDto;
import com.ssafy.doeng.data.dto.member.request.RequestModifyMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestModifyMemberPasswordDto;
import com.ssafy.doeng.data.dto.member.response.ResponseMemberDto;
import com.ssafy.doeng.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MemberController.class);
    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<ResponseMemberDto> GetMemberInfo(){
        LOGGER.info("회원 정보 조회 들어옴");
        return ResponseEntity.ok(memberService.getMemberInfo());
    }

    @PatchMapping
    public void ModifyMemberInfo(@RequestBody RequestModifyMemberDto requestDto){
        LOGGER.info("회원 수정 정보 들어옴");
        memberService.modifyMemberInfo(requestDto);
    }

    @DeleteMapping
    public void MemberWithdrawal(){
        LOGGER.info("회원 탈퇴 요청");
        memberService.MemberWithdrawal();
    }

    @PutMapping("/password")
    public ResponseEntity<String> ModifyMemberPassword(@RequestBody RequestModifyMemberPasswordDto requestDto){
        LOGGER.info("비밀번호 수정");
        return ResponseEntity.ok().body("");
    }

    @PostMapping("/check/password")
    public ResponseEntity<String> CheckPassowrd(@RequestBody RequestCheckPasswordDto requestDto){
        LOGGER.info("비밀번호 검증");
        return ResponseEntity.ok().body("");
    }

    @PostMapping("/check/emailcode")
    public ResponseEntity<String> CheckEmailcode(@RequestBody RequestEmailDto requestDto){
        LOGGER.info("이메일 인증번호 요청");
        return ResponseEntity.ok().body("");
    }

    @PostMapping("/check/email")
    public ResponseEntity<?> CheckEmail(@RequestBody RequestEmailValidateDto requestDto){
        LOGGER.info("이메일 인증 확인");
        return ResponseEntity.ok().body("");
    }

    @GetMapping("/check/memberId/{memberId}")
    public ResponseEntity<Boolean> CheckMemberId(@PathVariable("memberId") String memberId){
        LOGGER.info("아이디 중복체크");
        return ResponseEntity.ok().body(memberService.checkMemberId(memberId));
    }

    @GetMapping("/check/nickname/{nickname}")
    public ResponseEntity<Boolean> CheckNickname(@PathVariable("nickname") String nickname){
        LOGGER.info("닉네임 중복제크");
        return ResponseEntity.ok().body(memberService.checkNickname(nickname));

    }

}

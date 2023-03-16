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


    @PostMapping
    public ResponseEntity<Void> signup(@RequestBody RequestSignupDto requestDto) {
        LOGGER.info("[signup] 회원가입 controller 들어옴");
        memberService.signup(requestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody RequestMemberDto requestDto) {
        LOGGER.info("[login] 로그인 controller 들어옴");
        TokenDto tokenDto = memberService.login(requestDto);
        HttpHeaders headers = new HttpHeaders();
        headers.set("accesstoken", tokenDto.getAccesstoken());
        headers.set("refreshtoken", tokenDto.getRefreshtoken());
        return new ResponseEntity<>("",headers,HttpStatus.OK);
    }

    @PostMapping("/id")
    public ResponseEntity<String> findId(@RequestBody RequestFindIdDto requestDto) {
        LOGGER.info("[reissue] findId controller 들어옴");
        return ResponseEntity.ok(memberService.findId(requestDto));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody RequestTokenDto requestDto) {
        LOGGER.info("[reissue] accessToken 재발급 controller 들어옴");
        return ResponseEntity.ok(memberService.reissue(requestDto));
    }

    @DeleteMapping("/logout")
    public void logout(@LoginId Long id) {
        LOGGER.info("[logout] 로그아웃 controller 들어옴");
        memberService.logout(id);
    }

    @GetMapping
    public ResponseEntity<Member> getMemberInfo(@LoginId Long id){
        LOGGER.info("[GetMemberInfo] 회원 정보 조회 controller 들어옴");
        return ResponseEntity.ok(memberService.getMemberInfo(id));
    }

    @PatchMapping
    public void modifyMemberInfo(@RequestBody RequestModifyMemberDto requestDto){
        LOGGER.info("[ModifyMemberInfo] 회원 수정 정보 들어옴");
        memberService.modifyMemberInfo(requestDto);
    }

    @DeleteMapping
    public void memberWithdrawal(){
        LOGGER.info("[MemberWithdrawal] 회원 탈퇴 요청 controller 들어옴");
        memberService.MemberWithdrawal();
    }

    @PutMapping("/password")
    public ResponseEntity<String> resetMemberPassword(@RequestBody RequestResetMemberPasswordDto requestDto){
        LOGGER.info("[resetMemberPassword] 비밀번호 리셋 controller 들어옴");
        memberService.resetMemberPassword(requestDto);
        return ResponseEntity.ok().body("");
    }

    @PatchMapping("/password")
    public ResponseEntity<String> modifyMemberPassword(@LoginId Long id,  @RequestBody RequestModifyMemberPasswordDto requestDto){
        LOGGER.info("[ModifyMemberPassword] 비밀번호 수정 controller 들어옴");
        memberService.modifyMemberPassword(id,requestDto);
        return ResponseEntity.ok().body("");
    }

    @PostMapping("/check/password")
    public ResponseEntity<String> checkPassword(@LoginId Long id, @RequestBody RequestCheckPasswordDto requestDto){
        LOGGER.info("[CheckPassowrd] 비밀번호 검증 controller 들어옴");
        return ResponseEntity.ok().body(memberService.checkPassword(id,requestDto));
    }


    @PostMapping("/check/email/send")
    public ResponseEntity<String> checkEmailSend(@RequestBody RequestEmailDto requestDto){
        LOGGER.info("[checkEmailSend] 이메일 인증번호 요청 controller 들어옴");
        memberService.checkEmailSend(requestDto);
        return ResponseEntity.ok().body("");
    }

    @PostMapping("/check/signup-email/send")
    public ResponseEntity<String> checkSignupEmailSend(@RequestBody RequestSignupEmailDto requestDto){
        LOGGER.info("[checkEmailSend] 이메일 인증번호 요청 controller 들어옴");
        memberService.checkSignUpEmailSend(requestDto);
        return ResponseEntity.ok().body("");
    }

    @PostMapping("/check/email/confirm")
    public ResponseEntity<String> checkEmailConfirm(@RequestBody RequestEmailValidateDto requestDto){
        LOGGER.info("[checkEmailConfirm] 이메일 인증 확인 controller 들어옴");
        return ResponseEntity.ok().body(memberService.checkEmailConfirm(requestDto));
    }

    @GetMapping("/check/memberId/{memberId}")
    public ResponseEntity<Boolean> CheckMemberId(@PathVariable("memberId") String memberId){
        LOGGER.info("[CheckMemberId] 아이디 중복체크 controller 들어옴");
        LOGGER.info("[CheckMemberId] 아이디 중복체크 controller 들어옴");
        return ResponseEntity.ok().body(memberService.checkMemberId(memberId));
    }

    @GetMapping("/check/phone/{phone}")
    public ResponseEntity<Boolean> CheckPhone(@PathVariable("phone") String phone){
        LOGGER.info("[CheckMemberId] 아이디 중복체크 controller 들어옴");
        LOGGER.info("[CheckMemberId] 아이디 중복체크 controller 들어옴");
        return ResponseEntity.ok().body(memberService.checkPhone(phone));
    }

    @GetMapping("/check/nickname/{nickname}")
    public ResponseEntity<Boolean> CheckNickname(@PathVariable("nickname") String nickname){
        LOGGER.info("[CheckNickname] 닉네임 중복제크 controller 들어옴");
        return ResponseEntity.ok().body(memberService.checkNickname(nickname));
    }

    @GetMapping("/check/email/{email}")
    public ResponseEntity<Boolean> CheckEmail(@PathVariable("email") String email){
        LOGGER.info("[CheckEmail] 닉네임 중복제크 controller 들어옴");
        return ResponseEntity.ok().body(memberService.checkEmail(email));
    }

}

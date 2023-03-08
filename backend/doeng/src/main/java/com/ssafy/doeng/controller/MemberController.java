package com.ssafy.doeng.controller;

import com.ssafy.doeng.data.dto.member.request.RequestCheckPasswordDto;
import com.ssafy.doeng.data.dto.member.request.RequestEmailDto;
import com.ssafy.doeng.data.dto.member.request.RequestEmailValidateDto;
import com.ssafy.doeng.data.dto.member.request.RequestModifyMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestModifyMemberPasswordDto;
import com.ssafy.doeng.data.dto.member.request.RequestSignupDto;
import com.ssafy.doeng.data.dto.member.response.ResponseLoginDto;
import com.ssafy.doeng.data.dto.member.response.ResponseMemberDto;
import com.ssafy.doeng.service.member.MemberService;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MemberController.class);
    private final MemberService memberService;
    @PostMapping
    public ResponseEntity<String> Signup(@RequestBody RequestSignupDto requestDto) {
        LOGGER.info("회원가입 정보 들어옴");
        return ResponseEntity.ok().body("");
    }

    @GetMapping
    public ResponseEntity<ResponseMemberDto> MemberInfo(@CookieValue(value = "accessToken", defaultValue = "") String accessToken){
        LOGGER.info("회원 정보 정보 조회를 위해 ");
        ResponseMemberDto responseMemberDto = ResponseMemberDto.builder()
                .email("calicedev@gmail.com")
                .nickname("헤디티")
                .name("임혜은")
                .phone("010-5697-2334")
                .createdAt(LocalDateTime.parse("2021-11-08T11:44:30.327959"))
                .memberId("heiditty")
                .build();
        return ResponseEntity.ok().body(responseMemberDto);
    }

    @PatchMapping
    public ResponseEntity<String> ModifyMemberInfo(@RequestBody RequestModifyMemberDto requestDto){
        LOGGER.info("회원 수정 정보 들어옴");
        return ResponseEntity.ok().body("");
    }

    @DeleteMapping
    public ResponseEntity<String> MemberWithdrawal(@CookieValue(value = "accessToken", defaultValue = "") String accessToken){
        LOGGER.info("회원 탈퇴 요청");
        return ResponseEntity.ok().body("");
    }

    @PostMapping("/login")
    public ResponseEntity<String> Login(){
        LOGGER.info("로그인");
        ResponseLoginDto responseLoginDto = ResponseLoginDto.builder()
                .accessToken("dsdsdsdasdasd")
                .refreshToken("dsasdasdfasf")
                .expiration("dsdasdafewdEDF")
                .build();
        return ResponseEntity.ok().body("로그인 했음");
    }

    @DeleteMapping("/refreshToken")
    public ResponseEntity<String> Logout(@CookieValue(value = "accessToken", defaultValue = "") String accessToken){
        LOGGER.info("로그아웃");
        return ResponseEntity.ok().body("로그아웃 했음");
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

    @PostMapping("/check/memberId")
    public ResponseEntity<?> CheckMemberId(@RequestBody RequestEmailValidateDto requestDto){
        LOGGER.info("이메일 인증 확인");
        return ResponseEntity.ok().body("");
    }

    @PostMapping("/check/nickname")
    public ResponseEntity<?> CheckNickname(@RequestBody RequestEmailValidateDto requestDto){
        LOGGER.info("이메일 인증 확인");
        return ResponseEntity.ok().body("");
    }

    @PostMapping("/check/accessToken")
    public ResponseEntity<?> AccessTokenReissue(@RequestBody RequestEmailValidateDto requestDto){
        LOGGER.info("이메일 인증 확인");
        return ResponseEntity.ok().body("");
    }
}

package com.ssafy.doeng.controller;

import com.ssafy.doeng.data.dto.member.request.RequestCheckPasswordDto;
import com.ssafy.doeng.data.dto.member.request.RequestEmailDto;
import com.ssafy.doeng.data.dto.member.request.RequestEmailValidateDto;
import com.ssafy.doeng.data.dto.member.request.RequestModifyMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestModifyMemberPasswordDto;
import com.ssafy.doeng.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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

//    @GetMapping
//    public ResponseEntity<ResponseMemberDto> MemberInfo(@CookieValue(value = "accessToken", defaultValue = "") String accessToken){
//        LOGGER.info("회원 정보 정보 조회를 위해 ");
//        ResponseMemberDto responseMemberDto = ResponseMemberDto.builder()
//                .email("calicedev@gmail.com")
//                .nickname("헤디티")
//                .name("임혜은")
//                .phone("010-5697-2334")
//                .createdAt(LocalDateTime.parse("2021-11-08T11:44:30.327959"))
//                .memberId("heiditty")
//                .build();
//        return ResponseEntity.ok().body(responseMemberDto);
//    }

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

//    @PostMapping("/check/memberId/{memberId}")
//    public ResponseEntity<?> CheckMemberId(@PathVariable("memberId") String memberId){
//        LOGGER.info("아이디 중복체크");
//        memberService.checkMemberId(memberId);
//        return ResponseEntity.ok().body("");
//    }
//
//    @GetMapping("/check/nickname/{nickname}")
//    public ResponseEntity<?> CheckNickname(@PathVariable("nickname") String nickname){
//        LOGGER.info("닉네임 중복제크");
//        memberService.checkNickname(nickname);
//        return ResponseEntity.ok().body("");
//    }
//
//    @GetMapping("/check/accessToken")
//    public ResponseEntity<?> AccessTokenReissue(@RequestBody RequestAccessToken requestDto){
//        LOGGER.info("accesstoken 재발급");
//        return ResponseEntity.ok().body("");
//    }
}

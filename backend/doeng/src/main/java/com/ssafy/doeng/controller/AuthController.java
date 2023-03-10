package com.ssafy.doeng.controller;

import com.ssafy.doeng.data.dto.member.TokenDto;
import com.ssafy.doeng.data.dto.member.request.RequestMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestSignupDto;
import com.ssafy.doeng.data.dto.member.request.RequestTokenDto;
import com.ssafy.doeng.data.dto.member.response.ResponseMemberDto;
import com.ssafy.doeng.service.member.AuthService;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ResponseMemberDto> signup(@RequestBody RequestSignupDto requestDto) {
        LOGGER.info("회원가입 controller 들어옴");
        return ResponseEntity.ok(authService.signup(requestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody RequestMemberDto requestDto) {
        LOGGER.info("로그인 controller 들어옴");
        return ResponseEntity.ok(authService.login(requestDto));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody RequestTokenDto requestDto) {
        LOGGER.info("accessToken 재발급 controller 들어옴");
        return ResponseEntity.ok(authService.reissue(requestDto));
    }

    @DeleteMapping("/logout")
    public void logout() {
        LOGGER.info("회원 로그아웃 controller 들어옴");
        authService.logout();
    }
}

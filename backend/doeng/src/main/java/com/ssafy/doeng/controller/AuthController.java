package com.ssafy.doeng.controller;

import com.ssafy.doeng.data.dto.member.TokenDto;
import com.ssafy.doeng.data.dto.member.request.RequestMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestSignupDto;
import com.ssafy.doeng.data.dto.member.request.RequestTokenDto;
import com.ssafy.doeng.data.dto.member.response.ResponseMemberDto;
import com.ssafy.doeng.service.member.AuthService;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ResponseMemberDto> signup(@RequestBody RequestSignupDto requestDto) {
        return ResponseEntity.ok(authService.signup(requestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody RequestMemberDto requestDto, HttpServletResponse response) {
        TokenDto tokenDto = authService.login(requestDto);
        ResponseCookie cookie = ResponseCookie.from("refreshToken", tokenDto.getRefreshToken())
                .maxAge(7 * 24 * 60 * 60)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
        response.setHeader("Set-Cookie", cookie.toString());
        return ResponseEntity.ok("");
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody RequestTokenDto requestDto) {
        return ResponseEntity.ok(authService.reissue(requestDto));
    }
}

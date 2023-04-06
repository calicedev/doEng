package com.ssafy.doeng.controller;


import com.ssafy.doeng.data.dto.member.TokenDto;
import com.ssafy.doeng.data.dto.member.request.RequestEmailValidateDto;
import com.ssafy.doeng.data.dto.member.request.RequestFindIdDto;
import com.ssafy.doeng.data.dto.member.request.RequestMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestResetMemberPasswordDto;
import com.ssafy.doeng.data.dto.member.request.RequestSignupDto;
import com.ssafy.doeng.data.dto.member.request.RequestSignupEmailDto;
import com.ssafy.doeng.data.dto.member.request.RequestTokenDto;
import com.ssafy.doeng.data.dto.member.response.ResponseGoogleLoginType;
import com.ssafy.doeng.data.dto.member.response.ResponseGoogleSignupType;
import com.ssafy.doeng.oauth2.GetSocialOAuthRes;
import com.ssafy.doeng.oauth2.OAuthService;
import com.ssafy.doeng.oauth2.SocialLoginType;
import com.ssafy.doeng.service.member.MemberService;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MemberController.class);
    private final MemberService memberService;
    private final OAuthService oAuthService;

    @GetMapping("test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("test");
    }


    @PostMapping
    public ResponseEntity<Void> signup(@RequestBody RequestSignupDto requestDto) {
        LOGGER.info("[signup] 회원가입 controller 들어옴");
        memberService.signup(requestDto);
        LOGGER.info("[signup] 회원가입 controller 나감");
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody RequestMemberDto requestDto) {
        LOGGER.info("[login] 로그인 controller 들어옴");
        TokenDto tokenDto = memberService.login(requestDto);
        HttpHeaders headers = new HttpHeaders();
        headers.set("accesstoken", tokenDto.getAccesstoken());
        headers.set("refreshtoken", tokenDto.getRefreshtoken());
        LOGGER.info("[login] 로그인 controller 나감");
        return new ResponseEntity(headers, HttpStatus.OK);
    }

    @PostMapping("/reissue")
    public ResponseEntity reissue(@RequestHeader("accesstoken") String accesstoken, @RequestHeader("refreshtoken") String refreshtoken) {
        LOGGER.info("[reissue] accessToken 재발급 controller 들어옴");
        RequestTokenDto requestDto = new RequestTokenDto();
        requestDto.setAccesstoken(accesstoken);
        requestDto.setRefreshtoken(refreshtoken);
        TokenDto a = memberService.reissue(requestDto);
        HttpHeaders headers = new HttpHeaders();
        headers.set("accesstoken", a.getAccesstoken());
        headers.set("refreshtoken", a.getRefreshtoken());
        return new ResponseEntity(headers,HttpStatus.OK);
    }

    @PostMapping("/id")
    public ResponseEntity<String> findId(@RequestBody RequestFindIdDto requestDto) {
        LOGGER.info("[reissue] findId controller 들어옴");
        return ResponseEntity.ok(memberService.findId(requestDto));
    }

    @PutMapping("/password")
    public ResponseEntity resetMemberPassword(@RequestBody RequestResetMemberPasswordDto requestDto){
        LOGGER.info("[resetMemberPassword] 비밀번호 리셋 controller 들어옴");
        memberService.resetMemberPassword(requestDto);
        return new ResponseEntity(HttpStatus.OK);
    }


    @PostMapping("/check/signup-email/send")
    public ResponseEntity checkSignupEmailSend(@RequestBody RequestSignupEmailDto requestDto){
        LOGGER.info("[checkEmailSend] 이메일 인증번호 요청 controller 들어옴");
        memberService.checkSignUpEmailSend(requestDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/check/email/confirm")
    public ResponseEntity<String> checkEmailConfirm(@RequestBody RequestEmailValidateDto requestDto){
        LOGGER.info("[checkEmailConfirm] 이메일 인증 확인 controller 들어옴");
        return ResponseEntity.ok(memberService.checkEmailConfirm(requestDto));
    }
    @GetMapping("/check/memberId/{memberId}")
    public ResponseEntity<Boolean> CheckMemberId(@PathVariable("memberId") String memberId){
        LOGGER.info("[CheckMemberId] 아이디 중복체크 controller 들어옴");
        return ResponseEntity.ok(memberService.checkMemberId(memberId));
    }

    @GetMapping("/check/phone/{phone}")
    public ResponseEntity<Boolean> CheckPhone(@PathVariable("phone") String phone){
        LOGGER.info("[CheckMemberId] 핸드폰 중복체크 controller 들어옴");
        return ResponseEntity.ok(memberService.checkPhone(phone));
    }


    @GetMapping("/check/nickname/{nickname}")
    public ResponseEntity<Boolean> CheckNickname(@PathVariable("nickname") String nickname){
        LOGGER.info("[CheckNickname] 닉네임 중복제크 controller 들어옴");
        return ResponseEntity.ok(memberService.checkNickname(nickname));
    }

    @GetMapping("/check/email/{email}")
    public ResponseEntity<Boolean> CheckEmail(@PathVariable("email") String email){
        LOGGER.info("[CheckEmail] 닉네임 중복제크 controller 들어옴");
        return ResponseEntity.ok(memberService.checkEmail(email));
    }


    @GetMapping("/login/{socialLoginType}") //GOOGLE이 들어올 것이다.
    public String socialLoginRedirect(@PathVariable(name = "socialLoginType") String SocialLoginPath, HttpServletResponse response) throws IOException {
        SocialLoginType socialLoginType = SocialLoginType.valueOf(SocialLoginPath.toUpperCase());
        return oAuthService.request(socialLoginType);
    }


    @GetMapping("/login/code/{socialLoginType}/callback")
    public ResponseEntity callback(
            @PathVariable(name = "socialLoginType") String socialLoginPath,
            @RequestParam(name = "code") String code, HttpServletResponse response) throws IOException {

        System.out.println("1");
        SocialLoginType socialLoginType = SocialLoginType.valueOf(socialLoginPath.toUpperCase());
        GetSocialOAuthRes a = oAuthService.oAuthLogin(socialLoginType, code);
        System.out.println("2");
        if(a.getTokenDto()==null){
            System.out.println("3");
            ResponseGoogleSignupType responseGoogleSignupType = ResponseGoogleSignupType
                    .builder()
                    .type("signup")
                    .memberId(a.getMemberId())
                    .email(a.getEmail())
                    .name(a.getName())
                    .build();
            return new ResponseEntity<>(responseGoogleSignupType, HttpStatus.OK);
        }
        System.out.println("4");
        HttpHeaders headers = new HttpHeaders();
        headers.set("accesstoken", a.getTokenDto().getAccesstoken());
        headers.set("refreshtoken", a.getTokenDto().getRefreshtoken());
        ResponseGoogleLoginType responseGoogleLoginType = ResponseGoogleLoginType.builder().type(a.getType()).build();
        System.out.println(responseGoogleLoginType.getType()+"기현++++++++++++++++++++");
        return new ResponseEntity<>(responseGoogleLoginType, headers, HttpStatus.OK);
    }

    @PostMapping("/google")
    public ResponseEntity<Void> googleSignup(@RequestBody RequestSignupDto requestDto) {
        LOGGER.info("[signup] 소셜 회원가입 controller 들어옴");
        memberService.signup(requestDto);
        LOGGER.info("[signup] 소셜 회원가입 controller 나감");
        return new ResponseEntity(HttpStatus.OK);
    }
}

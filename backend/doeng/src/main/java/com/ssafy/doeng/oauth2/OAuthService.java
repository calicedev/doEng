package com.ssafy.doeng.oauth2;

import com.ssafy.doeng.data.dto.member.TokenDto;
import com.ssafy.doeng.data.dto.member.request.RequestMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestSignupDto;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.repository.member.MemberRepository;
import com.ssafy.doeng.errors.code.MemberErrorCode;
import com.ssafy.doeng.errors.exception.ErrorException;
import com.ssafy.doeng.jwt.TokenProvider;
import com.ssafy.doeng.util.RedisUtil;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuthService {
    private final GoogleOauth googleOauth;
    private final HttpServletResponse response;
    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RedisUtil redisUtil;
    public String  request(SocialLoginType socialLoginType) throws IOException {
        String redirectURL;
        switch (socialLoginType) {
            case GOOGLE: {
                //각 소셜 로그인을 요청하면 소셜로그인 페이지로 리다이렉트 해주는 프로세스이다.
                redirectURL = googleOauth.getOauthRedirectURL();
            }
            break;
            default: {
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다아.");
            }
        }
        return redirectURL;
    }

    public GetSocialOAuthRes oAuthLogin(SocialLoginType socialLoginType, String code) throws IOException {

        switch (socialLoginType) {
            case GOOGLE: {
                //구글로 일회성 코드를 보내 액세스 토큰이 담긴 응답객체를 받아옴
                ResponseEntity<String> accessTokenResponse = googleOauth.requestAccessToken(code);
                //응답 객체가 JSON형식으로 되어 있으므로, 이를 deserialization해서 자바 객체에 담을 것이다.
                GoogleOAuthToken oAuthToken = googleOauth.getAccessToken(accessTokenResponse);
                if(oAuthToken != null){
                    //액세스 토큰을 다시 구글로 보내 구글에 저장된 사용자 정보가 담긴 응답 객체를 받아온다.
                    ResponseEntity<String> userInfoResponse = googleOauth.requestUserInfo(oAuthToken);
                    //다시 JSON 형식의 응답 객체를 자바 객체로 역직렬화한다.
                    GoogleUser googleUser = googleOauth.getUserInfo(userInfoResponse);
                    //우리 서버의 db와 대조하여 해당 user가 존재하는 지 확인한다.
                    String memberId = googleUser.getId();

                    try {
                        Optional<Member> memberOrigin = memberRepository.findByMemberId(memberId);

                            Member member = memberOrigin.get();
                            RequestMemberDto requestDto = RequestMemberDto.builder() // 빌더어노테이션으로 생성된 빌더클래스 생성자
                                    .memberId(member.getMemberId())
                                    .password("")
                                    .build();
                            UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
                            // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
                            //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
                            //    customeruservice에서 처리함.
                            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
                            // 3. 인증 정보를 기반으로 JWT 토큰 생성
                            TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
                            // 4. 토큰 담아서 보내고 redis애 저장
                            redisUtil.setDataExpire("token_"+member.getId(), tokenDto.getRefreshtoken(),60 * 60 * 24 * 7 * 1000);
                            return new GetSocialOAuthRes(memberId,null, null, tokenDto, "login");


                    } catch (Exception e){
                        //e.printStackTrace();
                        return new GetSocialOAuthRes(memberId, googleUser.getName(),
                                googleUser.email, null, "signup");

                    }
                }else {
                    System.out.println("Invalid ID token.");
                }

            }
            default: {
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다이.");
            }
        }
    }




}

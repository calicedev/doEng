package com.ssafy.doeng.service.member.Impl;

import com.ssafy.doeng.data.dto.member.TokenDto;
import com.ssafy.doeng.data.dto.member.request.RequestEmailDto;
import com.ssafy.doeng.data.dto.member.request.RequestEmailValidateDto;
import com.ssafy.doeng.data.dto.member.request.RequestMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestModifyMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestSignupDto;
import com.ssafy.doeng.data.dto.member.request.RequestTokenDto;
import com.ssafy.doeng.data.dto.member.response.ResponseMailDto;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.repository.member.MemberRepository;
import com.ssafy.doeng.errors.code.MemberErrorCode;
import com.ssafy.doeng.errors.exception.ErrorException;
import com.ssafy.doeng.jwt.TokenProvider;
import com.ssafy.doeng.service.member.MemberService;
import com.ssafy.doeng.service.review.impl.ReviewServiceImpl;
import com.ssafy.doeng.util.RedisUtil;
import com.ssafy.doeng.util.SecurityUtil;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberServiceImpl implements MemberService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReviewServiceImpl.class);

    private final RedisTemplate<String, String> redisTemplate;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RedisUtil redisUtil;
    @Autowired
    private JavaMailSender mailSender;
    private static final String FROM_ADDRESS = "calicedev@naver.com";


    @Transactional
    public void signup(RequestSignupDto requestDto) {
        LOGGER.error("[회원가입 service 들어옴]");
        if (memberRepository.existsByMemberId(requestDto.getMemberId())) {
            throw new ErrorException(MemberErrorCode.MEMBER_DUPLICATE);
        }
        // dto에서 모든 정보를 가져 오는 것을 담당한다.
        Member member = requestDto.toMember(passwordEncoder);
        memberRepository.save(member);
    }

    @Transactional
    public TokenDto login(RequestMemberDto requestDto) {
        LOGGER.info("[로그인 service 들어옴]");

        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        //    customeruservice에서 처리함.
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 4. RefreshToken Redis에 저장
        redisTemplate.opsForValue().set(
                "token_"+authentication.getName(),
                tokenDto.getRefreshToken()
        );
        // 5. 토큰 발급
        return tokenDto;
    }

    @Transactional
    public TokenDto reissue(RequestTokenDto requestDto) {
        LOGGER.info("[accessToken 재발급 들어옴]");

        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(requestDto.getRefreshToken())) {
            throw new ErrorException(MemberErrorCode.REFRESHTOKEN_NOTVALIDATE);
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(requestDto.getAccessToken());

        String rt = redisTemplate.opsForValue().get("token_"+authentication.getName());
        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        if(rt==null || rt==""){
            throw new RuntimeException("로그아웃 된 사용자입니다.");
        }

        // 4. Refresh Token 일치하는지 검사
        if (!rt.equals(requestDto.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6.  정보 업데이트
        redisTemplate.opsForValue().set(
                "token_"+authentication.getName(),
                tokenDto.getRefreshToken()
        );

        // 토큰 발급
        return tokenDto;
    }

    @Transactional
    public void logout(Long id) {
        LOGGER.info("회원 로그아웃 서비스");
        Optional<Member> member = memberRepository.findById(id);
        String memberId = member.get().getMemberId();
        // 3. Redis 에서 해당 User email 로 저장된 Refresh Token 이 있는지 여부를 확인 후 있을 경우 삭제합니다.
        if (redisTemplate.opsForValue().get("token_"+memberId) != null) {
            // Refresh Token 삭제
            redisTemplate.delete(memberId);
        }
    }


    @Transactional(readOnly = true)
    public Member getMemberInfo(Long id) {
        LOGGER.info("회원 정보 서비스 들어옴");
        Optional<Member> member = memberRepository.findById(id);
        return member.get();
    }

    @Transactional
    public void modifyMemberInfo(RequestModifyMemberDto requestDto) {
        LOGGER.info("회원 정보 수정 서비스 들어옴");
        Optional<Member> tMember = memberRepository.findByMemberId(SecurityUtil.getCurrentId());
        Member member = tMember.get();
        if(requestDto.getNickname()!=null || requestDto.getNickname()!=""){
            member.setNickname(requestDto.getNickname());
        } else if(requestDto.getName()!=null || requestDto.getName()!=""){
            member.setName(requestDto.getName());
        }
        memberRepository.save(member);
    }

    @Override
    public void MemberWithdrawal() {
        LOGGER.info("회원 탈퇴 서비스 들어옴");
        Optional<Member> member = memberRepository.findByMemberId(SecurityUtil.getCurrentId());
        member.ifPresent(memberRepository::delete);
    }

    @Override
    public boolean checkMemberId(String memberId) {
        LOGGER.info("아이디 중복 확인 서비스 들어옴");
        return memberRepository.existsByMemberId(memberId);
    }

    @Override
    public boolean checkNickname(String nickname) {
        LOGGER.info("닉네임 중복 확인 드렁옴");
        return memberRepository.existsByNickname(nickname);
    }

    public String getLoginMemberEmail() {
        Optional<Member> tMember = memberRepository.findByMemberId(SecurityUtil.getCurrentId());
        Member member = tMember.get();
        return member.getMemberId();
    }

    public void checkEmailSend(RequestEmailDto requestDto) {
        // 1. 이메일이랑 아이디가 맞는 계정인지 확인하는 과정
        String email = memberRepository.findEmailByMemberId(requestDto.getMemberId());
        if(!email.equals(requestDto.getEmail())){
            throw new ErrorException(MemberErrorCode.MEMBER_DUPLICATE);
        }
        // 2. 맞으면
        String str = getCode();
        ResponseMailDto responseMailDto = new ResponseMailDto();
        responseMailDto.setAddress(requestDto.getEmail());
        responseMailDto.setTitle(requestDto.getMemberId()+"님의 인증코드 안내 이메일 입니다.");
        responseMailDto.setMessage("안녕하세요. 인증코드 이메일 입니다." + "[" + requestDto.getMemberId() + "]" +"님의 인증번호는 "
                + str + " 입니다.");

        // 3. 인증번호 redis에 저장하기
        redisUtil.setDataExpire("emailAuth_"+requestDto.getEmail(),
                str,60 * 1L);
        // 4. 이메일 보내기
        mailSend(responseMailDto);

        System.out.println("여기까지 들어왔음");
    }

    @Override
    public String checkEmailConfirm(RequestEmailValidateDto requestDto) {
        String code = requestDto.getConfirmCode();
        String redisCode = redisTemplate.opsForValue().get("emailAuth_"+requestDto.getEmail());
        if( redisCode!= null && redisCode.equals(code)){
            return "match";
        }else{return "mismatch";}
    }

    public String getCode() {
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
                'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    public void mailSend(ResponseMailDto responseMailDto){
        System.out.println("이멜 전송 완료!");
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(responseMailDto.getAddress());
        message.setFrom(MemberServiceImpl.FROM_ADDRESS);
        message.setSubject(responseMailDto.getTitle());
        message.setText(responseMailDto.getMessage());

        mailSender.send(message);
    }

//
//    public void checkMemberId(String memberId) {
//        LOGGER.info("[checkMemberIdDuplicate] 회원 memberId 중복 검사 시작");
//        if (memberRepository.existsByMemberId(memberId)) {
//            throw new ErrorException(MemberErrorCode.MEMBERID_EXIST);
//        }
//        LOGGER.info("[checkMemberIdDuplicate] 회원 memberId 중복 검사 완료");
//    }
//
//    @Override
//    public void checkNickname(String nickname) {
//        LOGGER.info("[checkMemberIdDuplicate] 회원 memberId 중복 검사 시작");
//        if (memberRepository.existsByNickname(nickname)) {
//            throw new ErrorException(MemberErrorCode.MEMBERID_EXIST);
//        }
//        LOGGER.info("[checkMemberIdDuplicate] 회원 memberId 중복 검사 완료");
//    }




}
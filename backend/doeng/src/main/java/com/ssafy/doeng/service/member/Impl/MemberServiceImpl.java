package com.ssafy.doeng.service.member.Impl;

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
import org.springframework.util.ObjectUtils;

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
        LOGGER.error("[signup] 회원가입 service 들어옴");
        if (memberRepository.existsByMemberId(requestDto.getMemberId())) {
            throw new ErrorException(MemberErrorCode.MEMBER_DUPLICATE);
        }
        // dto에서 모든 정보를 가져 오는 것을 담당한다.
        Member member = requestDto.toMember(passwordEncoder);
        memberRepository.save(member);
        LOGGER.error("[signup]  회원가입 service 나감");
    }


    @Transactional
    public TokenDto login(RequestMemberDto requestDto) {
        LOGGER.info("[login] 로그인 service 들어옴");
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        //    customeruservice에서 처리함.
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
        //3-1. 받아온 memberId로 pk id 조회
        Long id = memberRepository.findIdByMemberId(authentication.getName());
        // 4. RefreshToken Redis에 저장 24시간
        ;
        redisUtil.setDataExpire("token_"+id, tokenDto.getRefreshtoken(),60 * 60 * 24 * 7 * 1000);
        // 5. 토큰 발급
        LOGGER.info("[login] 로그인 service 나감");
        return tokenDto;
    }

    @Transactional
    public TokenDto reissue(RequestTokenDto requestDto) {
        LOGGER.info("[reissue] accessToken 재발급 들어옴");

        // 1. Refresh Token이 유효하지 않다고 돌려보냄.
        if (!tokenProvider.validateToken(requestDto.getRefreshtoken())) {
            throw new ErrorException(MemberErrorCode.REFRESHTOKEN_NOTVALIDATE);
        }

        // 2. Access Token 에서 memberId 가져오기
        // 이때 accesstoken이 조작되었으면 getAuthentication 단계에서 throw 던저버린다.
        Authentication authentication = tokenProvider.getAuthentication(requestDto.getAccesstoken());

        // 2-1. memberId로 id 조회하기
        String rt = redisTemplate.opsForValue().get("token_"+memberRepository.findIdByMemberId(authentication.getName()));

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        if(ObjectUtils.isEmpty(rt)){
            throw new ErrorException(MemberErrorCode.REFRESHTOKEN_BADREQUEST);
        }

        // 4. Refresh Token 일치하는지 검사
        if (!rt.equals(requestDto.getRefreshtoken())) {
            throw new ErrorException(MemberErrorCode.NOMATCH_TOKEN);
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6.  정보 업데이트
        redisTemplate.opsForValue().set(
                "token_"+authentication.getName(),
                tokenDto.getRefreshtoken()
        );

        LOGGER.info("[reissue] accessToken 재발급 나감");
        // 토큰 발급
        return tokenDto;
    }

    @Transactional
    public void logout(Long id) {
        LOGGER.info("[logout] 로그아웃 들어옴");
        // 3. Redis 에서 해당 아이디로 저장된 Refresh Token 이 있는지 여부를 확인 후 있을 경우 삭제합니다.
        if (redisTemplate.opsForValue().get("token_"+id) != null) {
            // Refresh Token 삭제
            redisTemplate.delete("token_"+id);
        }
        LOGGER.info("[logout] 로그아웃 나감");
    }


    @Transactional(readOnly = true)
    public Member getMemberInfo(Long id) {
        LOGGER.info("[getMemberInfo] 회원 정보 서비스 들어옴");
        Optional<Member> member = memberRepository.findById(id);
        LOGGER.info("[getMemberInfo] 회원 정보 서비스 나감");
        return member.get();
    }

    @Transactional
    public void modifyMemberInfo(RequestModifyMemberDto requestDto) {
        LOGGER.info("[modifyMemberInfo] 회원 정보 수정 서비스 들어옴");
        LOGGER.info(requestDto.getName());
        LOGGER.info(requestDto.getNickname());

        Optional<Member> tMember = memberRepository.findByMemberId(SecurityUtil.getCurrentId());
        Member member = tMember.get();
        if(requestDto.getNickname()!=null || requestDto.getNickname()!=""){
            member.setNickname(requestDto.getNickname());
        }
        if(requestDto.getName()!=null || requestDto.getName()!=""){
            member.setName(requestDto.getName());
        }
        memberRepository.save(member);
        LOGGER.info("[modifyMemberInfo] 회원 정보 수정 서비스 나감");
    }

    @Override
    public void MemberWithdrawal() {
        LOGGER.info("[MemberWithdrawal] 회원 탈퇴 서비스 들어옴");
        Optional<Member> member = memberRepository.findByMemberId(SecurityUtil.getCurrentId());
        member.ifPresent(memberRepository::delete);
        LOGGER.info("[MemberWithdrawal] 회원 탈퇴 서비스 나감");
    }

    @Override
    public boolean checkMemberId(String memberId) {
        LOGGER.info("[checkMemberId] 아이디 중복 확인 서비스 들어옴");
        boolean result = memberRepository.existsByMemberId(memberId);
        LOGGER.info("[checkMemberId] 아이디 중복 확인 서비스 나감");
        return result;
    }

    @Override
    public boolean checkNickname(String nickname) {
        LOGGER.info("[checkNickname] 닉네임 중복 확인 드렁옴");
        boolean result = memberRepository.existsByNickname(nickname);
        LOGGER.info("[checkNickname] 닉네임 중복 확인 나감");
        return result;
    }


    public void checkEmailSend(RequestEmailDto requestDto) {
        LOGGER.info("[checkEmailSend] 비밀번호 이메일 인증 들어옴");
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
                str,60 * 5L);
        // 4. 이메일 보내기
        mailSend(responseMailDto);

        LOGGER.info("[checkEmailSend] 비밀번호 이메일 인증 나감");
    }


    public void checkSignUpEmailSend(RequestSignupEmailDto requestDto) {
        LOGGER.info("[checkSignUpEmailSend] 회원가입 이메일 인증 들어옴");
        // 2. 맞으면
        String str = getCode();
        ResponseMailDto responseMailDto = new ResponseMailDto();
        responseMailDto.setAddress(requestDto.getEmail());
        responseMailDto.setTitle("인증코드 안내 이메일 입니다.");
        responseMailDto.setMessage("안녕하세요. 인증코드 이메일 입니다."  +"당신의 인증번호는 " + str + " 입니다.");

        // 3. 인증번호 redis에 저장하기
        redisUtil.setDataExpire("emailAuth_"+requestDto.getEmail(),
                str,60 * 5L);
        // 4. 이메일 보내기
        mailSend(responseMailDto);
        LOGGER.info("[checkSignUpEmailSend] 회원가입 이메일 인증 나감");
    }

    @Override
    public boolean checkPhone(String phone) {
        LOGGER.info("[checkPhone] 핸드폰 중복 확인 드렁옴");
        boolean result = memberRepository.existsByPhone(phone);
        LOGGER.info("[checkPhone] 핸드폰 중복 확인 나감");
        return result;

    }

    @Override
    public String checkEmailConfirm(RequestEmailValidateDto requestDto) {
        LOGGER.info("[checkEmailConfirm] 이메일 인증 확인 들어옴");
        String code = requestDto.getConfirmCode();
        String redisCode = redisTemplate.opsForValue().get("emailAuth_"+requestDto.getEmail());
        LOGGER.info("[checkEmailConfirm] 이메일 인증 확인 나가는 중");
        if( redisCode!= null && redisCode.equals(code)){
            return "match";
        }else{return "mismatch";}

    }

    @Override
    public String checkPassword(Long id, RequestCheckPasswordDto requestDto) {
        LOGGER.info("[checkPassword] 마이페이지 들어가기 전에 비밀번호 체크 들어옴");
        String pwd = memberRepository.findPasswordById(id);
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        LOGGER.info("[checkPassword] 마이페이지 들어가기 전에 비밀번호 체크 나가는 중");
        if(passwordEncoder.matches(requestDto.getPassword(), pwd)){
            return "success";
        }else{ return "fail"; }

    }

    @Override
    public void resetMemberPassword(RequestResetMemberPasswordDto requestDto) {
        LOGGER.info("[resetMemberPassword] 리셋 비밀번호 들어옴");
        Optional<Member> oMember = memberRepository.findByMemberId(requestDto.getMemberId());
        if(oMember.isPresent()) {
            Member member = oMember.get();
            member.setPassword(passwordEncoder.encode(requestDto.getPassword()));
            memberRepository.save(member);
        }
        LOGGER.info("[resetMemberPassword] 리셋 비밀번호 나감");
    }

    @Override
    public void modifyMemberPassword(Long id, RequestModifyMemberPasswordDto requestDto) {
        LOGGER.info("[resetMemberPassword] 수정 비밀번호 들어옴");
        Optional<Member> oMember = memberRepository.findById(id);
        if(oMember.isPresent() && passwordEncoder.matches(requestDto.getOldPassword(), oMember.get().getPassword())) {
            Member member = oMember.get();
            member.setPassword(passwordEncoder.encode(requestDto.getNewPassword()));
            memberRepository.save(member);
        }else{
            throw new ErrorException(MemberErrorCode.MEMBER_WRONG_PASSWORD);
        }
        LOGGER.info("[resetMemberPassword] 수정 비밀번호 나감");
    }

    @Override
    public boolean checkEmail(String email) {
        LOGGER.info("[checkEmail] 이메일 중복 확인 드렁옴");
        boolean result = memberRepository.existsByEmail(email);
        LOGGER.info("[checkEmail] 이메일 중복 확인 나감");
        return result;
    }

    @Override
    public String findId(RequestFindIdDto requestDto) {
        LOGGER.info("[findId] 아이디 찾기 확인 드렁옴");
        String result = memberRepository.findMemberIdByEmail(requestDto.getEmail());
        LOGGER.info("[findId] 아이디 찾기 확인 나감");
        return result;
    }

    public String getCode() {
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    public void mailSend(ResponseMailDto responseMailDto){
        LOGGER.info("[mailSend] 이메일 전송 서비스 들어옴");
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(responseMailDto.getAddress());
        message.setFrom(MemberServiceImpl.FROM_ADDRESS);
        message.setSubject(responseMailDto.getTitle());
        message.setText(responseMailDto.getMessage());

        mailSender.send(message);

        LOGGER.info("[mailSend] 이메일 전송 서비스 나감");
    }


}

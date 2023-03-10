package com.ssafy.doeng.service.member.Impl;

import com.ssafy.doeng.data.dto.member.TokenDto;
import com.ssafy.doeng.data.dto.member.request.RequestMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestModifyMemberDto;
import com.ssafy.doeng.data.dto.member.request.RequestSignupDto;
import com.ssafy.doeng.data.dto.member.request.RequestTokenDto;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.member.RefreshToken;
import com.ssafy.doeng.data.repository.member.AuthRepository;
import com.ssafy.doeng.data.repository.member.MemberRepository;
import com.ssafy.doeng.data.repository.member.RefreshTokenRepository;
import com.ssafy.doeng.jwt.TokenProvider;
import com.ssafy.doeng.service.member.MemberService;
import com.ssafy.doeng.service.review.impl.ReviewServiceImpl;
import com.ssafy.doeng.util.SecurityUtil;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AuthRepository authRepository;

    @Transactional
    public void signup(RequestSignupDto requestDto) {
        LOGGER.error("[회원가입 service 들어옴]");
        if (memberRepository.existsByMemberId(requestDto.getMemberId())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
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
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();
        refreshTokenRepository.save(refreshToken);
        // 5. 토큰 발급
        return tokenDto;
    }

    @Transactional
    public TokenDto reissue(RequestTokenDto requestDto) {
        LOGGER.info("[accessToken 재발급 들어옴]");

        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(requestDto.getRefreshToken())) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(requestDto.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. Refresh Token 일치하는지 검사
        if (!refreshToken.getValue().equals(requestDto.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // 토큰 발급
        return tokenDto;
    }

    @Transactional
    public void logout() {
        LOGGER.info("회원 로그아웃 서비스");
        Optional<Member> member = memberRepository.findByMemberId(SecurityUtil.getCurrentId());
        member.ifPresent(selectMember -> {
            authRepository.deleteByKey(selectMember.getMemberId());
        });
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
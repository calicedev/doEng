package com.ssafy.doeng.data.dto.member.request;

import com.ssafy.doeng.data.entity.member.Authority;
import com.ssafy.doeng.data.entity.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RequestSignupDto {

    private String memberId;
    private String password;
    private String name;
    private String nickname;
    private String email;
    private String phone;


    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .memberId(memberId)
                .password(passwordEncoder.encode(password))
                .name(name)
                .nickname(nickname)
                .email(email)
                .phone(phone)
                .authority(Authority.ROLE_USER)
                .build();
    }

}
package com.ssafy.doeng.data.dto.member.response;

import com.ssafy.doeng.data.entity.BaseEntity;
import com.ssafy.doeng.data.entity.member.Member;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseMemberDto  {
    private String memberId;
    private String nickname;
    private String name;
    private String email;
    private String phone;
    private LocalDateTime createdAt;

    public static ResponseMemberDto of(Member member) {
        return new ResponseMemberDto(member.getMemberId(), member.getNickname(), member.getName(), member.getEmail(), member.getPhone(), member.getCreatedAt());
    }
}

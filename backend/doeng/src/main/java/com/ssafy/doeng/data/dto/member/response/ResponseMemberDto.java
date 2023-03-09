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

    public static ResponseMemberDto of(Member member) {
        return new ResponseMemberDto(member.getMemberId());
    }
}

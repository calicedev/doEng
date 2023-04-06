package com.ssafy.doeng.data.dto.member.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RequestModifyMemberDto {
    private String nickname;
    private String name;
    private String email;
    private String phone;

}

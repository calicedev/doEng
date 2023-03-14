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
public class RequestEmailDto {
    private String memberId;
    private String email;


}

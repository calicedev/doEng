package com.ssafy.doeng.data.dto.member.response;

import com.ssafy.doeng.data.entity.BaseEntity;
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
    private String password;
    private String nickname;
    private String name;
    private String email;
    private String phone;
    private LocalDateTime createdAt;
}

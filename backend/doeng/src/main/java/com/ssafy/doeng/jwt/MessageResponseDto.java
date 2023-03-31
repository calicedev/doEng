package com.ssafy.doeng.jwt;

import com.ssafy.doeng.data.entity.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MessageResponseDto  {

    private boolean success;
    private String error;
    private String message;


}

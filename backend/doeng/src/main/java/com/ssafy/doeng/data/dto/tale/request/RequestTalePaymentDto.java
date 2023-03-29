package com.ssafy.doeng.data.dto.tale.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RequestTalePaymentDto {
    private long memberId;
    private long taleId;
    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
}

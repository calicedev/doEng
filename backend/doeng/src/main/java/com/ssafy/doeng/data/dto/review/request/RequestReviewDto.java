package com.ssafy.doeng.data.dto.review.request;

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
public class RequestReviewDto {

    private long memberId;
    private long taleId;
    private int score;
    private String content;
    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
    public void setTaleId(long taleId) { this.taleId = taleId; }
}

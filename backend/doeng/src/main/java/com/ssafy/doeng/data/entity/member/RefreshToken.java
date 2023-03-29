package com.ssafy.doeng.data.entity.member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Setter
@NoArgsConstructor
@RedisHash(value = "RefreshToken", timeToLive = 60)
public class RefreshToken {

    @Id
    private Long id;
    private String refreshtoken;

    @Builder
    public RefreshToken(Long id, String refreshtoken) {
        this.id = id;
        this.refreshtoken = refreshtoken;
    }

    public RefreshToken updateValue(String token) {
        this.refreshtoken = token;
        return this;
    }

    public static RefreshToken createRefreshToken(Long id, String refreshtoken) {
        return RefreshToken.builder()
                .id(id)
                .refreshtoken(refreshtoken)
                .build();
    }
}
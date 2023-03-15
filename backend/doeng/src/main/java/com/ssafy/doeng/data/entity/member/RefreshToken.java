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
    private String refreshToken;

    @Builder
    public RefreshToken(Long id, String refreshToken) {
        this.id = id;
        this.refreshToken = refreshToken;
    }

    public RefreshToken updateValue(String token) {
        this.refreshToken = token;
        return this;
    }

    public static RefreshToken createRefreshToken(Long id, String refreshToken) {
        return RefreshToken.builder()
                .id(id)
                .refreshToken(refreshToken)
                .build();
    }
}
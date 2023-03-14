package com.ssafy.doeng.data.repository.member;

import com.ssafy.doeng.data.entity.member.RefreshToken;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface AuthRepository extends CrudRepository<RefreshToken, String> {
    void deleteByKey(String key);
    Optional<RefreshToken> findByMemberId(String memberId);
}

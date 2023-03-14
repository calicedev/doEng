package com.ssafy.doeng.data.repository.member;

import com.ssafy.doeng.data.entity.member.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberId(String memberId);
    boolean existsByMemberId(String memberId);

    boolean existsByNickname(String nickname);

    Optional<Member> findById(Long id);

    @Query("select m.email from Member m where m.memberId=:memberId")
    String findEmailByMemberId(@Param("memberId") String memberId);

}


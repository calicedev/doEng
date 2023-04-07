package com.ssafy.doeng.data.repository.member;

import com.ssafy.doeng.data.entity.member.Member;
import java.util.Collection;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
    @Query("select m.password from Member m where m.id=:id")
    String findPasswordById(@Param("id")Long id);

    boolean existsByEmail(String email);

    @Query("select m.memberId from Member m where m.email=:email")
    String findMemberIdByEmail(@Param("email")String email);
    @Query("select m.id from Member m where m.memberId=:memberId")
    Long findIdByMemberId(String memberId);

    boolean existsByPhone(String phone);

    Optional<Member> findByEmail(String username);

    @Modifying
    @Query("delete from MemberHasWord mw where mw.member.id = :id")
    void deleteMemberHasWordByMemberId(@Param("id") Long id);
    @Modifying
    @Query("delete from Payment p where p.member.id = :id")
    void deletePaymentByMemberId(@Param("id") Long id);
    @Modifying
    @Query("delete from Progress p where p.member.id = :id")
    void deleteProgressByMemberId(@Param("id") Long id);
    @Modifying
    @Query("delete from Review r where r.member.id = :id")
    void deleteReviewByMemberId(@Param("id") Long id);
    @Modifying
    @Query("delete from Test t where t.member.id = :id")
    void deleteTestByMemberId(@Param("id") Long id);
}


package com.ssafy.doeng.data.repository.test;

import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.entity.test.Test;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface TestRepository extends JpaRepository<Test, Long> {

    @Query("select t.testCount from Test t "
            + "where t.tale=:tale "
            + "and t.member = :member")
    List<Integer> getTestCountByTaleAndMember(@Param("tale") Tale tale,
            @Param("member") Member member);

    List<Test> findByTaleAndMember(Tale tale, Member member);

    @Query("select distinct t from Test t "
            + "join fetch Word w "
            + "on t.word = w "
            + "join fetch Scene s "
            + "on s.word = w "
            + "where t.tale=:tale "
            + "and t.member=:member "
            + "order by s.sceneOrder asc, t.testCount asc")
    List<Test> findByTaleAndMemberFetchWord(@Param("tale") Tale tale,
            @Param("member") Member member);
}

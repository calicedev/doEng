package com.ssafy.doeng.data.repository.word;

import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.entity.word.Word;
import java.util.List;
import java.util.Set;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

public interface WordRepository extends JpaRepository<Word, Long> {

    @Query("select w.id from Word w "
            + "join MemberHasWord mhw "
            + "on mhw.word=w "
            + "where mhw.member.id=:memberId "
            + "and mhw.tale.id=:taleId")
    Set<Long> findByMemberIdAndTaleId(@Param("memberId") long memberId, @Param("taleId") long taleId);

    @Query("select w from Scene s "
            + "join Word w "
            + "on s.word=w "
            + "where s.tale=:tale "
            + "order by s.sceneOrder")
    List<Word> findTaleWordsByTale(@Param("tale") Tale tale);


    @Query("select distinct w from MemberHasWord mhw "
            + "join mhw.word w "
            + "join mhw.member m "
            + "where m=:member")
    List<Word> findWordByMemberIdDistinct(@Param("member") Member member);

    @Query("SELECT w FROM Word w "
            + "where w not in :found "
            + "ORDER BY RAND() ")
    List<Word> findWordByRandomNotAnswer(@Param("found") List<Word> testWordList,
            Pageable page);

    List<Word> findWordByIdIn(List<Long> wordIn);
}

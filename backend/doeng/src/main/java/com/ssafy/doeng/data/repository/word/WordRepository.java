package com.ssafy.doeng.data.repository.word;

import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.entity.word.Word;
import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
}

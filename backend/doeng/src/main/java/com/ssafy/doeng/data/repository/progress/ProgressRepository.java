package com.ssafy.doeng.data.repository.progress;

import com.ssafy.doeng.data.entity.progress.Progress;
import com.ssafy.doeng.data.entity.tale.Tale;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProgressRepository extends JpaRepository<Progress, Long> {
    @Query("select p from Progress p "
            + "left join fetch Scene s on s.id = p.scene.id "
            + "left join fetch Picture pic on pic.progress.id = p.id "
            + "where p.member.id = :memberId "
            + "and s.tale.id = :taleId")
    List<Progress> getProgressDetailsByMember(@Param("memberId") long memberId, @Param("taleId") long taleId);

    @Query("select s.sceneOrder from Scene s "
            + "left join fetch Tale t on s.tale.id = t.id "
            + "left join fetch Progress p on p.scene.id = s.id "
            + "where p.member.id = :memberId "
            + "and s.tale.id = :taleId")
    List<Integer> findProgressByMemberAndTale(@Param("memberId") long memberId, @Param("taleId") long taleId);

}

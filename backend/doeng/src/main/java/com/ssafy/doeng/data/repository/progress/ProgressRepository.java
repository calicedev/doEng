package com.ssafy.doeng.data.repository.progress;

import com.ssafy.doeng.data.entity.progress.Progress;
import java.util.List;
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


}

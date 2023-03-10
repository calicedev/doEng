package com.ssafy.doeng.data.repository.scene;

import com.ssafy.doeng.data.entity.progress.Progress;
import com.ssafy.doeng.data.entity.scene.Scene;
import com.ssafy.doeng.data.entity.tale.Tale;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SceneRepository extends JpaRepository<Scene, Long> {

    List<Scene> findByTale(Tale tale);

    @Query("select distinct s from Scene s "
            + "left join fetch Progress p on s.id = p.scene.id "
            + "left join fetch Picture pic on pic.progress.id = p.id "
            + "where p.member.id = :memberId "
            + "and s.tale.id = :taleId")
    List<Scene> getProgressDetailsByMember(@Param("memberId") long memberId, @Param("taleId") long taleId);
    @Query("select s from Scene s "
            + "where s.tale = :tale "
            + "and s.word is not null")
    List<Scene> findDetailByTale(@Param("tale") Tale tale);
}

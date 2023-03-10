package com.ssafy.doeng.data.repository.tale;

import com.ssafy.doeng.data.entity.tale.Tale;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TaleRepository extends JpaRepository<Tale, Long> {

    @Query("select distinct t from Tale t "
            + "left join fetch Scene s on s.tale=t "
            + "where t.id=:taleId")
    Optional<Tale> findByIdFetchScene(@Param("taleId") long taleId);

    @Query("select distinct t from Tale t "
            + "left join fetch Scene s on s.tale=t "
            + "left join fetch Script sc on sc.scene=s "
            + "left join fetch Word w on s.word=w "
            + "where t.id = :taleId "
            + "order by s.sceneOrder asc, sc.scriptOrder asc ")
    Optional<Tale> findByIdFetchSceneListScriptWord(@Param("taleId") long taleId);

    @Query("select distinct t from Tale t "
            + "left join fetch Scene s on s.tale=t "
            + "left join fetch Script sc on sc.scene=s "
            + "left join fetch Word w on s.word=w "
            + "where t.id = :taleId "
            + "and s.sceneOrder=:sceneOrder "
            + "order by s.sceneOrder asc, sc.scriptOrder asc ")
    Optional<Tale> findByIdFetchSceneScriptWord(@Param("taleId") long taleId,
            @Param("sceneOrder") int sceneOrder);
}

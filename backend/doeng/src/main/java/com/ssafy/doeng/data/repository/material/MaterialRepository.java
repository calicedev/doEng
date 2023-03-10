package com.ssafy.doeng.data.repository.material;

import com.ssafy.doeng.data.entity.material.Material;
import com.ssafy.doeng.data.entity.tale.Tale;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MaterialRepository extends JpaRepository<Material, Long> {
    @Query("select m from Material m "
            + "left join fetch TaleHasMaterial thm "
            + "on m = thm.material "
            + "where thm.tale = :tale")
    List<Material> findByTale(@Param("tale") Tale tale);
}

package com.ssafy.doeng.data.repository.tale;

import com.ssafy.doeng.data.entity.tale.Tale;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TaleRepository extends JpaRepository<Tale, Long> {

    @Query("select distinct t from Tale t "
            + "join fetch Scene s on s.tale=t "
            + "where t.id=:taleId")
    Optional<Tale> findByIdFetchScene(@Param("taleId") long taleId);
}

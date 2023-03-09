package com.ssafy.doeng.data.repository.scene;

import com.ssafy.doeng.data.entity.scene.Scene;
import com.ssafy.doeng.data.entity.tale.Tale;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SceneRepository extends JpaRepository<Scene, Long> {

    List<Scene> findByTale(Tale tale);
}

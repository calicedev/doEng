package com.ssafy.doeng.data.repository.picture;

import com.ssafy.doeng.data.entity.picture.Picture;
import com.ssafy.doeng.data.entity.progress.Progress;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PictureRepository extends JpaRepository<Picture, Long> {
    List<Picture> findByProgress(Progress progress);
}

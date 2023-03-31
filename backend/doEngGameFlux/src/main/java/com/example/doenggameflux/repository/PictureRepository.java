package com.example.doenggameflux.repository;

import com.example.doenggameflux.entity.Picture;
import com.example.doenggameflux.entity.Progress;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface PictureRepository extends ReactiveCrudRepository<Picture, Long> {

}

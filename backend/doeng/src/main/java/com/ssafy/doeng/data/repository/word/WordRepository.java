package com.ssafy.doeng.data.repository.word;

import com.ssafy.doeng.data.entity.word.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {

}

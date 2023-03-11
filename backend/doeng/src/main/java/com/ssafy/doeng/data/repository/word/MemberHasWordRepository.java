package com.ssafy.doeng.data.repository.word;

import com.ssafy.doeng.data.entity.MemberHasWord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberHasWordRepository extends JpaRepository<MemberHasWord, Long> {
}

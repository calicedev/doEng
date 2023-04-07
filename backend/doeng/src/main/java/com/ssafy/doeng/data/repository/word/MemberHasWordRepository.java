package com.ssafy.doeng.data.repository.word;

import com.ssafy.doeng.data.dto.word.request.RequestPostGetWord;
import com.ssafy.doeng.data.entity.MemberHasWord;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.word.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberHasWordRepository extends JpaRepository<MemberHasWord, Long> {

    boolean existsByMemberAndWord(Member member, Word word);
}

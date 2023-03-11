package com.ssafy.doeng.service.test.impl;

import com.ssafy.doeng.controller.TaleController;
import com.ssafy.doeng.data.dto.word.request.RequestListPostGetWord;
import com.ssafy.doeng.data.dto.word.request.RequestPostGetWord;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.entity.test.Test;
import com.ssafy.doeng.data.entity.word.Word;
import com.ssafy.doeng.data.repository.test.TestRepository;
import com.ssafy.doeng.data.repository.word.WordRepository;
import com.ssafy.doeng.service.Common;
import com.ssafy.doeng.service.test.TestService;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TestServiceImpl implements TestService {
    private final static Logger LOGGER = LoggerFactory.getLogger(TaleController.class);
    private final Common common;
    private final TestRepository testRepository;
    private final WordRepository wordRepository;

    @Override
    @Transactional
    public void save(RequestListPostGetWord wordList) {
        long memberId = wordList.getMemberId();
        List<RequestPostGetWord> wordTestResultList = wordList.getWordList();

        LOGGER.info("[TestServiceImpl] save memberId : {} size: {}", memberId, wordTestResultList);
        Member member = common.getMember(memberId);
        Tale tale = common.getTale(wordTestResultList.get(0).getTaleId());

        int currentTestCount =
                Collections.max(testRepository.getTestCountByTaleAndMember(tale, member)) + 1;

        List<Test> testList = new ArrayList<>();
        Map<Long, Word> wordMap = makeValidWordMap(wordTestResultList);

        wordList.getWordList().forEach(
                word -> testList.add(Test.builder()
                                .tale(tale)
                                .member(member)
                                .word(wordMap.get(word.getWordId()))
                                .testCount(currentTestCount)
                                .isCorrect(word.isCorrect())
                        .build())
        );

        testRepository.saveAll(testList);
    }

    private Map<Long, Word> makeValidWordMap(List<RequestPostGetWord> wordTestResultList) {
        List<Word> getWordValid = wordRepository.findWordByIdIn(
                wordTestResultList.stream().map(
                        RequestPostGetWord::getWordId).collect(Collectors.toList()));
        Map<Long, Word> wordMap = new HashMap<>();
        getWordValid.forEach(word -> wordMap.put(word.getId(), word));

        return wordMap;
    }
}

package com.ssafy.doeng.service.test.impl;

import com.ssafy.doeng.controller.TaleController;
import com.ssafy.doeng.data.dto.word.request.RequestListPostGetWord;
import com.ssafy.doeng.data.dto.word.request.RequestPostGetWord;
import com.ssafy.doeng.data.dto.word.response.ResponseTestWordResultDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordTestResultDto;
import com.ssafy.doeng.data.entity.MemberHasWord;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.entity.test.Test;
import com.ssafy.doeng.data.entity.word.Word;
import com.ssafy.doeng.data.repository.test.TestRepository;
import com.ssafy.doeng.data.repository.word.MemberHasWordRepository;
import com.ssafy.doeng.data.repository.word.WordRepository;
import com.ssafy.doeng.service.Common;
import com.ssafy.doeng.service.aws.AwsS3Service;
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
    private final MemberHasWordRepository memberHasWordRepository;
    private final AwsS3Service awsS3Service;
    @Override
    @Transactional
    public int save(RequestListPostGetWord wordList) {
        long memberId = wordList.getMemberId();
        List<RequestPostGetWord> wordTestResultList = wordList.getWordList();

        LOGGER.info("[TestServiceImpl] save memberId : {} size: {}", memberId, wordTestResultList);
        Member member = common.getMember(memberId);
        Tale tale = common.getTale(wordTestResultList.get(0).getTaleId());

        List<Integer> testCounts = testRepository.getTestCountByTaleAndMember(tale, member);
        int currentTestCount;
        LOGGER.info("[TestServiceImpl] 테스트 갯수 찾기 testCount : {}", testCounts.size());
        if (!testCounts.isEmpty()) {
            currentTestCount =
                    Collections.max(testRepository.getTestCountByTaleAndMember(tale, member)) + 1;
        } else {
            currentTestCount = 1;
        }
        LOGGER.info("[TestServiceImpl] 테스트 갯수 찾기 종료 currentTestCount : {}", currentTestCount);

        List<Test> testList = new ArrayList<>();
        Map<Long, Word> wordMap = makeValidWordMap(wordTestResultList);

        wordList.getWordList().forEach(
                word -> {
                    if (word.isCorrect() && !memberHasWordRepository.existsByMemberAndWord(
                                                                    member,
                                                                    wordMap.get(word.getWordId()))) {
                        memberHasWordRepository.save(MemberHasWord.builder()
                                .tale(tale)
                                .member(member)
                                .word(wordMap.get(word.getWordId()))
                                .build());
                    }

                    testList.add(Test.builder()
                            .tale(tale)
                            .member(member)
                            .word(wordMap.get(word.getWordId()))
                            .testCount(currentTestCount)
                            .isCorrect(word.isCorrect())
                            .build());
                }
        );

        testRepository.saveAll(testList);
        return currentTestCount;
    }


    private Map<Long, Word> makeValidWordMap(List<RequestPostGetWord> wordTestResultList) {
        List<Word> getWordValid = wordRepository.findWordByIdIn(
                wordTestResultList.stream().map(
                        RequestPostGetWord::getWordId).collect(Collectors.toList()));
        Map<Long, Word> wordMap = new HashMap<>();

        getWordValid.forEach(word -> wordMap.put(word.getId(), word));

        return wordMap;
    }

    @Override
    public ResponseWordTestResultDto getWordTestResult(int count, long taleId, long memberId) {
        Member member = common.getMember(memberId);
        Tale tale = common.getTale(taleId);
        String title = tale.getTitle();
        List<Word> wL = testRepository.getWordByCountTale(count, tale, member);
        List<ResponseTestWordResultDto> responseTestWordResultDto = new ArrayList<>();
        for(Word w : wL){
            ResponseTestWordResultDto r = ResponseTestWordResultDto.builder().id(w.getId()).korWord(w.getKorWord()).engWord(w.getEngWord()).image(awsS3Service.getTemporaryUrl(w.getImage())).build();
            responseTestWordResultDto.add(r);
        }

        ResponseWordTestResultDto responseWordTestResultDto = ResponseWordTestResultDto.builder().title(title).testList(responseTestWordResultDto).build();
        return responseWordTestResultDto;

    }

}

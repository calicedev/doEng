package com.ssafy.doeng.service.word.impl;

import com.ssafy.doeng.controller.TaleController;
import com.ssafy.doeng.data.dto.word.request.RequestWordTestDto;
import com.ssafy.doeng.data.dto.word.response.ResponseTestWordDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordListDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordTestDto;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.tale.Tale;
import com.ssafy.doeng.data.entity.word.Word;
import com.ssafy.doeng.data.repository.tale.TaleRepository;
import com.ssafy.doeng.data.repository.word.WordRepository;
import com.ssafy.doeng.errors.code.PaymentErrorCode;
import com.ssafy.doeng.errors.code.TaleErrorCode;
import com.ssafy.doeng.errors.exception.ErrorException;
import com.ssafy.doeng.service.Common;
import com.ssafy.doeng.service.word.WordService;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class WordServiceImpl implements WordService {

    private final Common common;
    private final WordRepository wordRepository;
    private final static Logger LOGGER = LoggerFactory.getLogger(TaleController.class);
    private final TaleRepository taleRepository;

    @Override
    @Transactional(readOnly = true)
    public ResponseWordListDto getWord(long memberId) {
        LOGGER.info("[WordServiceImpl] getWord memberId : {}", memberId);
        Member member = common.getMember(memberId);
        List<Word> wordList = wordRepository.findWordByMemberIdDistinct(member);
        var responseDto = ResponseWordListDto.builder()
                .wordList(makeWordList(wordList))
                .build();

        LOGGER.info("[WordServiceImpl] getWord 종료");
        return responseDto;
    }


    private List<ResponseWordDto> makeWordList(List<Word> wordList) {
        return wordList.stream().map(
                word -> ResponseWordDto.builder()
                        .id(word.getId())
                        .image(word.getImage())
                        .engWord(word.getEngWord())
                        .korWord(word.getKorWord())
                        .voice(word.getVoice())
                        .build()
        ).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseWordTestDto getWordTest(RequestWordTestDto requestDto) {
        long memberId, taleId;
        memberId = requestDto.getMemberId();
        taleId = requestDto.getTaleId();
        LOGGER.info("[WordServiceImpl] getWordTest memberId : {} taleId : {}", memberId, taleId);

        Member member = common.getMember(memberId);

        Tale tale = taleRepository.findById(taleId).orElseThrow(
                () -> new ErrorException(TaleErrorCode.TALE_NOT_FOUND));

        List<Word> testWordList = wordRepository.findTaleWordsByTale(tale);
        List<Word> wrongWordList = wordRepository.findWordByRandomNotAnswer(testWordList,
                Pageable.ofSize(testWordList.size()));

        LOGGER.info("[WordServiceImpl] getWordTest 문제 생성");
        var responseDto = ResponseWordTestDto.builder()
                .title(tale.getTitle())
                .testList(makeWordTest(testWordList, wrongWordList))
                .build();

        LOGGER.info("[WordServiceImpl] getWordTest 종료");
        return responseDto;
    }

    private List<ResponseTestWordDto> makeWordTest(List<Word> testWordList, List<Word> wrongWordList) {
        List<ResponseTestWordDto> testList = new ArrayList<>();
        for (int i = 0; i < testWordList.size(); i++) {
            Word crtWord = testWordList.get(i);
            testList.add(ResponseTestWordDto.builder()
                            .id(crtWord.getId())
                            .engWord(crtWord.getEngWord())
                            .korWord(crtWord.getKorWord())
                            .voice(crtWord.getVoice())
                            .image(crtWord.getImage())
                            .wrongImage(wrongWordList.get(i).getImage())
                    .build());
        }
        return testList;
    }
}

package com.ssafy.doeng.service.word.impl;

import com.ssafy.doeng.controller.TaleController;
import com.ssafy.doeng.data.dto.word.response.ResponseWordDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordListDto;
import com.ssafy.doeng.data.entity.member.Member;
import com.ssafy.doeng.data.entity.word.Word;
import com.ssafy.doeng.data.repository.word.WordRepository;
import com.ssafy.doeng.service.Common;
import com.ssafy.doeng.service.word.WordService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class WordServiceImpl implements WordService {

    private final Common common;
    private final WordRepository wordRepository;
    private final static Logger LOGGER = LoggerFactory.getLogger(TaleController.class);

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
}

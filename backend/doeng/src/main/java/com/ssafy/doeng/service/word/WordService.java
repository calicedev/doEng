package com.ssafy.doeng.service.word;

import com.ssafy.doeng.data.dto.word.response.ResponseWordListDto;

public interface WordService {

    ResponseWordListDto getWord(long memberId);
}

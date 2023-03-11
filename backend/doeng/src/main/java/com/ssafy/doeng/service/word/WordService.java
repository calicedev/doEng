package com.ssafy.doeng.service.word;

import com.ssafy.doeng.data.dto.word.request.RequestWordTestDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordListDto;
import com.ssafy.doeng.data.dto.word.response.ResponseWordTestDto;

public interface WordService {

    ResponseWordListDto getWord(long memberId);

    ResponseWordTestDto getWordTest(RequestWordTestDto requestDto);
}

package com.ssafy.doeng.service.test;

import com.ssafy.doeng.data.dto.word.request.RequestListPostGetWord;
import com.ssafy.doeng.data.dto.word.response.ResponseWordTestResultDto;

public interface TestService {
    int save(RequestListPostGetWord wordList);

    ResponseWordTestResultDto getWordTestResult(int count, long taleId, long memberId);
}

package com.ssafy.doeng.service.progress;

import com.ssafy.doeng.data.dto.progress.request.RequestPostProgressDto;

public interface ProgressService {

    void save(RequestPostProgressDto requestDto);
}

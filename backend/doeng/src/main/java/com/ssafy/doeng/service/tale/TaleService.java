package com.ssafy.doeng.service.tale;

import com.ssafy.doeng.data.dto.tale.request.RequestTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleListDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseProgressTaleListDto;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface TaleService {

    List<ResponseMainTaleDto> getTaleList(long memberId);

    ResponseMainTaleDetailDto getTaleDetail(RequestTaleDetailDto requestDto);

    ResponseProgressTaleListDto getProgressTaleList(long memberId, Pageable pageable);

    ResponsePaymentTaleListDto getPaymentTaleList(long memberId, Pageable pageable);

    ResponsePaymentTaleDetailDto getPaymentTaleDetail(long memberId, long taleId);
}

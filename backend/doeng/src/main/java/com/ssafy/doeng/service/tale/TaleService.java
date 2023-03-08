package com.ssafy.doeng.service.tale;

import com.ssafy.doeng.data.dto.tale.request.RequestTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDetailDto;
import com.ssafy.doeng.data.dto.tale.response.ResponseMainTaleDto;
import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleListDto;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface TaleService {

    ResponsePaymentTaleListDto getPaymentTaleList(long memberId, Pageable pageable);

    List<ResponseMainTaleDto> getTaleList(long memberId);

    ResponseMainTaleDetailDto getTaleDetail(RequestTaleDetailDto requestDto);
}

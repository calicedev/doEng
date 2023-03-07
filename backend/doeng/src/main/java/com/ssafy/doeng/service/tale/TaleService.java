package com.ssafy.doeng.service.tale;

import com.ssafy.doeng.data.dto.tale.response.ResponsePaymentTaleListDto;
import org.springframework.data.domain.Pageable;

public interface TaleService {

    ResponsePaymentTaleListDto getPaymentTaleList(long memberId, Pageable pageable);
}

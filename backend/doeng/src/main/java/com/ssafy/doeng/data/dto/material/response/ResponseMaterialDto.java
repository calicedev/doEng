package com.ssafy.doeng.data.dto.material.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMaterialDto {
    private long id;
    private String name;
}

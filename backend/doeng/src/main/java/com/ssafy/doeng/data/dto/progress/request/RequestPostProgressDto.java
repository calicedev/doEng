package com.ssafy.doeng.data.dto.progress.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@AllArgsConstructor
@ToString
public class RequestPostProgressDto {

    @NotNull @Min(1)
    private long taleId;
    @NotNull @Min(1)
    private long sceneId;
    private long memberId;
}

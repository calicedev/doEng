package com.ssafy.doeng.data.dto.word.request;


import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RequestPostGetWord {
    @NotNull
    @Min(value = 1,message = "id 값은 1 이상이여야 합니다.")
    private long wordId;
    @NotNull
    @Min(value = 1,message = "id 값은 1 이상이여야 합니다.")
    private long taleId;
    @NotNull
    private boolean correct;
}

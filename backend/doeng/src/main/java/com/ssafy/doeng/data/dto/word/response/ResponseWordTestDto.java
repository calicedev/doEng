package com.ssafy.doeng.data.dto.word.response;


import java.util.List;
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
public class ResponseWordTestDto {
    private String title;
    List<ResponseTestWordDto> testList;
}

package com.ssafy.doeng.data.dto.word.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RequestListPostGetWord {
    private long memberId;
    private List<RequestPostGetWord> wordList;
}

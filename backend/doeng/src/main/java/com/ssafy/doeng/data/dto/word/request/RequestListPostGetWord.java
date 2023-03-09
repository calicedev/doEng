package com.ssafy.doeng.data.dto.word.request;

import com.sun.istack.NotNull;
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
    @NotNull
    private List<RequestPostGetWord> wordList;
}

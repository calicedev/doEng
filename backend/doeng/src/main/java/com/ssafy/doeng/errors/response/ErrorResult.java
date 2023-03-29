package com.ssafy.doeng.errors.response;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class ErrorResult {
    private String code;
    private String message;
}

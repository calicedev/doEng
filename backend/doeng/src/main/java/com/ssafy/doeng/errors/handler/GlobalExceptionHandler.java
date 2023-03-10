package com.ssafy.doeng.errors.handler;

import com.ssafy.doeng.errors.code.CommonErrorCode;
import com.ssafy.doeng.errors.code.ErrorCode;
import com.ssafy.doeng.errors.exception.ErrorException;
import com.ssafy.doeng.errors.response.ErrorResponseService;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private final ErrorResponseService responseService;
    
    @ExceptionHandler(ErrorException.class)
    public ResponseEntity<Object> handleCustomException(final ErrorException e) {
        final ErrorCode errorCode = e.getErrorCode();
        return responseService.handleExceptionInternal(errorCode);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgument(final IllegalArgumentException e) {
        final ErrorCode errorCode = CommonErrorCode.INVALID_PARAMETER;
        return responseService.handleExceptionInternal(errorCode, e.getMessage());
    }

//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<Object> handleMethodValidException(MethodArgumentNotValidException e, HttpServletRequest request){
//        final ErrorCode errorCode = CommonErrorCode.INVALID_PARAMETER;
//        return responseService.handleExceptionInternal(e, errorCode);
////        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
//    }

    @Override
    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<Object> handleMethodArgumentNotValid(
            final MethodArgumentNotValidException e,
            final HttpHeaders headers,
            final HttpStatus status,
            final WebRequest request) {
        final ErrorCode errorCode = CommonErrorCode.INVALID_PARAMETER;
        return responseService.handleExceptionInternal(e, errorCode);
    }

}

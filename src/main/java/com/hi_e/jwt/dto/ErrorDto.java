package com.hi_e.jwt.dto;

import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.FieldError;

import lombok.Getter;

@Getter
public class ErrorDto {
    private final int status;
    private final String message;
    private List<FieldError> fieldErrors = new ArrayList<>();

    public ErrorDto(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public void addFieldError(String objectName, String path, String message) {
        FieldError error = new FieldError(objectName, path, message);
        fieldErrors.add(error);
    }
    
    /* 이건 게터 적용 안되나? */
    public List<FieldError> getFieldErrors() {
        return fieldErrors;
    }
}

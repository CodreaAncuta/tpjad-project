package com.example.springdemo.errorhandler;

import org.springframework.http.HttpStatus;

import java.util.List;

public class IncorrectParameterException extends RuntimeException {

    public static final HttpStatus HTTP_STATUS = HttpStatus.PRECONDITION_FAILED;;
    private static final String MESSAGE = "Incorrect Parameters";
    private final String resource;
    private final List<String> invalidParams;

    public IncorrectParameterException(String resource, List<String> errors) {
        super(MESSAGE);
        this.resource = resource;
        this.invalidParams = errors;
    }

    public List<String> getInvalidParams() {
        return invalidParams;

    }

    public String getResource() {
        return resource;
    }
}
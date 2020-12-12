package com.example.springdemo.errorhandler;

import org.springframework.http.HttpStatus;

import java.util.List;

public class EntityValidationException extends RuntimeException {
    public static final HttpStatus HTTP_STATUS = HttpStatus.UNPROCESSABLE_ENTITY;
    private static final String MESSAGE = "Entity could not be processed !";

    private final String resource;
    private final List<String> validationErrors;

    public EntityValidationException(String resource, List<String> errors) {
        super(MESSAGE);
        this.resource = resource;
        this.validationErrors = errors;
    }

    public List<String> getValidationErrors() {
        return validationErrors;
    }

    public String getResource() {
        return resource;
    }
}
package com.example.springdemo.errorhandler;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends RuntimeException {
    public static final HttpStatus HTTP_STATUS = HttpStatus.NOT_FOUND;
    private final String resourceName;

    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;

    }

    public String getResourceName() {
        return resourceName;
    }
}

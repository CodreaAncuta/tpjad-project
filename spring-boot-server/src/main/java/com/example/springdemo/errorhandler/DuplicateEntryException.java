package com.example.springdemo.errorhandler;


import org.springframework.http.HttpStatus;

public class DuplicateEntryException extends RuntimeException {

    public static final HttpStatus HTTP_STATUS =  HttpStatus.FORBIDDEN;
    private final String resourceName;

    public DuplicateEntryException( String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s  record does not permit duplicates for %s : '%s'", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;

    }

    public String getResourceName() {
        return resourceName;
    }


}

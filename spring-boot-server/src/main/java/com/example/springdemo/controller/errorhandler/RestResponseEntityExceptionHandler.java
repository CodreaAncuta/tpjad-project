package com.example.springdemo.controller.errorhandler;

import com.example.springdemo.errorhandler.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(value = {EntityValidationException.class})
    protected ResponseEntity<Object> handleEntityValidationExceptionConflict(EntityValidationException customEx, WebRequest request) {
        List<String> details= customEx.getValidationErrors();

        ExceptionHandlerResponseDTO exceptionHandlerResponseDTO = new ExceptionHandlerResponseDTO(customEx.getResource(), EntityValidationException.HTTP_STATUS, details, request.getDescription(false));
        return handleExceptionInternal(
                customEx,
                exceptionHandlerResponseDTO,
                new HttpHeaders(),
                EntityValidationException.HTTP_STATUS,
                request
        );
    }

    @ExceptionHandler(value = {ResourceNotFoundException.class})
    protected ResponseEntity<Object> handleResourceNotFound(ResourceNotFoundException customEx, WebRequest request) {
        List<String> details= new ArrayList<>();
        details.add(customEx.getMessage());

        ExceptionHandlerResponseDTO exceptionHandlerResponseDTO = new ExceptionHandlerResponseDTO(customEx.getResourceName(), ResourceNotFoundException.HTTP_STATUS, details, request.getDescription(false));
        return handleExceptionInternal(
                customEx,
                exceptionHandlerResponseDTO,
                new HttpHeaders(),
                ResourceNotFoundException.HTTP_STATUS,
                request
        );
    }


    @ExceptionHandler(value = {IncorrectParameterException.class})
    protected ResponseEntity<Object> handleIncorrectParameterException(IncorrectParameterException customEx, WebRequest request) {
        List<String> details= customEx.getInvalidParams();

        ExceptionHandlerResponseDTO exceptionHandlerResponseDTO = new ExceptionHandlerResponseDTO(customEx.getResource(), IncorrectParameterException.HTTP_STATUS, details, request.getDescription(false));
        return handleExceptionInternal(
                customEx,
                exceptionHandlerResponseDTO,
                new HttpHeaders(),
                IncorrectParameterException.HTTP_STATUS,
                request
        );
    }


    @ExceptionHandler(value = {DuplicateEntryException.class})
    protected ResponseEntity<Object> handleDuplicateEntryException(DuplicateEntryException customEx, WebRequest request) {
        List<String> details= new ArrayList<>();
        details.add(customEx.getMessage());

        ExceptionHandlerResponseDTO exceptionHandlerResponseDTO = new ExceptionHandlerResponseDTO(customEx.getResourceName(), DuplicateEntryException.HTTP_STATUS, details, request.getDescription(false));
        return handleExceptionInternal(
                customEx,
                exceptionHandlerResponseDTO,
                new HttpHeaders(),
                DuplicateEntryException.HTTP_STATUS,
                request
        );
    }
}

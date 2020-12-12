package com.example.springdemo.errorhandler;
import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.List;

public class ExceptionHandlerResponseDTO {

    private Date timestamp;
    private String entity;
    private String requestedUri;
    private List<String> details;
    private int statusCode;
    private String statusMessage;


    public ExceptionHandlerResponseDTO(String entity, HttpStatus status, List<String>  details, String requestedUri) {
        this.timestamp = new Date();
        this.entity = entity;
        this.statusCode = status.value();
        this.statusMessage = status.getReasonPhrase();
        this.details = details;
        this.requestedUri = requestedUri;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public List<String> getDetails() {
        return details;
    }

    public void setDetails(List<String>  details) {
        this.details = details;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatusMessage() {
        return statusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        this.statusMessage = statusMessage;
    }

    public String getEntity() {
        return entity;
    }

    public void setEntity(String entity) {
        this.entity = entity;
    }

    public String getRequestedUri() {
        return requestedUri;
    }

    public void setRequestedUri(String requestedUri) {
        this.requestedUri = requestedUri;
    }
}


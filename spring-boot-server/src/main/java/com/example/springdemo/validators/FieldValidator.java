package com.example.springdemo.validators;

public interface FieldValidator<T> {
     boolean validate(T t);
}

package com.sakthigarments.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(ResourceNotFoundException ex) {
        Map<String, Object> err = new HashMap<>();
        err.put("timestamp", LocalDateTime.now());
        err.put("status", HttpStatus.NOT_FOUND.value());
        err.put("errorCode", "NOT_FOUND");
        err.put("message", ex.getMessage());
        return new ResponseEntity<>(err, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Map<String, Object>> handleBadRequest(BadRequestException ex) {
        Map<String, Object> err = new HashMap<>();
        err.put("timestamp", LocalDateTime.now());
        err.put("status", HttpStatus.BAD_REQUEST.value());
        err.put("errorCode", "BAD_REQUEST");
        err.put("message", ex.getMessage());
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, Object> err = new HashMap<>();
        err.put("timestamp", LocalDateTime.now());
        err.put("status", HttpStatus.BAD_REQUEST.value());
        err.put("errorCode", "VALIDATION_FAILED");
        err.put("message", "Request field validation failed");

        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(fe.getField(), fe.getDefaultMessage());
        }
        err.put("errors", fieldErrors);

        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneric(Exception ex) {
        Map<String, Object> err = new HashMap<>();
        err.put("timestamp", LocalDateTime.now());
        err.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        err.put("errorCode", "INTERNAL_SERVER_ERROR");
        err.put("message", ex.getMessage() != null ? ex.getMessage() : "An unexpected server error occurred");
        return new ResponseEntity<>(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

package org.fluentfoundation.backend.exception;

import java.time.Instant;

public class ApiError {

    private final Instant timestamp = Instant.now();
    private final String code;
    private final String message;
    private final String details;

    public ApiError(String code, String message, String details) {
        this.code = code;
        this.message = message;
        this.details = details;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public String getDetails() {
        return details;
    }
}

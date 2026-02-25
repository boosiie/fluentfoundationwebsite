package org.fluentfoundation.backend.model;

import java.util.Locale;

public enum Role {
    ADMIN,
    CONTRIBUTOR,
    MEMBER;

    public static Role fromString(String value) {
        if (value == null) {
            throw new IllegalArgumentException("Role value cannot be null");
        }
        String normalized = value.trim().toUpperCase(Locale.US);
        for (Role role : Role.values()) {
            if (role.name().equals(normalized)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Unknown role: " + value);
    }
}

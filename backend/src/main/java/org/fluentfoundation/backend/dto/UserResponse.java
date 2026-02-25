package org.fluentfoundation.backend.dto;

import org.fluentfoundation.backend.model.UserAccount;

public class UserResponse {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private boolean active;

    public static UserResponse from(UserAccount account) {
        UserResponse response = new UserResponse();
        response.setId(account.getId());
        response.setEmail(account.getEmail());
        response.setFirstName(account.getFirstName());
        response.setLastName(account.getLastName());
        response.setRole(account.getRole().name());
        response.setActive(account.isActive());
        return response;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}

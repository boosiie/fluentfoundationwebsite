package org.fluentfoundation.backend.dto;

import org.fluentfoundation.backend.model.UserAccount;

public class LoginResponse {

    private String token;
    private String email;
    private String firstName;
    private String lastName;
    private String role;

    public static LoginResponse from(UserAccount account, String token) {
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setEmail(account.getEmail());
        response.setFirstName(account.getFirstName());
        response.setLastName(account.getLastName());
        response.setRole(account.getRole().name());
        return response;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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
}

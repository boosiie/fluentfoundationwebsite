package org.fluentfoundation.backend.controller;

import jakarta.validation.Valid;
import org.fluentfoundation.backend.dto.LoginRequest;
import org.fluentfoundation.backend.dto.LoginResponse;
import org.fluentfoundation.backend.dto.RegisterRequest;
import org.fluentfoundation.backend.dto.UserResponse;
import org.fluentfoundation.backend.model.UserAccount;
import org.fluentfoundation.backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        UserAccount account = authService.register(
                request.getEmail(), request.getPassword(), request.getFirstName(), request.getLastName());
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResponse.from(account));
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        String token = authService.login(request.getEmail(), request.getPassword());
        UserAccount account = authService.findByEmail(request.getEmail()).orElseThrow();
        return LoginResponse.from(account, token);
    }

    @GetMapping("/me")
    public UserResponse me(Authentication authentication) {
        UserAccount account = authService.findByEmail(authentication.getName()).orElseThrow();
        return UserResponse.from(account);
    }
}

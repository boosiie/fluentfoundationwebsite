package org.fluentfoundation.backend.controller;

import jakarta.validation.Valid;
import java.util.List;
import org.fluentfoundation.backend.dto.UserInviteRequest;
import org.fluentfoundation.backend.dto.UserResponse;
import org.fluentfoundation.backend.model.Role;
import org.fluentfoundation.backend.model.UserAccount;
import org.fluentfoundation.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final AuthService authService;

    public AdminUserController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping
    public List<UserResponse> listUsers(@RequestParam(value = "role", required = false) String role) {
        List<UserAccount> accounts;
        if (role != null && !role.isBlank()) {
            accounts = authService.findByRole(Role.fromString(role));
        } else {
            accounts = authService.findAll();
        }
        return accounts.stream().map(UserResponse::from).toList();
    }

    @PostMapping
    public ResponseEntity<UserResponse> invite(@Valid @RequestBody UserInviteRequest request) {
        UserAccount account = authService.invite(
                request.getEmail(),
                Role.fromString(request.getRole()),
                request.getInitialPassword(),
                request.getFirstName(),
                request.getLastName()
        );
        return ResponseEntity.ok(UserResponse.from(account));
    }

    @PatchMapping("/{id}/role")
    public UserResponse updateRole(@PathVariable Long id, @RequestBody UserInviteRequest.RoleUpdate request) {
        UserAccount account = authService.updateRole(id, Role.fromString(request.getRole()));
        return UserResponse.from(account);
    }

    @PatchMapping("/{id}/status")
    public UserResponse updateStatus(@PathVariable Long id, @RequestBody UserInviteRequest.StatusUpdate request) {
        UserAccount account = authService.updateStatus(id, request.isActive());
        return UserResponse.from(account);
    }
}

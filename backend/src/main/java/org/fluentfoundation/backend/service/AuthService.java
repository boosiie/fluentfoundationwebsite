package org.fluentfoundation.backend.service;

import java.util.List;
import java.util.Optional;
import org.fluentfoundation.backend.model.Role;
import org.fluentfoundation.backend.model.UserAccount;
import org.fluentfoundation.backend.repository.UserAccountRepository;
import org.fluentfoundation.backend.security.JwtService;
import org.fluentfoundation.backend.security.PasswordService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserAccountRepository repository;
    private final PasswordService passwordService;
    private final JwtService jwtService;

    public AuthService(UserAccountRepository repository, PasswordService passwordService, JwtService jwtService) {
        this.repository = repository;
        this.passwordService = passwordService;
        this.jwtService = jwtService;
    }

    public String login(String email, String password) {
        UserAccount account = repository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        if (!account.isActive()) {
            throw new IllegalStateException("Account is deactivated");
        }
        if (!passwordService.matches(password, account.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        return jwtService.generateToken(account.getEmail());
    }

    public UserAccount register(String email, String password, String firstName, String lastName) {
        Optional<UserAccount> existing = repository.findByEmail(email);
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }
        String hash = passwordService.encode(password);
        UserAccount account = new UserAccount();
        account.setEmail(email);
        account.setPasswordHash(hash);
        account.setRole(Role.MEMBER);
        account.setActive(true);
        account.setFirstName(firstName);
        account.setLastName(lastName);
        return repository.save(account);
    }

    public List<UserAccount> findAll() {
        return repository.findAll();
    }

    public List<UserAccount> findByRole(Role role) {
        return repository.findByRole(role);
    }

    public Optional<UserAccount> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Transactional
    public UserAccount updateRole(Long id, Role role) {
        UserAccount account = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        account.setRole(role);
        return repository.save(account);
    }

    @Transactional
    public UserAccount updateStatus(Long id, boolean active) {
        UserAccount account = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        account.setActive(active);
        return repository.save(account);
    }

    @Transactional
    public UserAccount invite(String email, Role role, String initialPassword, String firstName, String lastName) {
        if (repository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }
        String chosenPassword = initialPassword != null && !initialPassword.isBlank()
                ? initialPassword
                : generateTemporaryPassword();
        passwordService.validatePassword(chosenPassword);
        String passwordHash = passwordService.encode(chosenPassword);
        UserAccount account = new UserAccount();
        account.setEmail(email);
        account.setPasswordHash(passwordHash);
        account.setRole(role);
        account.setActive(true);
        account.setFirstName(firstName);
        account.setLastName(lastName);
        return repository.save(account);
    }

    private String generateTemporaryPassword() {
        return "Temp1234";
    }
}

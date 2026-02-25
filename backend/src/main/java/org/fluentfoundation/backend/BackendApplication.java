package org.fluentfoundation.backend;

import org.fluentfoundation.backend.model.Role;
import org.fluentfoundation.backend.model.UserAccount;
import org.fluentfoundation.backend.repository.UserAccountRepository;
import org.fluentfoundation.backend.security.PasswordService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(UserAccountRepository repository, PasswordService passwordService,
			@Value("${bootstrap.admin.email}") String adminEmail,
			@Value("${bootstrap.admin.password}") String adminPassword) {
		return args -> {
			if (repository.findByEmail(adminEmail).isEmpty()) {
				UserAccount admin = new UserAccount();
				admin.setEmail(adminEmail);
				admin.setPasswordHash(passwordService.encode(adminPassword));
				admin.setRole(Role.ADMIN);
				repository.save(admin);
				System.out.println("Seeded default admin account: " + adminEmail);
			}
		};
	}

}

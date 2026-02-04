package org.fluentfoundation.backend;

import org.fluentfoundation.backend.service.MemberService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(MemberService memberService) {
		return args -> {
			memberService.initializeSampleData();
			System.out.println("Current member count: " + memberService.getMemberCount());
		};
	}

}


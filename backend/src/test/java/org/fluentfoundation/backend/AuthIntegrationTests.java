package org.fluentfoundation.backend;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;
import org.fluentfoundation.backend.repository.UserAccountRepository;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class AuthIntegrationTests {

    private ObjectMapper objectMapper;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @LocalServerPort
    private int port;

    private HttpClient httpClient;
    private String adminToken;
    private final List<Long> createdUserIds = new ArrayList<>();

    @BeforeEach
    void setup() throws Exception {
        this.objectMapper = new ObjectMapper();
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(5))
                .build();
        adminToken = login("admin@fluent.org", "Admin1234");
    }

    @AfterEach
    void cleanup() {
        if (!createdUserIds.isEmpty()) {
            userAccountRepository.deleteAllById(createdUserIds);
            createdUserIds.clear();
        }
    }

    @Test
    void registerCreatesMemberAndAllowsLogin() throws Exception {
        String email = uniqueEmail("member");

        JsonNode registered = registerUserInternal(email, "Password123", "Test", "User");

        HttpResponse<String> loginResponse = sendJson("POST", "/api/auth/login", null, Map.of(
                "email", email,
                "password", "Password123"));
        assertStatus(loginResponse, HttpStatus.OK);

        JsonNode payload = objectMapper.readTree(loginResponse.body());
        Assertions.assertTrue(payload.hasNonNull("token"));
        Assertions.assertEquals("MEMBER", payload.get("role").asText());
    }

    @Test
    void memberCannotPostQuizQuestionUntilPromotedToContributor() throws Exception {
        JsonNode registered = registerUserInternal(uniqueEmail("member"), "Password123", "M", "User");
        long userId = registered.get("id").asLong();
        String memberToken = login(registered.get("email").asText(), "Password123");

        HttpResponse<String> denied = sendJson("POST", "/api/quiz/questions", memberToken, sampleQuestion());
        assertStatus(denied, HttpStatus.FORBIDDEN);

        sendJson("PATCH", "/api/admin/users/" + userId + "/role",
                adminToken,
                Map.of("role", "CONTRIBUTOR"));

        HttpResponse<String> allowed = sendJson("POST", "/api/quiz/questions", memberToken, sampleQuestion());
        assertStatus(allowed, HttpStatus.OK);
    }

    @Test
    void nonAdminCannotModifyUserAccounts() throws Exception {
        JsonNode member = registerUserInternal(uniqueEmail("basic"), "Password123", "Basic", "User");
        String memberToken = login(member.get("email").asText(), "Password123");
        JsonNode target = registerUserInternal(uniqueEmail("target"), "Password123", "Target", "User");

        HttpResponse<String> response = sendJson("PATCH",
                "/api/admin/users/" + target.get("id").asLong() + "/role",
                memberToken,
                Map.of("role", "ADMIN"));
        assertStatus(response, HttpStatus.FORBIDDEN);
    }

    @Test
    void loginFailsWithWrongPassword() throws Exception {
        HttpResponse<String> response = sendJson("POST", "/api/auth/login", null,
                Map.of("email", "admin@fluent.org", "password", "wrong"));
        assertStatus(response, HttpStatus.BAD_REQUEST);
    }

    @Test
    void adminCanDeactivateUserAndDeactivatedUserCannotLogin() throws Exception {
        JsonNode member = registerUserInternal(uniqueEmail("deactivate"), "Password123", "Deactivate", "User");
        long userId = member.get("id").asLong();

        HttpResponse<String> deactivate = sendJson("PATCH", "/api/admin/users/" + userId + "/status",
                adminToken,
                Map.of("active", false));
        assertStatus(deactivate, HttpStatus.OK);

        HttpResponse<String> loginAttempt = sendJson("POST", "/api/auth/login", null,
                Map.of("email", member.get("email").asText(), "password", "Password123"));
        assertStatus(loginAttempt, HttpStatus.FORBIDDEN);
    }

    private JsonNode registerUserInternal(String email, String password, String first, String last) throws Exception {
        HttpResponse<String> response = sendJson("POST", "/api/auth/register", null,
                Map.of(
                        "email", email,
                        "password", password,
                        "firstName", first,
                        "lastName", last));
        assertStatus(response, HttpStatus.CREATED);
        JsonNode node = objectMapper.readTree(response.body());
        createdUserIds.add(node.get("id").asLong());
        return node;
    }

    private String login(String email, String password) throws Exception {
        HttpResponse<String> response = sendJson("POST", "/api/auth/login", null,
                Map.of("email", email, "password", password));
        assertStatus(response, HttpStatus.OK);
        return objectMapper.readTree(response.body()).get("token").asText();
    }

    private Map<String, Object> sampleQuestion() {
        return Map.of(
                "question", "What is 2+2?",
                "options", List.of("3", "4", "5"),
                "correctIndex", 1
        );
    }

    private String uniqueEmail(String prefix) {
        return prefix + "+" + UUID.randomUUID() + "@example.com";
    }

    private HttpResponse<String> sendJson(String method, String path, String token, Object body) throws Exception {
        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(new URI("http://localhost:" + port + path))
                .timeout(Duration.ofSeconds(5))
                .header("Accept", "application/json");

        if (token != null) {
            builder.header("Authorization", "Bearer " + token);
        }

        if (body != null) {
            builder.header("Content-Type", "application/json");
            builder.method(method, HttpRequest.BodyPublishers.ofByteArray(objectMapper.writeValueAsBytes(body)));
        } else {
            builder.method(method, HttpRequest.BodyPublishers.noBody());
        }

        return httpClient.send(builder.build(), HttpResponse.BodyHandlers.ofString());
    }

    private void assertStatus(HttpResponse<?> response, HttpStatus expected) {
        Assertions.assertEquals(expected.value(), response.statusCode(),
                "Unexpected status code: " + response.statusCode());
    }
}

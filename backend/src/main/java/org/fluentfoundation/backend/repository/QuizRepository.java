package org.fluentfoundation.backend.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.fluentfoundation.backend.model.QuizQuestion;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class QuizRepository {
    private final ObjectMapper mapper = new ObjectMapper();
    private final Path filePath;

    public QuizRepository() {
        this.filePath = Paths.get(System.getProperty("user.dir"), "data", "questions.json");
        try {
            if (!Files.exists(filePath.getParent())) Files.createDirectories(filePath.getParent());
            if (!Files.exists(filePath)) Files.write(filePath, "[]".getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Unable to initialize questions file", e);
        }
    }

    public synchronized List<QuizQuestion> findAll() {
        try {
            byte[] bytes = Files.readAllBytes(filePath);
            List<QuizQuestion> list = mapper.readValue(bytes, new TypeReference<List<QuizQuestion>>() {});
            return list == null ? new ArrayList<>() : list;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public synchronized QuizQuestion save(QuizQuestion q) {
        try {
            List<QuizQuestion> list = findAll();
            if (q.getId() == null || q.getId().isEmpty()) q.setId(UUID.randomUUID().toString());
            list.add(q);
            mapper.writerWithDefaultPrettyPrinter().writeValue(filePath.toFile(), list);
            return q;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

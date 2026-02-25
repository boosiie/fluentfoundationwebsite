package org.fluentfoundation.backend.service;

import org.fluentfoundation.backend.model.QuizQuestion;
import org.fluentfoundation.backend.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class QuizService {
    private final QuizRepository repo;
    private final boolean writeEnabled;

    public QuizService(QuizRepository repo, @Value("${quiz.write.enabled:true}") boolean writeEnabled) {
        this.repo = repo;
        this.writeEnabled = writeEnabled;
    }

    public List<QuizQuestion> getAllQuestions() {
        return repo.findAll();
    }

    public QuizQuestion addQuestion(QuizQuestion q) {
        if (!writeEnabled) {
            if (q.getId() == null || q.getId().isBlank()) {
                q.setId(UUID.randomUUID().toString());
            }
            return q;
        }
        return repo.save(q);
    }
}

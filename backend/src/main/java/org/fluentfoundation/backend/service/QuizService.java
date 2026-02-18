package org.fluentfoundation.backend.service;

import org.fluentfoundation.backend.model.QuizQuestion;
import org.fluentfoundation.backend.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {
    private final QuizRepository repo = new QuizRepository();

    public List<QuizQuestion> getAllQuestions() {
        return repo.findAll();
    }

    public QuizQuestion addQuestion(QuizQuestion q) {
        return repo.save(q);
    }
}

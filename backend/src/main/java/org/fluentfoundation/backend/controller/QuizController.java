package org.fluentfoundation.backend.controller;

import org.fluentfoundation.backend.model.QuizQuestion;
import org.fluentfoundation.backend.service.QuizService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {
    private final QuizService service;

    public QuizController(QuizService service) {
        this.service = service;
    }

    @GetMapping("/questions")
    public List<QuizQuestion> getQuestions() {
        return service.getAllQuestions();
    }

    @PostMapping("/questions")
    @PreAuthorize("hasAnyRole('ADMIN','CONTRIBUTOR')")
    public QuizQuestion addQuestion(@RequestBody QuizQuestion q) {
        return service.addQuestion(q);
    }
}

package org.fluentfoundation.backend.controller;

import org.fluentfoundation.backend.model.QuizQuestion;
import org.fluentfoundation.backend.service.QuizService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {
    private final QuizService service = new QuizService();

    @GetMapping("/questions")
    public List<QuizQuestion> getQuestions() {
        return service.getAllQuestions();
    }

    @PostMapping("/questions")
    public QuizQuestion addQuestion(@RequestBody QuizQuestion q) {
        return service.addQuestion(q);
    }
}

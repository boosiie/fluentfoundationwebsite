package org.fluentfoundation.backend.model;

import java.util.List;

public class QuizQuestion {
    private String id;
    private String question;
    private List<String> options;
    private int correctIndex;

    public QuizQuestion() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }
    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }
    public int getCorrectIndex() { return correctIndex; }
    public void setCorrectIndex(int correctIndex) { this.correctIndex = correctIndex; }
}

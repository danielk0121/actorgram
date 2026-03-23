package com.actorgram.api3.dto;

import java.util.List;

public class AiSearchResponse {

    private String answer;
    private List<String> actorNames;
    private List<String> movieTitles;

    public AiSearchResponse() {}

    public AiSearchResponse(String answer, List<String> actorNames, List<String> movieTitles) {
        this.answer = answer;
        this.actorNames = actorNames;
        this.movieTitles = movieTitles;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public List<String> getActorNames() {
        return actorNames;
    }

    public void setActorNames(List<String> actorNames) {
        this.actorNames = actorNames;
    }

    public List<String> getMovieTitles() {
        return movieTitles;
    }

    public void setMovieTitles(List<String> movieTitles) {
        this.movieTitles = movieTitles;
    }
}

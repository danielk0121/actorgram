package com.actorgram.api3.dto;

import javax.validation.constraints.NotBlank;

public class AiSearchRequest {

    @NotBlank(message = "query는 비어 있을 수 없습니다.")
    private String query;

    public AiSearchRequest() {}

    public AiSearchRequest(String query) {
        this.query = query;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }
}

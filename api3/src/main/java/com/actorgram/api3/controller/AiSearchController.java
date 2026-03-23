package com.actorgram.api3.controller;

import com.actorgram.api3.dto.AiSearchRequest;
import com.actorgram.api3.dto.AiSearchResponse;
import com.actorgram.api3.service.AiSearchService;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiSearchController {

    private final AiSearchService aiSearchService;

    public AiSearchController(AiSearchService aiSearchService) {
        this.aiSearchService = aiSearchService;
    }

    @PostMapping("/search")
    public ResponseEntity<AiSearchResponse> search(@Valid @RequestBody AiSearchRequest request) {
        AiSearchResponse response = aiSearchService.search(request);
        return ResponseEntity.ok(response);
    }
}

package com.actorgram.api3.controller;

import com.actorgram.api3.dto.AiSearchRequest;
import com.actorgram.api3.dto.AiSearchResponse;
import com.actorgram.api3.service.AiSearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "AI Search", description = "Gemini 기반 배우/영화 AI 검색")
@RestController
@RequestMapping("/api/ai")
public class AiSearchController {

    private final AiSearchService aiSearchService;

    public AiSearchController(AiSearchService aiSearchService) {
        this.aiSearchService = aiSearchService;
    }

    @Operation(summary = "AI 프롬프트 검색", description = "자유 텍스트로 배우/영화를 검색합니다. Gemini API 키가 먼저 설정되어 있어야 합니다.")
    @PostMapping("/search")
    public ResponseEntity<AiSearchResponse> search(@Valid @RequestBody AiSearchRequest request) {
        AiSearchResponse response = aiSearchService.search(request);
        return ResponseEntity.ok(response);
    }
}

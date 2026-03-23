package com.actorgram.api3.controller;

import com.actorgram.api3.service.AiSearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "API Key", description = "Gemini API 키 관리 (임시)")
@RestController
@RequestMapping("/api/config")
public class ApiKeyController {

    private final AiSearchService aiSearchService;

    public ApiKeyController(AiSearchService aiSearchService) {
        this.aiSearchService = aiSearchService;
    }

    @Operation(summary = "Gemini API 키 설정", description = "서버 재시작 없이 Gemini API 키를 변경합니다. 서버 재시작 시 초기화됩니다.")
    @PostMapping("/gemini-key")
    public ResponseEntity<Map<String, String>> setGeminiKey(@RequestBody Map<String, String> body) {
        String key = body.get("apiKey");
        if (key == null || key.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "apiKey 값이 비어 있습니다."));
        }
        aiSearchService.setApiKey(key);
        return ResponseEntity.ok(Map.of("message", "Gemini API 키가 설정되었습니다."));
    }

    @Operation(summary = "Gemini API 키 설정 여부 확인")
    @GetMapping("/gemini-key/status")
    public ResponseEntity<Map<String, Object>> getKeyStatus() {
        return ResponseEntity.ok(Map.of("hasApiKey", aiSearchService.hasApiKey()));
    }
}

package com.actorgram.api3.service;

import com.actorgram.api3.dto.AiSearchRequest;
import com.actorgram.api3.dto.AiSearchResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AiSearchService {

    private static final Logger log = LoggerFactory.getLogger(AiSearchService.class);

    // Gemini REST API 엔드포인트
    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";

    // 응답 끝에 포함된 추출 JSON 마커 패턴
    private static final Pattern EXTRACTED_JSON_PATTERN =
            Pattern.compile("EXTRACTED_JSON:(\\{.*?\\})\\s*$", Pattern.DOTALL);

    // 시스템 프롬프트: 배우/영화 정보 답변 + 추출 JSON 포함 지시
    private static final String SYSTEM_PROMPT =
            "당신은 영화 배우와 영화에 대해 잘 알고 있는 전문 어시스턴트입니다.\n" +
            "사용자의 질문에 대해 자연스럽고 상세하게 한국어로 답변하세요.\n" +
            "답변 맨 마지막에는 반드시 아래 형식의 JSON 블록을 추가하세요.\n" +
            "이 JSON에는 답변에서 언급된 배우 이름과 영화 제목을 추출하여 포함하세요.\n" +
            "EXTRACTED_JSON:{\"actorNames\":[\"배우이름1\",\"배우이름2\"],\"movieTitles\":[\"영화제목1\",\"영화제목2\"]}\n" +
            "언급된 배우나 영화가 없으면 빈 배열로 표시하세요.";

    @Value("${gemini.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AiSearchResponse search(AiSearchRequest request) {
        String rawResponse = callGeminiApi(request.getQuery());
        return parseGeminiResponse(rawResponse);
    }

    private String callGeminiApi(String userQuery) {
        String url = GEMINI_URL + apiKey;

        // Gemini generateContent 요청 바디 구성
        String requestBody = buildRequestBody(userQuery);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url, HttpMethod.POST, entity, String.class);

        return extractTextFromGeminiResponse(response.getBody());
    }

    private String buildRequestBody(String userQuery) {
        // JSON 이스케이프 처리 후 요청 바디 생성
        String escapedSystem = escapeJson(SYSTEM_PROMPT);
        String escapedQuery = escapeJson(userQuery);

        return "{"
                + "\"system_instruction\":{\"parts\":[{\"text\":\"" + escapedSystem + "\"}]},"
                + "\"contents\":[{\"role\":\"user\",\"parts\":[{\"text\":\"" + escapedQuery + "\"}]}],"
                + "\"generationConfig\":{\"temperature\":0.7,\"maxOutputTokens\":2048}"
                + "}";
    }

    private String extractTextFromGeminiResponse(String responseBody) {
        try {
            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode text = root
                    .path("candidates").get(0)
                    .path("content")
                    .path("parts").get(0)
                    .path("text");

            if (text.isMissingNode()) {
                log.error("Gemini 응답에서 텍스트를 찾을 수 없음: {}", responseBody);
                throw new RuntimeException("Gemini 응답 파싱 실패");
            }
            return text.asText();
        } catch (Exception e) {
            log.error("Gemini 응답 파싱 오류: {}", responseBody, e);
            throw new RuntimeException("Gemini 응답 처리 중 오류 발생", e);
        }
    }

    private AiSearchResponse parseGeminiResponse(String rawText) {
        // EXTRACTED_JSON 블록 추출
        Matcher matcher = EXTRACTED_JSON_PATTERN.matcher(rawText);

        List<String> actorNames = new ArrayList<>();
        List<String> movieTitles = new ArrayList<>();
        String answer = rawText.trim();

        if (matcher.find()) {
            String jsonStr = matcher.group(1);
            // 답변에서 EXTRACTED_JSON 블록 제거
            answer = rawText.substring(0, matcher.start()).trim();

            try {
                JsonNode extracted = objectMapper.readTree(jsonStr);

                JsonNode actorsNode = extracted.path("actorNames");
                if (actorsNode.isArray()) {
                    for (JsonNode node : actorsNode) {
                        String name = node.asText().trim();
                        if (!name.isEmpty()) {
                            actorNames.add(name);
                        }
                    }
                }

                JsonNode moviesNode = extracted.path("movieTitles");
                if (moviesNode.isArray()) {
                    for (JsonNode node : moviesNode) {
                        String title = node.asText().trim();
                        if (!title.isEmpty()) {
                            movieTitles.add(title);
                        }
                    }
                }
            } catch (Exception e) {
                log.warn("EXTRACTED_JSON 파싱 실패, 빈 목록으로 처리. json={}", jsonStr, e);
            }
        } else {
            log.warn("EXTRACTED_JSON 블록을 찾지 못함. rawText 일부: {}",
                    rawText.length() > 200 ? rawText.substring(0, 200) : rawText);
        }

        return new AiSearchResponse(answer, actorNames, movieTitles);
    }

    private String escapeJson(String text) {
        return text
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
}

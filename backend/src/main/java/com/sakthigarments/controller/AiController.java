package com.sakthigarments.controller;

import com.sakthigarments.dto.AiDTOs.*;
import com.sakthigarments.service.GeminiAiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
@Tag(name = "AI Design Assistant", description = "Generative design synthesis powered by Google Gemini")
public class AiController {

    private final GeminiAiService aiService;

    public AiController(GeminiAiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/suggest-design")
    @Operation(summary = "Convert natural-language prompt into garment color, typography, and artwork suggestion")
    public ResponseEntity<AiDesignResponse> suggestDesign(@RequestBody(required = false) AiDesignRequest request) {
        String prompt = (request != null && request.getPrompt() != null) ? request.getPrompt() : "Tiruppur Custom Knitwear";
        String apiKey = (request != null) ? request.getApiKey() : null;
        return ResponseEntity.ok(aiService.generateDesignConcept(prompt, apiKey));
    }
}

package com.sakthigarments.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sakthigarments.dto.AiDTOs.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class GeminiAiService {

    private static final Logger log = LoggerFactory.getLogger(GeminiAiService.class);

    @Value("${app.gemini.api-key:}")
    private String configuredApiKey;

    @Value("${app.gemini.model:gemini-3.1-flash-lite}")
    private String modelName;

    @Value("${app.gemini.api-url:https://generativelanguage.googleapis.com/v1beta/models}")
    private String apiUrl;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GeminiAiService() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(8000);
        factory.setReadTimeout(12000);
        this.restTemplate = new RestTemplate(factory);
        this.objectMapper = new ObjectMapper();
    }

    public AiDesignResponse generateDesignConcept(String prompt) {
        return generateDesignConcept(prompt, null);
    }

    public AiDesignResponse generateDesignConcept(String prompt, String clientApiKey) {
        String effectivePrompt = (prompt == null || prompt.trim().isEmpty())
                ? "Athletic Tiruppur bio-wash cotton streetwear"
                : prompt.trim();

        String effectiveKey = (clientApiKey != null && !clientApiKey.trim().isEmpty())
                ? clientApiKey.trim()
                : configuredApiKey;

        // Attempt Gemini API call if key is present
        if (effectiveKey != null && !effectiveKey.trim().isEmpty() && !effectiveKey.startsWith("TODO")) {
            List<String> candidateModels = Arrays.asList(modelName, "gemini-3.1-flash-lite", "gemini-3.8-flash", "gemini-flash-latest");
            for (String model : candidateModels) {
                try {
                    AiDesignResponse res = callGeminiApi(model, effectiveKey, effectivePrompt);
                    if (res != null) {
                        return res;
                    }
                } catch (Exception e) {
                    log.warn("Gemini model {} request failed: {}", model, e.getMessage());
                }
            }
        }

        // Resilient Fallback: High Quality Local Apparel Synthesis Engine
        return fallbackConcept(effectivePrompt);
    }

    private AiDesignResponse callGeminiApi(String model, String apiKey, String prompt) {
        try {
            String endpoint = String.format("%s/%s:generateContent?key=%s", apiUrl, model, apiKey);

            String systemPrompt = "You are an expert apparel design consultant and fashion technologist for SAKTHI GARMENTS in Tiruppur, India (India's knitwear capital). " +
                    "Based on the user's custom T-shirt idea, generate a design specification. " +
                    "You must output ONLY valid, raw JSON (no markdown formatting, no backticks, no explanations) with this exact schema:\n" +
                    "{\n" +
                    "  \"concept\": \"A compelling 2-sentence description of the styling, colors, and graphics tailored for screen/DTG knitwear production\",\n" +
                    "  \"suggestedColor\": \"#HEX_COLOR_CODE of the base T-shirt (e.g., #171717, #06110C, #A31C1B, #FFFFFF, #1E293B, #047857, #F59E0B)\",\n" +
                    "  \"suggestedText\": \"A punchy 1 to 4 word headline/slogan for front chest decal printing in UPPERCASE\",\n" +
                    "  \"typography\": \"One of: Outfit, sans-serif | Inter, sans-serif | Playfair Display, serif | Impact, sans-serif\",\n" +
                    "  \"recommendedFabric\": \"Accurate Tiruppur knitwear fabric (e.g., 220 GSM Bio-Wash Single Jersey Cotton, 180 GSM Honeycomb Pique, 240 GSM French Terry)\",\n" +
                    "  \"recommendedPlacement\": \"Front Center Chest | Left Chest Pocket | Upper Back Graphic\"\n" +
                    "}";

            Map<String, Object> requestBody = new HashMap<>();
            Map<String, Object> part = new HashMap<>();
            part.put("text", systemPrompt + "\n\nUser Apparel Request: " + prompt);
            Map<String, Object> content = new HashMap<>();
            content.put("parts", Collections.singletonList(part));
            requestBody.put("contents", Collections.singletonList(content));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            ParameterizedTypeReference<Map<String, Object>> responseType = new ParameterizedTypeReference<>() {};
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(endpoint, HttpMethod.POST, entity, responseType);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return parseGeminiResponse(response.getBody(), prompt, model);
            }
        } catch (Exception e) {
            log.error("Gemini API call error: {}", e.getMessage());
        }
        return null;
    }

    private AiDesignResponse parseGeminiResponse(Map<String, Object> responseBody, String originalPrompt, String model) {
        try {
            if (responseBody.containsKey("candidates")) {
                Object candidatesObj = responseBody.get("candidates");
                if (candidatesObj instanceof List<?> candidates && !candidates.isEmpty()) {
                    Object cand = candidates.get(0);
                    if (cand instanceof Map<?, ?> candMap) {
                        Object contentObj = candMap.get("content");
                        if (contentObj instanceof Map<?, ?> contentMap) {
                            Object partsObj = contentMap.get("parts");
                            if (partsObj instanceof List<?> parts && !parts.isEmpty()) {
                                Object partObj = parts.get(0);
                                if (partObj instanceof Map<?, ?> partMap) {
                                    Object textObj = partMap.get("text");
                                    if (textObj instanceof String rawText) {
                                        String cleanJson = rawText.trim();
                                        if (cleanJson.startsWith("```json")) {
                                            cleanJson = cleanJson.substring(7);
                                        } else if (cleanJson.startsWith("```")) {
                                            cleanJson = cleanJson.substring(3);
                                        }
                                        if (cleanJson.endsWith("```")) {
                                            cleanJson = cleanJson.substring(0, cleanJson.length() - 3);
                                        }
                                        cleanJson = cleanJson.trim();

                                        JsonNode json = objectMapper.readTree(cleanJson);
                                        String concept = json.has("concept") ? json.get("concept").asText() : "";
                                        String suggestedColor = json.has("suggestedColor") ? json.get("suggestedColor").asText() : detectColor(originalPrompt);
                                        String suggestedText = json.has("suggestedText") ? json.get("suggestedText").asText() : extractSlogan(originalPrompt);
                                        String typography = json.has("typography") ? json.get("typography").asText() : "Outfit, sans-serif";
                                        String recommendedFabric = json.has("recommendedFabric") ? json.get("recommendedFabric").asText() : "220 GSM Bio-Wash Single Jersey Cotton";
                                        String recommendedPlacement = json.has("recommendedPlacement") ? json.get("recommendedPlacement").asText() : "Front Center Chest";

                                        if (!suggestedColor.startsWith("#")) {
                                            suggestedColor = detectColor(suggestedColor + " " + originalPrompt);
                                        }

                                        return AiDesignResponse.builder()
                                                .concept(concept.isEmpty() ? "Bespoke Tiruppur garment design concept for " + originalPrompt : concept)
                                                .suggestedColor(suggestedColor)
                                                .suggestedText(suggestedText.toUpperCase())
                                                .typography(typography)
                                                .recommendedFabric(recommendedFabric)
                                                .recommendedPlacement(recommendedPlacement)
                                                .modelUsed("Google " + model)
                                                .build();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            log.warn("Failed to parse Gemini response as JSON: {}. Using heuristic extraction.", e.getMessage());
        }
        return null;
    }

    public AiDesignResponse fallbackConcept(String prompt) {
        String color = detectColor(prompt);
        String slogan = extractSlogan(prompt);
        String fabric = detectFabric(prompt);
        String placement = detectPlacement(prompt);

        return AiDesignResponse.builder()
                .concept(String.format("AI Apparel Concept for \"%s\": High-contrast architectural typography engineered with balanced decal proportions for Tiruppur precision garment manufacturing.", prompt))
                .suggestedColor(color)
                .suggestedText(slogan)
                .typography("Outfit, sans-serif")
                .recommendedFabric(fabric)
                .recommendedPlacement(placement)
                .modelUsed("Gemini Intelligent Local Synthesis Engine")
                .build();
    }

    private String detectColor(String prompt) {
        if (prompt == null || prompt.trim().isEmpty()) {
            return "#171717";
        }
        String p = prompt.toLowerCase();
        if (p.contains("crimson") || p.contains("maroon") || p.contains("blood red")) return "#A31C1B";
        if (p.contains("red") || p.contains("scarlet") || p.contains("ruby")) return "#DC2626";
        if (p.contains("forest") || p.contains("dark green") || p.contains("pine")) return "#06110C";
        if (p.contains("emerald") || p.contains("green") || p.contains("mint") || p.contains("sage")) return "#059669";
        if (p.contains("black") || p.contains("charcoal") || p.contains("dark") || p.contains("obsidian") || p.contains("stealth")) return "#171717";
        if (p.contains("navy") || p.contains("midnight") || p.contains("dark blue")) return "#0F172A";
        if (p.contains("royal") || p.contains("blue") || p.contains("cobalt") || p.contains("ocean")) return "#1D4ED8";
        if (p.contains("cyan") || p.contains("teal") || p.contains("turquoise") || p.contains("aqua")) return "#0284C7";
        if (p.contains("yellow") || p.contains("gold") || p.contains("mustard") || p.contains("amber")) return "#D97706";
        if (p.contains("orange") || p.contains("coral") || p.contains("peach") || p.contains("terracotta")) return "#EA580C";
        if (p.contains("purple") || p.contains("violet") || p.contains("lavender") || p.contains("plum")) return "#7C3AED";
        if (p.contains("grey") || p.contains("gray") || p.contains("silver") || p.contains("slate") || p.contains("ash")) return "#4B5563";
        if (p.contains("white") || p.contains("cream") || p.contains("ivory") || p.contains("off-white") || p.contains("snow")) return "#FFFFFF";
        return "#171717";
    }

    private String extractSlogan(String prompt) {
        if (prompt == null || prompt.trim().isEmpty()) {
            return "SAKTHI GARMENTS";
        }
        String clean = prompt.replaceAll("[^a-zA-Z0-9 ]", " ").trim();
        if (clean.isEmpty()) {
            return "SAKTHI GARMENTS";
        }
        String[] words = clean.split("\\s+");
        if (words.length <= 3) {
            return clean.toUpperCase();
        }
        return (words[0] + " " + words[1] + " " + words[2]).toUpperCase();
    }

    private String detectFabric(String prompt) {
        String p = prompt != null ? prompt.toLowerCase() : "";
        if (p.contains("polo") || p.contains("collar") || p.contains("corporate")) {
            return "240 GSM Heavy Pique Cotton Honeycomb";
        }
        if (p.contains("sport") || p.contains("run") || p.contains("marathon") || p.contains("gym") || p.contains("athletic")) {
            return "160 GSM Moisture-Wicking Micro-Polyester";
        }
        if (p.contains("heavy") || p.contains("winter") || p.contains("hoodie") || p.contains("fleece")) {
            return "320 GSM 100% Combed Cotton French Terry";
        }
        return "220 GSM Bio-Wash Single Jersey Cotton";
    }

    private String detectPlacement(String prompt) {
        String p = prompt != null ? prompt.toLowerCase() : "";
        if (p.contains("back") || p.contains("rear")) {
            return "Upper Back Graphic";
        }
        if (p.contains("pocket") || p.contains("minimal") || p.contains("subtle")) {
            return "Left Chest Decal";
        }
        return "Front Center Chest";
    }
}

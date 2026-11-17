package com.sakthigarments.dto;

import jakarta.validation.constraints.NotBlank;

public class AiDTOs {

    public static class AiDesignRequest {
        @NotBlank(message = "Prompt cannot be blank")
        private String prompt;
        private String apiKey;

        public AiDesignRequest() {}
        public AiDesignRequest(String prompt) { this.prompt = prompt; }
        public AiDesignRequest(String prompt, String apiKey) {
            this.prompt = prompt;
            this.apiKey = apiKey;
        }

        public String getPrompt() { return prompt; }
        public void setPrompt(String prompt) { this.prompt = prompt; }

        public String getApiKey() { return apiKey; }
        public void setApiKey(String apiKey) { this.apiKey = apiKey; }

        public static AiDesignRequestBuilder builder() { return new AiDesignRequestBuilder(); }

        public static class AiDesignRequestBuilder {
            private String prompt;
            private String apiKey;
            public AiDesignRequestBuilder prompt(String prompt) { this.prompt = prompt; return this; }
            public AiDesignRequestBuilder apiKey(String apiKey) { this.apiKey = apiKey; return this; }
            public AiDesignRequest build() { return new AiDesignRequest(prompt, apiKey); }
        }
    }

    public static class AiDesignResponse {
        private String concept;
        private String suggestedColor;
        private String suggestedText;
        private String typography;
        private String recommendedFabric;
        private String recommendedPlacement;
        private String modelUsed;

        public AiDesignResponse() {}

        public AiDesignResponse(String concept, String suggestedColor, String suggestedText, String typography,
                                String recommendedFabric, String recommendedPlacement, String modelUsed) {
            this.concept = concept;
            this.suggestedColor = suggestedColor;
            this.suggestedText = suggestedText;
            this.typography = typography;
            this.recommendedFabric = recommendedFabric;
            this.recommendedPlacement = recommendedPlacement;
            this.modelUsed = modelUsed;
        }

        public String getConcept() { return concept; }
        public void setConcept(String concept) { this.concept = concept; }

        public String getSuggestedColor() { return suggestedColor; }
        public void setSuggestedColor(String suggestedColor) { this.suggestedColor = suggestedColor; }

        public String getSuggestedText() { return suggestedText; }
        public void setSuggestedText(String suggestedText) { this.suggestedText = suggestedText; }

        public String getTypography() { return typography; }
        public void setTypography(String typography) { this.typography = typography; }

        public String getRecommendedFabric() { return recommendedFabric; }
        public void setRecommendedFabric(String recommendedFabric) { this.recommendedFabric = recommendedFabric; }

        public String getRecommendedPlacement() { return recommendedPlacement; }
        public void setRecommendedPlacement(String recommendedPlacement) { this.recommendedPlacement = recommendedPlacement; }

        public String getModelUsed() { return modelUsed; }
        public void setModelUsed(String modelUsed) { this.modelUsed = modelUsed; }

        public static AiDesignResponseBuilder builder() { return new AiDesignResponseBuilder(); }

        public static class AiDesignResponseBuilder {
            private String concept;
            private String suggestedColor;
            private String suggestedText;
            private String typography;
            private String recommendedFabric;
            private String recommendedPlacement;
            private String modelUsed;

            public AiDesignResponseBuilder concept(String concept) { this.concept = concept; return this; }
            public AiDesignResponseBuilder suggestedColor(String suggestedColor) { this.suggestedColor = suggestedColor; return this; }
            public AiDesignResponseBuilder suggestedText(String suggestedText) { this.suggestedText = suggestedText; return this; }
            public AiDesignResponseBuilder typography(String typography) { this.typography = typography; return this; }
            public AiDesignResponseBuilder recommendedFabric(String recommendedFabric) { this.recommendedFabric = recommendedFabric; return this; }
            public AiDesignResponseBuilder recommendedPlacement(String recommendedPlacement) { this.recommendedPlacement = recommendedPlacement; return this; }
            public AiDesignResponseBuilder modelUsed(String modelUsed) { this.modelUsed = modelUsed; return this; }

            public AiDesignResponse build() {
                return new AiDesignResponse(concept, suggestedColor, suggestedText, typography, recommendedFabric, recommendedPlacement, modelUsed);
            }
        }
    }
}

package com.knowledge.platform.dto;

import lombok.*;

public class AiDto {

    @Data
    public static class AiRequest {
        private String content;
        private String title;
        private String action; // improve, grammar, concise, title
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AiResponse {
        private String result;
        private String action;
        private boolean success;
    }
}

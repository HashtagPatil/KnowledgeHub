package com.knowledge.platform.dto;

import lombok.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public class ArticleDto {

    @Data
    public static class ArticleRequest {
        @NotBlank
        private String title;

        @NotBlank
        private String content;

        @NotBlank
        private String category;

        private String tags;
        private String summary;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ArticleResponse {
        private Long id;
        private String title;
        private String content;
        private String summary;
        private String category;
        private String tags;
        private String authorUsername;
        private String authorEmail;
        private Long authorId;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}

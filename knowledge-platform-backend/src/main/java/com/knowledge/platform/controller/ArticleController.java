package com.knowledge.platform.controller;

import com.knowledge.platform.dto.ArticleDto;
import com.knowledge.platform.service.ArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    // Public endpoints
    @GetMapping
    public ResponseEntity<List<ArticleDto.ArticleResponse>> getAllArticles(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category) {
        if ((query != null && !query.isBlank()) || (category != null && !category.isBlank())) {
            return ResponseEntity.ok(articleService.searchAndFilter(query, category));
        }
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDto.ArticleResponse> getArticle(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.getArticleById(id));
    }

    // Protected endpoints
    @PostMapping
    public ResponseEntity<ArticleDto.ArticleResponse> createArticle(
            @Valid @RequestBody ArticleDto.ArticleRequest request,
            Authentication auth) {
        ArticleDto.ArticleResponse response = articleService.createArticle(request, auth.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleDto.ArticleResponse> updateArticle(
            @PathVariable Long id,
            @Valid @RequestBody ArticleDto.ArticleRequest request,
            Authentication auth) {
        return ResponseEntity.ok(articleService.updateArticle(id, request, auth.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteArticle(@PathVariable Long id, Authentication auth) {
        articleService.deleteArticle(id, auth.getName());
        return ResponseEntity.ok(java.util.Map.of("message", "Article deleted successfully"));
    }

    @GetMapping("/my")
    public ResponseEntity<List<ArticleDto.ArticleResponse>> getMyArticles(Authentication auth) {
        return ResponseEntity.ok(articleService.getMyArticles(auth.getName()));
    }
}

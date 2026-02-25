package com.knowledge.platform.service;

import com.knowledge.platform.dto.ArticleDto;
import com.knowledge.platform.entity.Article;
import com.knowledge.platform.entity.User;
import com.knowledge.platform.repository.ArticleRepository;
import com.knowledge.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final AiService aiService;

    public ArticleDto.ArticleResponse createArticle(ArticleDto.ArticleRequest request, String email) {
        User author = getUserByEmail(email);

        String content = sanitizeContent(request.getContent());
        // Auto-generate or sanitize summary
        String summary = sanitizeContent(request.getSummary());
        if (summary == null || summary.isBlank()) {
            summary = aiService.generateSummary(content);
        }

        Article article = Article.builder()
                .title(request.getTitle())
                .content(content)
                .summary(summary)
                .category(request.getCategory())
                .tags(request.getTags())
                .author(author)
                .build();

        Article saved = articleRepository.save(article);
        return mapToResponse(saved);
    }

    public List<ArticleDto.ArticleResponse> getAllArticles() {
        return articleRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public ArticleDto.ArticleResponse getArticleById(Long id) {
        Article article = articleRepository.findByIdWithAuthor(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));
        return mapToResponse(article);
    }

    public ArticleDto.ArticleResponse updateArticle(Long id, ArticleDto.ArticleRequest request, String email) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        if (!article.getAuthor().getEmail().equals(email)) {
            throw new SecurityException("You are not authorized to edit this article");
        }

        String content = sanitizeContent(request.getContent());
        // Regenerate or sanitize summary if content changed
        String summary = sanitizeContent(request.getSummary());
        if (summary == null || summary.isBlank()) {
            summary = aiService.generateSummary(content);
        }

        article.setTitle(request.getTitle());
        article.setContent(content);
        article.setSummary(summary);
        article.setCategory(request.getCategory());
        article.setTags(request.getTags());

        Article updated = articleRepository.save(article);
        return mapToResponse(updated);
    }

    public void deleteArticle(Long id, String email) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        if (!article.getAuthor().getEmail().equals(email)) {
            throw new SecurityException("You are not authorized to delete this article");
        }
        articleRepository.delete(article);
    }

    public List<ArticleDto.ArticleResponse> getMyArticles(String email) {
        User author = getUserByEmail(email);
        return articleRepository.findByAuthor(author)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<ArticleDto.ArticleResponse> searchAndFilter(String query, String category) {
        // Normalize: treat blank as empty string (JPQL handles '' natively)
        String q = (query == null) ? "" : query.trim();
        String cat = (category == null) ? "" : category.trim();

        if (q.isEmpty() && cat.isEmpty()) {
            return articleRepository.findAllByOrderByCreatedAtDesc()
                    .stream().map(this::mapToResponse).collect(Collectors.toList());
        }

        return articleRepository.searchAndFilter(q, cat)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private String sanitizeContent(String content) {
        if (content == null)
            return null;

        // Remove common AI markers — use (?s) (DOTALL) so . matches newlines too
        String clean = content
                .replaceAll("(?si)\\[AI Note:.*?\\]", "") // multi-line AI notes
                .replaceAll("(?si)\\[Note:.*?\\]", "") // plain [Note:] variants
                .replaceAll("(?i)✨\\s*AI[- ]?Improved Version:\\s*", "")
                .replaceAll("(?i)📝\\s*Grammar[- ]?Improved:\\s*", "")
                .replaceAll("(?i)✂️\\s*Concise Version:\\s*", "")
                .replaceAll("(?i)💡\\s*Suggested Titles:\\s*", "")
                .replaceAll("(?i)AI-Generated Summary", "")
                .replaceAll("&amp;nbsp;", " ") // double-encoded
                .replaceAll("&nbsp;", " ") // standard nbsp entity
                .replaceAll("\u00a0", " "); // real non-breaking space character

        return clean.trim();
    }

    private ArticleDto.ArticleResponse mapToResponse(Article article) {
        return ArticleDto.ArticleResponse.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(sanitizeContent(article.getContent())) // clean on read
                .summary(sanitizeContent(article.getSummary())) // clean on read
                .category(article.getCategory())
                .tags(article.getTags())
                .authorUsername(article.getAuthor().getUsername())
                .authorEmail(article.getAuthor().getEmail())
                .authorId(article.getAuthor().getId())
                .createdAt(article.getCreatedAt())
                .updatedAt(article.getUpdatedAt())
                .build();
    }
}

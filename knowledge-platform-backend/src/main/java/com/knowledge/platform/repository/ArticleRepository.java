package com.knowledge.platform.repository;

import com.knowledge.platform.entity.Article;
import com.knowledge.platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    // JOIN FETCH so author is loaded in a single SQL query (fixes N+1)
    @Query("SELECT a FROM Article a JOIN FETCH a.author ORDER BY a.createdAt DESC")
    List<Article> findAllByOrderByCreatedAtDesc();

    @Query("SELECT a FROM Article a JOIN FETCH a.author WHERE a.author = :author ORDER BY a.createdAt DESC")
    List<Article> findByAuthor(@Param("author") User author);

    @Query("SELECT a FROM Article a JOIN FETCH a.author u WHERE " +
            "LOWER(a.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(a.tags) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(u.username) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "ORDER BY a.createdAt DESC")
    List<Article> searchArticles(@Param("query") String query);

    @Query("SELECT a FROM Article a JOIN FETCH a.author u WHERE " +
            "(:query IS NULL OR :query = '' OR " +
            " LOWER(a.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            " LOWER(a.tags) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            " LOWER(u.username) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
            "(:category IS NULL OR :category = '' OR LOWER(a.category) = LOWER(:category)) " +
            "ORDER BY a.createdAt DESC")
    List<Article> searchAndFilter(@Param("query") String query, @Param("category") String category);

    @Query("SELECT a FROM Article a JOIN FETCH a.author WHERE a.id = :id")
    Optional<Article> findByIdWithAuthor(@Param("id") Long id);
}

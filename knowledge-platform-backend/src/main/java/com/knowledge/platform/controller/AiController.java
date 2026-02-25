package com.knowledge.platform.controller;

import com.knowledge.platform.dto.AiDto;
import com.knowledge.platform.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/improve")
    public ResponseEntity<AiDto.AiResponse> improveContent(@RequestBody AiDto.AiRequest request) {
        String result = aiService.improveContent(request.getContent(), request.getAction());
        return ResponseEntity.ok(AiDto.AiResponse.builder()
                .result(result)
                .action(request.getAction() != null ? request.getAction() : "improve")
                .success(true)
                .build());
    }

    @PostMapping("/summary")
    public ResponseEntity<AiDto.AiResponse> generateSummary(@RequestBody AiDto.AiRequest request) {
        String summary = aiService.generateSummary(request.getContent());
        return ResponseEntity.ok(AiDto.AiResponse.builder()
                .result(summary)
                .action("summary")
                .success(true)
                .build());
    }

    @PostMapping("/tags")
    public ResponseEntity<?> suggestTags(@RequestBody AiDto.AiRequest request) {
        List<String> tags = aiService.suggestTags(request.getContent(), request.getTitle());
        return ResponseEntity.ok(java.util.Map.of(
                "tags", tags,
                "success", true));
    }
}

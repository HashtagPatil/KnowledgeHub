package com.knowledge.platform.service;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

/**
 * AI Service — Smart mock that performs real text transformations.
 *
 * Grammar Fix → Corrects capitalization, spacing, punctuation, common typos.
 * Improve → Rewrites into polished, structured, professional prose.
 * Concise → Keeps only the core ideas (≈50% shorter).
 * Title Suggest→ Generates 3 SEO-friendly titles from content keywords.
 * Summary → Extracts a clear, readable overview ≤ 220 chars.
 * Tags → Keyword-based multi-domain tag extraction.
 *
 * Drop-in replacement: Swap private helpers with real OpenAI/Claude calls.
 */
@Service
public class AiService {

    // ── Public API ──────────────────────────────────────────────────────────

    public String improveContent(String content, String action) {
        if (content == null || content.isBlank())
            return "Please provide some content to improve.";

        String plain = stripHtml(content);

        return switch (action != null ? action.toLowerCase() : "improve") {
            case "grammar" -> fixGrammar(plain);
            case "concise" -> makeConcise(plain);
            case "title" -> suggestTitles(plain);
            default -> improveWriting(plain);
        };
    }

    public String generateSummary(String content) {
        if (content == null || content.isBlank())
            return "";
        String plain = stripHtml(content);
        return buildSummary(plain, 220);
    }

    public List<String> suggestTags(String content, String title) {
        if (content == null || content.isBlank())
            return Collections.emptyList();

        String haystack = (Optional.ofNullable(title).orElse("") + " " + content)
                .toLowerCase()
                .replaceAll("<[^>]+>", "")
                .replaceAll("[^a-z0-9 .]", " ");

        // Extended keyword → tag map (ordered: first match wins per slot)
        Map<String, String[]> kb = new LinkedHashMap<>();
        kb.put("java", new String[] { "java", "jvm", "maven", "gradle", "junit" });
        kb.put("spring-boot", new String[] { "spring boot", "springboot", "spring", "@component", "@bean" });
        kb.put("react", new String[] { "react", "jsx", "hooks", "useState", "useeffect", "component" });
        kb.put("javascript", new String[] { "javascript", "js", "typescript", "node", "npm", "es6" });
        kb.put("python", new String[] { "python", "django", "flask", "pandas", "numpy", "pip" });
        kb.put("docker", new String[] { "docker", "dockerfile", "container", "image", "compose" });
        kb.put("kubernetes", new String[] { "kubernetes", "k8s", "pod", "helm", "cluster", "kubectl" });
        kb.put("database", new String[] { "mysql", "postgresql", "mongodb", "sql", "database", "hibernate", "jpa" });
        kb.put("rest-api", new String[] { "rest", "api", "endpoint", "http", "json", "crud" });
        kb.put("graphql", new String[] { "graphql", "query", "mutation", "schema" });
        kb.put("machine-learning",
                new String[] { "machine learning", "ml", "deep learning", "neural", "model", "dataset" });
        kb.put("devops", new String[] { "devops", "ci/cd", "jenkins", "github actions", "pipeline", "deploy" });
        kb.put("security", new String[] { "security", "jwt", "oauth", "authentication", "authorization", "encrypt" });
        kb.put("cloud", new String[] { "aws", "azure", "gcp", "cloud", "lambda", "s3", "ec2" });
        kb.put("microservices", new String[] { "microservice", "service mesh", "api gateway", "event-driven" });
        kb.put("system-design", new String[] { "system design", "scalability", "load balancer", "cache", "redis" });
        kb.put("algorithms", new String[] { "algorithm", "sorting", "complexity", "big o", "data structure" });
        kb.put("git", new String[] { "git", "github", "merge", "commit", "branch", "pull request" });

        List<String> tags = new ArrayList<>();
        for (Map.Entry<String, String[]> e : kb.entrySet()) {
            for (String kw : e.getValue()) {
                if (haystack.contains(kw)) {
                    tags.add(e.getKey());
                    break;
                }
            }
            if (tags.size() >= 6)
                break;
        }
        return tags;
    }

    // ── Grammar Fix ─────────────────────────────────────────────────────────

    private String fixGrammar(String text) {
        String t = text;

        // 1. Fix spacing issues (no-space before/after punctuation)
        t = t.replaceAll("\\s+([.,!?;:])", "$1");
        t = t.replaceAll("([.,!?;:])([a-zA-Z])", "$1 $2");

        // 2. Fix lowercase 'i' → 'I' (standalone)
        t = t.replaceAll("(?<![a-zA-Z])\\bi\\b(?![a-zA-Z])", "I");

        // 3. Capitalize first letter of each sentence
        t = capitalizeSentences(t);

        // 4. Fix common doubled words (the the, is is, etc.)
        t = t.replaceAll("\\b(\\w+) \\1\\b", "$1");

        // 5. Fix multiple spaces
        t = t.replaceAll(" {2,}", " ").trim();

        // 6. Fix missing space after comma
        t = t.replaceAll(",([^ \\n])", ", $1");

        // 7. Ensure sentence ends with period if missing
        if (!t.isEmpty() && !t.matches(".*[.!?]\\s*$")) {
            t = t + ".";
        }

        return t;
    }

    // ── Improve Writing ─────────────────────────────────────────────────────

    private String improveWriting(String text) {
        // Split into sentences and improve each one
        String[] sentences = text.split("(?<=[.!?])\\s+");
        StringBuilder improved = new StringBuilder();

        for (String sentence : sentences) {
            String s = sentence.trim();
            if (s.isEmpty())
                continue;

            // Fix grammar first
            s = fixGrammar(s);

            // Improve passive/weak language
            s = s.replaceAll("(?i)\\bis very\\b", "is exceptionally");
            s = s.replaceAll("(?i)\\bvery (\\w+)\\b", "highly $1");
            s = s.replaceAll("(?i)\\ba lot of\\b", "numerous");
            s = s.replaceAll("(?i)\\bgets\\b", "becomes");
            s = s.replaceAll("(?i)\\bgot\\b", "obtained");
            s = s.replaceAll("(?i)\\bshow\\b", "demonstrate");
            s = s.replaceAll("(?i)\\buse\\b", "utilize");
            s = s.replaceAll("(?i)\\bhelp\\b", "facilitate");
            s = s.replaceAll("(?i)\\bmake it easy\\b", "simplify the process");
            s = s.replaceAll("(?i)\\bstart\\b", "initiate");
            s = s.replaceAll("(?i)\\bend\\b", "conclude");
            s = s.replaceAll("(?i)\\bbig\\b", "substantial");
            s = s.replaceAll("(?i)\\bgood\\b", "effective");
            s = s.replaceAll("(?i)\\bbad\\b", "problematic");
            s = s.replaceAll("(?i)\\bstuff\\b", "components");
            s = s.replaceAll("(?i)\\bthing\\b", "element");
            s = s.replaceAll("(?i)\\bthings\\b", "aspects");

            improved.append(s).append(" ");
        }

        String result = improved.toString().trim();

        // Add a professional closing sentence if content seems like an article
        if (sentences.length >= 2 && !result.endsWith("more.") && !result.endsWith("learn.")) {
            result += " Understanding these concepts thoroughly will empower you to build more robust and maintainable solutions.";
        }

        return result;
    }

    // ── Make Concise ────────────────────────────────────────────────────────

    private String makeConcise(String text) {
        String[] sentences = text.split("(?<=[.!?])\\s+");
        if (sentences.length <= 2) {
            // For very short text, trim fillers
            return removeFillerWords(fixGrammar(text));
        }

        // Keep ~50% of sentences — pick the most "informative" ones
        // Score = number of technical/meaningful words
        List<String[]> scored = new ArrayList<>();
        for (String s : sentences) {
            String clean = s.trim();
            if (clean.isEmpty())
                continue;
            int score = scoreSentence(clean);
            scored.add(new String[] { clean, String.valueOf(score) });
        }

        // Sort by score desc, keep top 50%
        scored.sort((a, b) -> Integer.compare(
                Integer.parseInt(b[1]), Integer.parseInt(a[1])));

        int keep = Math.max(1, (int) Math.ceil(scored.size() * 0.5));
        List<String> topSentences = scored.subList(0, keep)
                .stream().map(a -> a[0]).collect(Collectors.toList());

        // Restore original order
        StringBuilder result = new StringBuilder();
        for (String s : sentences) {
            String clean = s.trim();
            if (topSentences.contains(clean)) {
                result.append(removeFillerWords(clean)).append(" ");
            }
        }

        return result.toString().trim();
    }

    // ── Title Suggestions ───────────────────────────────────────────────────

    private String suggestTitles(String text) {
        String clean = text.replaceAll("[^a-zA-Z0-9 ]", " ").replaceAll(" {2,}", " ");
        String[] words = clean.split("\\s+");

        // Find most meaningful 4-6 words (skip stopwords)
        Set<String> stopwords = new HashSet<>(Arrays.asList(
                "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
                "have", "has", "had", "do", "does", "did", "will", "would", "could",
                "should", "may", "might", "shall", "can", "to", "of", "in", "on", "at",
                "by", "for", "with", "about", "as", "this", "that", "these", "those",
                "it", "its", "i", "we", "you", "he", "she", "they", "and", "or", "but",
                "not", "so", "yet", "both", "either", "nor", "just", "than", "when", "if"));

        List<String> meaningful = Arrays.stream(words)
                .filter(w -> w.length() > 3 && !stopwords.contains(w.toLowerCase()))
                .distinct()
                .limit(8)
                .collect(Collectors.toList());

        String topic = meaningful.isEmpty()
                ? capitalize(clean.substring(0, Math.min(40, clean.length())))
                : capitalize(String.join(" ", meaningful.subList(0, Math.min(5, meaningful.size()))));

        String firstWord = meaningful.isEmpty() ? "This Topic" : capitalize(meaningful.get(0));
        String twoWords = meaningful.size() < 2 ? firstWord
                : capitalize(meaningful.get(0)) + " and " + capitalize(meaningful.get(1));

        return "1. " + topic + "\n" +
                "2. A Complete Guide to " + twoWords + "\n" +
                "3. Mastering " + firstWord + ": Best Practices & Examples\n" +
                "4. " + firstWord + " Explained: From Basics to Advanced\n" +
                "5. How to Work with " + twoWords + " Effectively";
    }

    // ── Summary Builder ─────────────────────────────────────────────────────

    private String buildSummary(String text, int maxLen) {
        if (text.length() <= maxLen)
            return text;

        // Try to find clean sentence boundary
        String[] sentences = text.split("(?<=[.!?])\\s+");
        StringBuilder sb = new StringBuilder();
        for (String s : sentences) {
            if (sb.length() + s.length() + 1 > maxLen)
                break;
            sb.append(s).append(" ");
        }
        String result = sb.toString().trim();
        if (result.isEmpty())
            result = text.substring(0, Math.min(maxLen, text.length())).trim();

        return result + (result.length() < text.length() ? "..." : "");
    }

    // ── Helpers ─────────────────────────────────────────────────────────────

    private String stripHtml(String html) {
        return html.replaceAll("<[^>]+>", "")
                .replaceAll("&nbsp;", " ")
                .replaceAll("&amp;", "&")
                .replaceAll("&lt;", "<")
                .replaceAll("&gt;", ">")
                .replaceAll("&quot;", "\"")
                .replaceAll("\u00a0", " ")
                .replaceAll("\\s{2,}", " ")
                .trim();
    }

    private String capitalizeSentences(String text) {
        // Capitalize first letter after sentence-ending punctuation
        StringBuilder sb = new StringBuilder();
        boolean capitalizeNext = true;
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (capitalizeNext && Character.isLetter(c)) {
                sb.append(Character.toUpperCase(c));
                capitalizeNext = false;
            } else {
                sb.append(c);
            }
            if (c == '.' || c == '!' || c == '?') {
                capitalizeNext = true;
            }
        }
        return sb.toString();
    }

    private String removeFillerWords(String text) {
        return text
                .replaceAll("(?i)\\bbasically\\b,?\\s*", "")
                .replaceAll("(?i)\\bactually\\b,?\\s*", "")
                .replaceAll("(?i)\\bjust\\b\\s*", "")
                .replaceAll("(?i)\\bsimply\\b\\s*", "")
                .replaceAll("(?i)\\bvery\\s+(\\w+)\\b", "$1")
                .replaceAll("(?i)\\breally\\s+(\\w+)\\b", "$1")
                .replaceAll(" {2,}", " ")
                .trim();
    }

    private int scoreSentence(String sentence) {
        // Higher score = more information-dense
        String[] technicalWords = {
                "implement", "configure", "deploy", "build", "create", "manage",
                "optimize", "design", "integrate", "develop", "define", "enable",
                "support", "provide", "require", "allow", "ensure", "handle",
                "process", "generate", "execute", "initialize", "authenticate",
                "authorize", "encrypt", "cache", "scale", "monitor", "test"
        };
        int score = sentence.split("\\s+").length; // base = word count
        for (String tw : technicalWords) {
            if (sentence.toLowerCase().contains(tw))
                score += 3;
        }
        return score;
    }

    private String capitalize(String text) {
        if (text == null || text.isEmpty())
            return text;
        return Character.toUpperCase(text.charAt(0)) + text.substring(1);
    }

    /*
     * ── Real OpenAI Integration (drop-in) ─────────────────────────────────
     * 1. Add spring.ai.openai.api-key=YOUR_KEY to application.properties
     * 2. Add spring-ai-openai-spring-boot-starter to pom.xml
     * 3. Inject ChatClient and replace each private helper:
     *
     * return chatClient.prompt()
     * .user("Improve grammar of: " + text)
     * .call().content();
     */
}

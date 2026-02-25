# Knowledge Sharing Platform — Backend

A RESTful API built with **Java 17 + Spring Boot 3**, **MySQL 8**, and **JWT-based authentication**.

---

## 🏗️ Architecture Overview

```
knowledge-platform-backend/
├── src/main/java/com/knowledge/platform/
│   ├── KnowledgePlatformApplication.java
│   ├── config/
│   │   └── SecurityConfig.java         # Spring Security + CORS
│   ├── controller/
│   │   ├── AuthController.java         # /api/auth/*
│   │   ├── ArticleController.java      # /api/articles/*
│   │   └── AiController.java           # /api/ai/*
│   ├── dto/
│   │   ├── AuthDto.java
│   │   ├── ArticleDto.java
│   │   └── AiDto.java
│   ├── entity/
│   │   ├── User.java
│   │   └── Article.java
│   ├── exception/
│   │   └── GlobalExceptionHandler.java
│   ├── repository/
│   │   ├── UserRepository.java
│   │   └── ArticleRepository.java
│   ├── security/
│   │   ├── JwtUtil.java
│   │   └── JwtAuthFilter.java
│   └── service/
│       ├── AuthService.java
│       ├── ArticleService.java
│       └── AiService.java              # Mocked AI (OpenAI-ready)
└── src/main/resources/
    └── application.properties
```

**Key Design Decisions:**
- Stateless JWT auth (no sessions)
- Author-only edit/delete enforced at service layer
- AI service abstracted behind interface — swap mock for real OpenAI in one class
- `createDatabaseIfNotExist=true` in JDBC URL, JPA auto-creates tables

---

## 🤖 AI Usage

| Where | Tool | How AI Helped |
|---|---|---|
| Spring Security config | Claude / ChatGPT | Generated initial filter chain + CORS config, manually tuned stateless session |
| JWT utility class | GitHub Copilot | Generated token generate/validate template, manually adapted for JJWT 0.11 |
| JPQL search queries | Claude | Suggested `searchAndFilter` query with optional params |
| AiService mock | ChatGPT | Suggested realistic mock responses with sentence extraction logic |
| Global exception handler | Copilot | Generated ControllerAdvice skeleton, manually added field-level validation errors |
| README | Claude | Drafted structure, manually added accurate file paths and custom notes |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | Public | Register user |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| POST | `/api/auth/logout` | Protected | Logout (client drops token) |

### Articles
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/articles` | Public | Get all articles |
| GET | `/api/articles?query=X&category=Y` | Public | Search & filter |
| GET | `/api/articles/{id}` | Public | Get single article |
| POST | `/api/articles` | Protected | Create article |
| PUT | `/api/articles/{id}` | Protected (author only) | Update article |
| DELETE | `/api/articles/{id}` | Protected (author only) | Delete article |
| GET | `/api/articles/my` | Protected | Get current user's articles |

### AI
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/ai/improve` | Protected | Improve/rewrite content |
| POST | `/api/ai/summary` | Protected | Generate summary |
| POST | `/api/ai/tags` | Protected | Suggest tags |

---

## ⚙️ Setup Instructions

### Prerequisites
- Java 17+
- Maven 3.8+
- MySQL 8.0+

### Environment Setup

1. **Create MySQL database** (or let the app auto-create it):
```sql
CREATE DATABASE knowledge_platform;
```

2. **Configure** `src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

3. **Run the application:**
```bash
cd knowledge-platform-backend
./mvnw spring-boot:run
# OR
mvn spring-boot:run
```

4. **Verify it's running:**
```bash
curl http://localhost:8080/api/articles
```

---

## 🧪 Quick API Test

```bash
# 1. Signup
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","email":"demo@test.com","password":"Demo@123"}'

# 2. Login → copy "token" from response
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@test.com","password":"Demo@123"}'

# 3. Create article (replace TOKEN)
curl -X POST http://localhost:8080/api/articles \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Post","content":"<p>Hello world!</p>","category":"Tech","tags":"java,spring"}'

# 4. AI improve
curl -X POST http://localhost:8080/api/ai/improve \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"this is some content that needs improvement","action":"improve"}'
```

---

## 🔑 To Enable Real OpenAI
1. Add to `pom.xml`: `spring-ai-openai-spring-boot-starter`
2. Add to `application.properties`: `spring.ai.openai.api-key=YOUR_KEY`
3. In `AiService.java`, inject `ChatClient` and replace mock methods with API calls

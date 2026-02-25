-- ============================================================
-- Knowledge Platform — Seed Data
-- Run this in your MySQL database: USE knowledge_platform;
-- All passwords are BCrypt-encoded "Pass@1234"
-- ============================================================

-- ── Users ──────────────────────────────────────────────────
INSERT INTO users (username, email, password, role, created_at) VALUES
('alice_dev',    'alice@example.com',   '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6JxLB/2xQu', 'USER', NOW()),
('bob_backend',  'bob@example.com',     '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6JxLB/2xQu', 'USER', NOW()),
('carol_ml',     'carol@example.com',   '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6JxLB/2xQu', 'USER', NOW()),
('dave_cloud',   'dave@example.com',    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6JxLB/2xQu', 'USER', NOW()),
('eve_security', 'eve@example.com',     '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6JxLB/2xQu', 'USER', NOW());

-- NOTE: The BCrypt hash above is for "Pass@1234"
-- If login fails, regenerate with: https://bcrypt-generator.com (rounds=12)
-- Or register each user via the /api/auth/signup endpoint instead.

-- ── Alice's Articles — React & JavaScript ──────────────────
INSERT INTO articles (title, content, summary, category, tags, author_id, created_at, updated_at) VALUES
(
  'Mastering React Hooks: A Complete Guide',
  'React Hooks revolutionized how we write functional components. With useState, useEffect, useContext, useReducer, and custom hooks, we can manage complex state without class components.\n\nuseState is the most fundamental hook, allowing components to hold local state. useEffect replaces lifecycle methods in a single API.\n\nCustom hooks are the real power: they let you extract stateful logic into reusable functions. A useFetch hook encapsulates loading, error, and data state for any API call.\n\nPerformance hooks like useMemo and useCallback prevent unnecessary re-renders by memoizing values and functions respectively.',
  'React Hooks replaced class component lifecycle methods, enabling cleaner state and side-effect management with useState, useEffect, and powerful custom hooks.',
  'Tech', 'react,javascript,frontend,hooks',
  (SELECT id FROM users WHERE email = 'alice@example.com'), NOW(), NOW()
),
(
  'TypeScript Best Practices for Large Codebases',
  'TypeScript adds static typing to JavaScript, catching bugs at compile time. Always prefer interface over type for object shapes. Enable strict mode in tsconfig.json.\n\nNever use the `any` type — use `unknown` instead and narrow it. Generic functions make utilities reusable. Utility types — Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Readonly<T> — are your best friends.\n\nUse discriminated unions for state machines and exhaustive type checking to ensure all cases are handled at compile time.',
  'TypeScript best practices: prefer interface over type, enable strict mode, avoid any, use generics and utility types like Partial and Readonly for safer large codebases.',
  'Tech', 'typescript,javascript,frontend',
  (SELECT id FROM users WHERE email = 'alice@example.com'), NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY
),
(
  'CSS Grid and Flexbox: When to Use Each',
  'CSS Grid and Flexbox solve different layout problems. Flexbox is one-dimensional — it lays items in a row or column. CSS Grid is two-dimensional — it controls both rows and columns simultaneously.\n\nThe golden rule: Flexbox for components (micro-layout), Grid for page structure (macro-layout).\n\nGrid grid-template-columns: repeat(3, 1fr) creates three equal columns. grid-template-areas lets you name zones semantically. For responsive design, combine both.',
  'Use Flexbox for one-dimensional component layouts and CSS Grid for two-dimensional page structure — combining both gives maximum layout control.',
  'Tech', 'css,frontend,web-design',
  (SELECT id FROM users WHERE email = 'alice@example.com'), NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY
),
(
  'State Management in React: Redux vs Zustand vs Context',
  'Choosing the right state management is one of the most debated React decisions.\n\nContext API is perfect for low-frequency updates (themes, auth, locale) but re-renders all consumers on every change.\n\nRedux Toolkit (RTK) is the gold standard for large apps with time-travel debugging, middleware, and RTK Query for data fetching.\n\nZustand is the rising star — minimal boilerplate, no providers, excellent performance. Decision: Small app → Context; Medium → Zustand; Large enterprise → Redux Toolkit.',
  'Context API suits low-frequency updates, Redux Toolkit provides predictable state for large apps, and Zustand offers minimal boilerplate for medium-complexity applications.',
  'Tech', 'react,state-management,javascript',
  (SELECT id FROM users WHERE email = 'alice@example.com'), NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY
),
(
  'Building Accessible Web Applications with ARIA',
  'Web accessibility ensures applications are usable by people with disabilities. ARIA attributes fill the gap between native HTML semantics and complex dynamic components.\n\narole defines the element purpose, aria-label provides text alternatives, aria-hidden hides decorative content. Always prefer semantic HTML over ARIA — a <button> is better than <div role="button">.\n\nKeyboard navigation is critical: every interactive element must be Tab-reachable. Test with NVDA, VoiceOver, and TalkBack screen readers.',
  'ARIA and semantic HTML together ensure web accessibility. Prefer native elements, use ARIA for complex components, and always test with real screen readers.',
  'Tech', 'accessibility,html,frontend,react',
  (SELECT id FROM users WHERE email = 'alice@example.com'), NOW() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY
);

-- ── Bob's Articles — Java / Spring Boot ────────────────────
INSERT INTO articles (title, content, summary, category, tags, author_id, created_at, updated_at) VALUES
(
  'Spring Boot Annotations Explained: A to Z',
  '@SpringBootApplication is a composite of @Configuration, @EnableAutoConfiguration, and @ComponentScan.\n\n@RestController combines @Controller and @ResponseBody. @GetMapping, @PostMapping handle specific HTTP verbs.\n\n@Autowired injects dependencies — prefer constructor injection for testability. @Transactional ensures database transaction integrity on service methods. @Value injects application.properties values.',
  'Spring Boot annotations like @SpringBootApplication, @RestController, @Autowired, and @Transactional form the framework backbone for building production-grade applications.',
  'Backend', 'spring-boot,java,backend',
  (SELECT id FROM users WHERE email = 'bob@example.com'), NOW(), NOW()
),
(
  'Spring Security with JWT: Complete Implementation',
  'JWT authentication flow: User sends credentials → AuthController validates → JwtUtil generates signed token → client stores it → every request sends Authorization: Bearer <token> → JwtAuthFilter validates and sets SecurityContext.\n\nConfigure SessionCreationPolicy.STATELESS to prevent server-side sessions. Use HS256 algorithm with a secret key stored in environment variables — never in source code.',
  'JWT-based Spring Security uses JwtAuthFilter to validate tokens on every request, set SecurityContext, and enable stateless authentication at scale.',
  'Backend', 'spring-boot,java,security,jwt',
  (SELECT id FROM users WHERE email = 'bob@example.com'), NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY
),
(
  'Hibernate and JPA: Solving the N+1 Problem',
  'The N+1 problem fetches 100 articles then issues 100 more queries for each author = 101 queries total.\n\nSolution 1 — JOIN FETCH: "SELECT a FROM Article a JOIN FETCH a.author"\nSolution 2 — @EntityGraph: attributePaths loading specific relations\nSolution 3 — @BatchSize(size=20)\n\nEnable show-sql=true to detect N+1 issues in development. Hypersistence Optimizer detects them automatically.',
  'N+1 Hibernate problem causes N+1 SQL queries for associations. Fix with JOIN FETCH, @EntityGraph, or batch size configuration to load data efficiently in a single query.',
  'Backend', 'java,hibernate,jpa,database',
  (SELECT id FROM users WHERE email = 'bob@example.com'), NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY
),
(
  'Microservices with Spring Boot: Service Discovery',
  'Eureka Server acts as a service registry — microservices register on startup and discover each other dynamically. Spring Cloud LoadBalancer distributes traffic across instances.\n\nSpring Cloud Gateway handles routing, authentication, rate limiting. OpenFeign creates declarative REST clients from annotated interfaces. Resilience4j Circuit Breaker prevents cascade failures.',
  'Spring Cloud enables microservices with Eureka discovery, Gateway routing, OpenFeign clients, and Resilience4j circuit breaking for fault-tolerant distributed systems.',
  'Backend', 'spring-boot,microservices,java',
  (SELECT id FROM users WHERE email = 'bob@example.com'), NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY
),
(
  'RESTful API Design: Versioning, Pagination, and Errors',
  'API Versioning: URI versioning (/api/v1/) is most explicit. Always paginate list endpoints returning total count, page number, page size, and navigation links.\n\nError handling: Use @ControllerAdvice for centralized responses returning { status, message, timestamp, path }. HTTP status codes: 400=validation, 401=auth, 403=forbidden, 404=not found.\n\nDocument with OpenAPI/Swagger via @Operation and @ApiResponse annotations.',
  'Well-designed REST APIs require versioning strategy, cursor pagination with metadata, and centralized error handling with consistent response bodies and correct HTTP status codes.',
  'Backend', 'java,rest-api,spring-boot,backend',
  (SELECT id FROM users WHERE email = 'bob@example.com'), NOW() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY
);

-- ── Carol's Articles — Machine Learning / AI ───────────────
INSERT INTO articles (title, content, summary, category, tags, author_id, created_at, updated_at) VALUES
(
  'Introduction to Neural Networks: Perceptron to Deep Learning',
  'A neuron takes inputs, applies weights, adds bias, and passes through an activation function. Multi-layer Perceptrons with hidden layers learn complex patterns via backpropagation.\n\nCNNs excel at image recognition. RNNs and LSTMs handle sequences. Transformers use self-attention to relate every token to every other — powering BERT, GPT, and T5.\n\nKey hyperparameters: learning rate, batch size, activation functions (ReLU, Sigmoid). Dropout and batch normalization prevent overfitting.',
  'Neural networks learn through weighted layers and backpropagation. CNNs handle images, RNNs handle sequences, and Transformers with self-attention power modern NLP.',
  'AI', 'machine-learning,deep-learning,python,ai',
  (SELECT id FROM users WHERE email = 'carol@example.com'), NOW(), NOW()
),
(
  'ML Model Deployment with Docker and FastAPI',
  'FastAPI generates OpenAPI documentation automatically. Load your trained model once at startup using lifespan events — cache it globally to avoid reloading on every request.\n\nDockerize with multi-stage builds: Stage 1 installs dependencies, Stage 2 copies venv + model. Use slim base images.\n\nAdd health check endpoints, Pydantic request validation, and horizontal scaling with Kubernetes HPA based on request latency.',
  'Deploy ML models with FastAPI for prediction endpoints, Pydantic validation, and Docker multi-stage builds — then scale horizontally with Kubernetes autoscaling.',
  'AI', 'machine-learning,docker,python,api,devops',
  (SELECT id FROM users WHERE email = 'carol@example.com'), NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY
),
(
  'Feature Engineering: Teaching Machines What Matters',
  'Numerical features need normalization (min-max) or standardization (z-score). Categorical features use one-hot encoding for nominal and label encoding for ordinal data.\n\nDate features: extract year, month, day-of-week. Encode cyclical features (hour, month) as sine/cosine pairs. Text: TF-IDF or BERT embeddings.\n\nFeature selection: remove >0.95 correlated features. Use tree model feature importance or recursive feature elimination.',
  'Feature engineering transforms raw data via scaling, encoding, and domain transformations — often impacting model performance more than algorithm choice.',
  'AI', 'machine-learning,python,data-science',
  (SELECT id FROM users WHERE email = 'carol@example.com'), NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY
),
(
  'NLP with Transformers and HuggingFace',
  'The Transformer architecture introduced self-attention: every token attends to every other token simultaneously. HuggingFace provides thousands of pre-trained models for fine-tuning.\n\nfrom transformers import AutoTokenizer, AutoModelForSequenceClassification — three lines to load BERT.\n\nCommon tasks: text classification, NER, question answering, summarization. Use fp16 precision and gradient checkpointing for large model efficiency.',
  'HuggingFace Transformers enables rapid NLP via transfer learning from BERT and GPT-2 — fine-tune on task-specific datasets for classification, NER, and text generation.',
  'AI', 'machine-learning,nlp,python,transformers,ai',
  (SELECT id FROM users WHERE email = 'carol@example.com'), NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY
),
(
  'Explainable AI: Making Black Box Models Transparent',
  'SHAP explains each feature contribution using game theory. shap.TreeExplainer handles XGBoost and LightGBM. LIME creates a local linear approximation of any black-box prediction.\n\nAttention visualization with BertViz shows which tokens the model focused on. Counterfactual explanations (DiCE) answer: "What is the smallest change to reverse this decision?"\n\nFairness evaluation with IBM AI Fairness 360 detects bias across protected attributes.',
  'SHAP, LIME, and attention visualization reveal model decisions, enabling trust, regulatory compliance (GDPR, EU AI Act), and bias detection in high-stakes AI applications.',
  'AI', 'machine-learning,ai,python,data-science',
  (SELECT id FROM users WHERE email = 'carol@example.com'), NOW() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY
);

-- ── Dave's Articles — Cloud / DevOps ───────────────────────
INSERT INTO articles (title, content, summary, category, tags, author_id, created_at, updated_at) VALUES
(
  'Docker in Production: Security Hardening Guide',
  'Use alpine or distroless base images and pin specific digest hashes — never use latest in production.\n\nRun containers as non-root: add addgroup/adduser and USER directive. Multi-stage builds separate build dependencies from runtime. Always set --memory and --cpu-shares limits.\n\nUse --read-only flag. Scan images with Trivy: trivy image myapp:prod. Rotate secrets via Docker Secrets or HashiCorp Vault.',
  'Production Docker requires minimal images, non-root users, multi-stage builds, resource limits, read-only filesystems, and regular vulnerability scanning with Trivy or Snyk.',
  'DevOps', 'docker,devops,security,cloud',
  (SELECT id FROM users WHERE email = 'dave@example.com'), NOW(), NOW()
),
(
  'Kubernetes Deep Dive: Pods, Deployments, and Services',
  'Pods are the smallest K8s unit — one or more containers sharing network and storage. They are ephemeral: never rely on their IP addresses.\n\nDeployments manage ReplicaSets for rolling updates with zero downtime (maxSurge, maxUnavailable). Services provide stable DNS: ClusterIP (internal), NodePort, LoadBalancer, ExternalName.\n\nSet CPU/memory requests (minimum guaranteed) and limits (maximum). HPA scales Pods based on metrics.',
  'Kubernetes Pods, Deployments for rolling updates, Services for stable networking, and HPA for auto-scaling form the core runtime primitives for production container orchestration.',
  'DevOps', 'kubernetes,docker,devops,cloud',
  (SELECT id FROM users WHERE email = 'dave@example.com'), NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY
),
(
  'CI/CD Pipelines with GitHub Actions',
  'GitHub Actions YAML workflows in .github/workflows/ define pipelines with triggers, jobs, and steps. A standard CI pipeline: checkout → setup environment → install deps → run tests → build → scan → push Docker image.\n\nCache dependencies with actions/cache to reduce job time from 5 min to 30 sec. Use Environments with required reviewers for production deployments. Reusable workflows share jobs across repositories.',
  'GitHub Actions enables CI/CD with YAML workflows covering testing, Docker builds, vulnerability scanning, and environment-gated deployments with approval gates.',
  'DevOps', 'devops,cicd,github,docker',
  (SELECT id FROM users WHERE email = 'dave@example.com'), NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY
),
(
  'AWS High-Availability Architecture Patterns',
  'Spread EC2 instances across multiple Availability Zones behind an Application Load Balancer. Auto Scaling Groups automatically add/remove instances based on CloudWatch metrics.\n\nRDS Multi-AZ synchronously replicates to a standby in a different AZ with automatic failover under 2 minutes. S3 provides eleven 9s durability. CloudFront CDN distributes content globally.\n\nDefine RTO and RPO for disaster recovery. Implement cross-region replication for critical data.',
  'AWS HA architecture uses multi-AZ deployments with ALB, Auto Scaling, RDS Multi-AZ failover, and CloudFront CDN for globally distributed, highly available applications.',
  'Cloud', 'aws,cloud,devops,system-design',
  (SELECT id FROM users WHERE email = 'dave@example.com'), NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY
),
(
  'Infrastructure as Code with Terraform',
  'Terraform providers connect to cloud platforms. Resources declare infrastructure. Variables parameterize configs. The workflow: init → plan → apply → destroy. Always review the plan.\n\nStore state in S3 with DynamoDB locking for teams. Never commit state to version control. Use Modules to package related resources. Workspaces separate environments.\n\nRun terraform fmt and tflint in CI. Tag all resources for cost attribution.',
  'Terraform enables Infrastructure as Code with declarative HCL, remote state in S3 with DynamoDB locking, reusable modules, and pipeline integration for governed changes.',
  'DevOps', 'devops,cloud,aws,terraform',
  (SELECT id FROM users WHERE email = 'dave@example.com'), NOW() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY
);

-- ── Eve's Articles — Security & Databases ──────────────────
INSERT INTO articles (title, content, summary, category, tags, author_id, created_at, updated_at) VALUES
(
  'OWASP Top 10: Preventing Web Vulnerabilities',
  '1. SQL Injection: Use parameterized queries — never concatenate user input.\n2. Broken Authentication: Enforce MFA, account lockout, secure session management.\n3. Sensitive Data: Encrypt at rest (AES-256) and in transit (TLS 1.3). BCrypt passwords with work factor >= 12.\n4. IDOR: Always verify object ownership server-side.\n5. XSS: Encode all output. Use CSP headers. React escapes by default.\n6. CSRF: Use CSRF tokens. SameSite=Strict cookie attribute.',
  'OWASP Top 10 covers injection, broken auth, data exposure, IDOR, and XSS. Prevention requires parameterized queries, strong auth, encryption, and output encoding.',
  'Security', 'security,web,backend',
  (SELECT id FROM users WHERE email = 'eve@example.com'), NOW(), NOW()
),
(
  'PostgreSQL Performance Tuning: Indexes and Query Plans',
  'B-tree indexes suit equality and range queries. GiST/GIN handle full-text search and JSONB. Partial indexes cover only matching rows — smaller and faster. Composite indexes must match WHERE clause order.\n\nEXPLAIN ANALYZE: Seq Scan means no index used. Use PgBouncer for connection pooling — PostgreSQL creates a process per connection.\n\nAUTOVACUUM reclaims dead tuples from updates/deletes. Run VACUUM ANALYZE after bulk operations.',
  'PostgreSQL tuning: strategic indexing (B-tree, GiST, partial), EXPLAIN ANALYZE for query diagnosis, PgBouncer pooling, and VACUUM to reclaim space from dead tuples.',
  'Database', 'database,postgresql,sql,backend',
  (SELECT id FROM users WHERE email = 'eve@example.com'), NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY
),
(
  'Zero Trust Security: Never Trust, Always Verify',
  'Zero Trust assumes breach and verifies every request regardless of origin. Verify explicitly (authenticate and authorize every request), use least privilege (minimum permissions), assume breach (minimize blast radius).\n\nIdentity replaces the network perimeter — MFA is mandatory. Micro-segmentation blocks lateral movement. Service mesh (Istio, Linkerd) enforces mTLS between services.\n\nImplement: SSO + MFA → Zero Trust Network Access → device posture → data classification.',
  'Zero Trust eliminates implicit network trust by continuously verifying identity, device health, and least-privilege access for every request — assuming breach as the baseline.',
  'Security', 'security,cloud,devops,backend',
  (SELECT id FROM users WHERE email = 'eve@example.com'), NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY
),
(
  'Redis Caching Strategies for High Performance',
  'Cache-Aside (Lazy Loading): Check Redis first, on miss fetch from DB and populate cache. Write-Through: Write to cache and DB simultaneously — consistent but higher write latency. Write-Behind: Write to cache, flush to DB async — maximum write speed but risk of data loss.\n\nSet TTL based on data volatility: sessions 30min, product catalog 1hr, exchange rates 5min. Redis Cluster shards data across 16,384 hash slots for horizontal scaling.',
  'Redis caching strategies — cache-aside, write-through, and write-behind — reduce database load dramatically. Choosing the right TTL and data structure maintains performance and consistency.',
  'Database', 'database,redis,backend,system-design',
  (SELECT id FROM users WHERE email = 'eve@example.com'), NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY
),
(
  'SQL Query Optimization: Writing High-Performance Queries',
  'Write WHERE clauses matching index column order. Leading wildcards (LIKE "%term") cannot use B-tree indexes — use full-text search instead. Avoid functions on indexed columns: YEAR(created_at) prevents index use.\n\nCorrelated subqueries execute once per row — replace with JOINs or window functions. SELECT * prevents index-only scans and sends unnecessary data.\n\nWindow functions (ROW_NUMBER, LAG, LEAD) solve complex analytics without multiple subqueries.',
  'High-performance SQL requires index-aware WHERE clauses, avoiding functions on indexed columns, JOINs over correlated subqueries, and window functions for analytics.',
  'Database', 'database,sql,postgresql,backend',
  (SELECT id FROM users WHERE email = 'eve@example.com'), NOW() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY
);

-- ============================================================
-- Verification queries
-- ============================================================
-- SELECT COUNT(*) FROM users;     -- Should return 5
-- SELECT COUNT(*) FROM articles;  -- Should return 25
-- SELECT u.username, COUNT(a.id) as article_count
--   FROM users u LEFT JOIN articles a ON a.author_id = u.id
--   GROUP BY u.username;

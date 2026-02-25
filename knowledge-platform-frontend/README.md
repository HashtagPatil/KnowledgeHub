# Knowledge Sharing Platform — Frontend

A modern, premium-dark React application with Quill rich text editor and AI-assisted writing features.

**Stack:** React 18 + Vite · React Router v6 · Axios · React Quill · react-hot-toast · Lucide Icons

---

## 📁 Folder Structure

```
src/
├── api/
│   └── axios.js              # Axios instance + JWT interceptor
├── context/
│   └── AuthContext.jsx       # Auth state (login/signup/logout)
├── components/
│   ├── Navbar.jsx            # Fixed navbar, auth-aware links
│   ├── ArticleCard.jsx       # Home page card with AI summary
│   ├── AiAssistPanel.jsx     # AI writing assistant UI
│   └── ProtectedRoute.jsx    # JWT-gated route wrapper
├── pages/
│   ├── HomePage.jsx          # Article list, search, filter
│   ├── ArticleDetailPage.jsx # Full article + AI summary badge
│   ├── ArticleFormPage.jsx   # Create/Edit with Quill + AI panel
│   ├── DashboardPage.jsx     # My articles table (edit/delete)
│   ├── LoginPage.jsx
│   └── SignupPage.jsx
├── App.jsx                   # Router + layout
├── main.jsx
└── index.css                 # Full design system (dark glassmorphism)
```

**Key Design Decisions:**
- JWT stored in `localStorage`, attached via Axios request interceptor
- 401 responses auto-redirect to `/login`
- `AuthContext` wraps entire app, provides `user`, `login`, `logout`
- AI assist panel is decoupled — works on any page with a content prop
- Style system uses CSS custom properties — dark, gradient, glassmorphism

---

## 🤖 AI Usage

| Where | Tool | How AI Helped |
|---|---|---|
| Component architecture | Claude | Suggested decoupled `AiAssistPanel` and `ProtectedRoute` pattern |
| index.css design system | ChatGPT | Generated glassmorphism, tokens, Quill dark overrides |
| Axios interceptor | Copilot | Auto-completed request/response interceptor structure |
| AuthContext pattern | Claude | Suggested useCallback for stable context refs, localStorage hydration |
| Dashboard table | ChatGPT | Generated table component skeleton, manually refined delete/edit UX |

---

## 🎨 Pages & Features

| Route | Page | Features |
|---|---|---|
| `/` | Home | Article grid, search by title/content/tags, category filter |
| `/articles/:id` | Article Detail | Full content, AI summary badge, author actions |
| `/articles/new` | Create Article | Quill editor + AI assist panel (all 6 actions) |
| `/articles/:id/edit` | Edit Article | Pre-filled Quill editor + AI assist |
| `/dashboard` | My Articles | Table with edit/delete, empty state |
| `/login` | Login | JWT auth, password toggle |
| `/signup` | Signup | Username/email/password + confirm |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- npm 9+
- Backend running on `http://localhost:8080`

### Install & Run

```bash
cd knowledge-platform-frontend
npm install --legacy-peer-deps
npm run dev
```

Open: http://localhost:5173

### Environment
Create `.env` if you want to change the API URL:
```
VITE_API_URL=http://localhost:8080/api
```
Then update `src/api/axios.js` baseURL to `import.meta.env.VITE_API_URL`.

---

## 🧪 Testing the AI Features

1. Login → Create Article
2. Write some content in the Quill editor
3. In the **AI Writing Assistant** panel, click:
   - **Improve Writing** — rewrites content clearly
   - **Fix Grammar** — grammatical corrections
   - **Make Concise** — shorter version
   - **Suggest Title** — three title options
   - **Generate Summary** — auto-summary (also saved to DB)
   - **Suggest Tags** — keyword-extracted tags (auto-fills tag field)
4. Click **"Apply to Editor"** on improve/grammar/concise results

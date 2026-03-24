# 🌍 GeoQuest — Guess the Country in 20 Questions

> A geography guessing game powered by AI — built with Next.js, React, and TailwindCSS.

---

## 📋 Project Info

| Field | Value |
|-------|-------|
| **Course** | Desarrollo de Aplicaciones Web |
| **Event** | Evento Evaluativo 3 — Mini App React |
| **Stack** | Next.js 14 · React 18 · TailwindCSS · novita.ai |
| **APIs** | REST Countries API · novita.ai (LLaMA 3.1) |

---

## 🎮 How the Game Works

1. The app fetches all countries from the **REST Countries API**
2. One country is **randomly selected** and stored secretly in state
3. The player asks **up to 20 questions** in natural language
4. The **AI (novita.ai)** answers each question using the country's data — without revealing the name
5. The player can **guess the country** at any time (uses 1 question)
6. Game ends when: player guesses correctly ✅ OR uses all 20 questions ❌

---

## 🚀 Getting Started

### 1. Clone or download the project

```bash
git clone https://github.com/your-team/guess-the-country.git
cd guess-the-country
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

Copy the example env file and add your novita.ai key:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NOVITA_API_KEY=your_actual_novita_api_key_here
```

> 🔑 Get a free API key at: https://novita.ai/  
> Go to **Dashboard → API Keys → Create Key**

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
guess-the-country/
│
├── app/                        # Next.js App Router pages
│   ├── layout.jsx              # Root layout (Header + Footer on all pages)
│   ├── page.jsx                # Home page (/)
│   ├── globals.css             # Global styles (Tailwind directives only)
│   ├── game/
│   │   └── page.jsx            # Game page (/game)
│   └── api/
│       └── ask/
│           └── route.js        # API route — proxies requests to novita.ai
│
├── components/                 # Reusable UI components
│   ├── Header.jsx              # Navigation bar (all pages)
│   ├── Footer.jsx              # Footer (all pages)
│   ├── GameBoard.jsx           # Main game UI orchestrator
│   ├── ChatBox.jsx             # Chat message history display
│   ├── QuestionInput.jsx       # Text input for asking questions
│   ├── GuessInput.jsx          # Text input for submitting guesses
│   ├── CountryCard.jsx         # Country info card (shown at game end)
│   ├── LoadingSpinner.jsx      # Animated loading indicator
│   └── ErrorMessage.jsx        # Error display component
│
├── hooks/
│   └── useGame.js              # Custom hook — ALL game state & logic
│
├── services/
│   └── aiService.js            # novita.ai API client & prompt builder
│
├── utils/
│   └── countryUtils.js         # Helper functions for country data
│
├── .env.local.example          # Environment variable template
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── package.json                # Dependencies
```

---

## 🌐 APIs Used

### 1. REST Countries API
- **URL:** `https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,latlng`
- **Used for:** Loading all countries, randomly selecting the mystery country
- **Free:** Yes, no API key needed
- **Where used:** `hooks/useGame.js` (via `useEffect`)

### 2. novita.ai API (LLaMA 3.1 8B)
- **URL:** `https://api.novita.ai/v3/openai/chat/completions`
- **Used for:** Answering the player's questions with AI-generated hints
- **Free tier:** Yes (limited requests)
- **Where used:** `services/aiService.js` + `app/api/ask/route.js`

---

## 🧩 Key React Concepts Demonstrated

| Concept | Where |
|---------|-------|
| `useState` | `hooks/useGame.js` — game state, messages, status |
| `useEffect` | `hooks/useGame.js` — fetching countries on load |
| `useCallback` | `hooks/useGame.js` — stable function references |
| `useRef` | `components/ChatBox.jsx` — auto-scroll to latest message |
| Custom Hook | `hooks/useGame.js` — separates logic from UI |
| API consumption | `hooks/useGame.js` + `services/aiService.js` |
| Loading state | `components/LoadingSpinner.jsx` |
| Error handling | `components/ErrorMessage.jsx` |
| Next.js `Link` | `components/Header.jsx`, `app/page.jsx` |
| API Route | `app/api/ask/route.js` — server-side proxy |
| Server vs Client | `app/game/page.jsx` (server) + `GameBoard.jsx` (client) |

---

## 🎨 Design Decisions

- **TailwindCSS only** — zero custom CSS files, zero Bootstrap
- **Responsive** — works on mobile and desktop
- **Chat UI** — messages appear on left (AI) or right (user), just like WhatsApp
- **Progress bar** — turns red when fewer than 5 questions remain
- **Country reveal** — after the game, the full country card shows (flag, capital, currency, etc.)

---

## 👥 Team Members

| Name | Role |
|------|------|
| Integrante 1 | Frontend & Game Logic |
| Integrante 2 | API Integration & Services |
| Integrante 3 | UI Design & Components |

> Replace with real names before submitting!

---

## 📝 Git Commit Guidelines

Each member must have **at least 3 commits**. Suggested workflow:

```bash
# Member 1 — example commits
git commit -m "feat: add useGame custom hook with state management"
git commit -m "feat: implement askQuestion and submitGuess logic"
git commit -m "fix: handle edge case when countries API fails"

# Member 2 — example commits
git commit -m "feat: create aiService with novita.ai integration"
git commit -m "feat: add /api/ask route for server-side AI calls"
git commit -m "feat: add countryUtils helper functions"

# Member 3 — example commits
git commit -m "feat: build ChatBox component with auto-scroll"
git commit -m "feat: create Header and Footer components"
git commit -m "feat: design home page with team section"
```

---

## 🔧 Build for Production

```bash
npm run build
npm start
```

---

## 📄 License

MIT — Free to use for educational purposes.

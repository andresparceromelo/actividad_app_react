/**
 * app/page.jsx  →  Route: /
 * ─────────────────────────────────────────────────────────────
 * Home page. This is a Server Component (no "use client" needed)
 * because it has no interactivity — just static content.
 *
 * Contains:
 *   - App name & tagline
 *   - Game description
 *   - What problem it solves
 *   - Team members
 *   - CTA button to /game
 * ─────────────────────────────────────────────────────────────
 */

import Link from "next/link";

// ── Team members data ──────────────────────────────────────────
// Edit this array to add your real team member names & roles
const TEAM_MEMBERS = [
  { name: "Andres Bedoya ", role: "melos", emoji: "🫶" },
  { name: "Luis Guerra", role: "the goat", emoji: "🐐" },
  { name: "Tomas Henao", role: "the beast", emoji: "🐒" },
];

// ── How it works steps ─────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    step: "1",
    icon: "🌍",
    title: "A country is chosen",
    desc: "The app picks a random country from the REST Countries API. You won't know which one!",
  },
  {
    step: "2",
    icon: "💬",
    title: "Ask up to 20 questions",
    desc: 'Ask yes/no questions like "Is it in Europe?" or "Does it border the ocean?"',
  },
  {
    step: "3",
    icon: "🤖",
    title: "AI answers your questions",
    desc: "An AI game host answers each question with hints — but never reveals the country directly.",
  },
  {
    step: "4",
    icon: "🎯",
    title: "Make your guess",
    desc: "When you think you know it, submit your guess. Correct? You win! Wrong? Keep asking!",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="text-center space-y-6">
        <div className="text-7xl">🌍</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          Guess the Country
          <span className="block text-indigo-600">in 20 Questions</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          A geography guessing game powered by AI. Ask smart questions, 
          collect clues, and identify the mystery country before you run out!
        </p>

        {/* CTA Button — uses Next.js Link for client-side navigation */}
        <Link
          href="/game"
          className="inline-block px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all"
        >
          🎮 Start Playing
        </Link>
      </section>

      {/* ── What Problem It Solves ───────────────────────────── */}
      <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 space-y-4">
        <h2 className="text-2xl font-bold text-indigo-900">
          🎯 What Problem Does It Solve?
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-indigo-800">
          <div className="flex gap-3 items-start bg-white rounded-xl p-4 border border-indigo-100">
            <span className="text-2xl">📚</span>
            <div>
              <p className="font-semibold mb-1">Learn Geography Playfully</p>
              <p className="text-indigo-600 leading-relaxed">
                Many students find geography boring. GeoQuest makes it engaging
                by turning it into a challenge with immediate AI feedback.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start bg-white rounded-xl p-4 border border-indigo-100">
            <span className="text-2xl">🧠</span>
            <div>
              <p className="font-semibold mb-1">Build Critical Thinking</p>
              <p className="text-indigo-600 leading-relaxed">
                Players must ask strategic questions and reason from clues —
                practicing deductive thinking with every game.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start bg-white rounded-xl p-4 border border-indigo-100">
            <span className="text-2xl">🌐</span>
            <div>
              <p className="font-semibold mb-1">Discover the World</p>
              <p className="text-indigo-600 leading-relaxed">
                With 250+ countries in the pool, every game teaches something
                new about capitals, currencies, and regions.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start bg-white rounded-xl p-4 border border-indigo-100">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-semibold mb-1">Fun for Everyone</p>
              <p className="text-indigo-600 leading-relaxed">
                Casual players enjoy the AI chat experience while geography
                buffs can challenge themselves to win in fewer questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          ⚙️ How It Works
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Step number badge */}
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                {item.step}
              </div>
              <div>
                <div className="text-xl mb-1">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ───────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          🛠️ Built With
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: "Next.js 14", color: "bg-black text-white" },
            { label: "React 18", color: "bg-blue-100 text-blue-800" },
            { label: "TailwindCSS", color: "bg-cyan-100 text-cyan-800" },
            { label: "REST Countries API", color: "bg-green-100 text-green-800" },
            { label: "novita.ai", color: "bg-purple-100 text-purple-800" },
          ].map((tech) => (
            <span
              key={tech.label}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${tech.color}`}
            >
              {tech.label}
            </span>
          ))}
        </div>
      </section>

      {/* ── Team Members ─────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          👥 Team Members
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="text-4xl mb-3">{member.emoji}</div>
              <h3 className="font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="text-center space-y-4 py-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Ready to test your geography? 🗺️
        </h2>
        <Link
          href="/game"
          className="inline-block px-10 py-4 bg-indigo-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all"
        >
          🎮 Play Now — It's Free!
        </Link>
      </section>

    </div>
  );
}

/**
 * app/game/page.jsx  →  Route: /game
 * ─────────────────────────────────────────────────────────────
 * The Game Page. This is also a Server Component by default,
 * but GameBoard (which it renders) is a Client Component.
 *
 * Pattern: Server Component renders the shell/layout,
 * Client Component (GameBoard) handles all interactivity.
 *
 * This separation is a Next.js best practice.
 * ─────────────────────────────────────────────────────────────
 */

import GameBoard from "@/components/GameBoard";
import Link from "next/link";

// Page-specific metadata
export const metadata = {
  title: "Play — GeoQuest",
  description: "Guess the mystery country in 20 questions!",
};

export default function GamePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900">
          🌍 Guess the Country
        </h1>
        <p className="text-gray-500 text-sm">
          Ask up to 20 questions. The AI will guide you — without giving it away!
        </p>
      </div>

      {/* ── Quick Rules ──────────────────────────────────────── */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h2 className="text-sm font-bold text-amber-800 mb-2">📋 Quick Rules</h2>
        <ul className="text-xs text-amber-700 space-y-1">
          <li>✅ You can ask any question — yes/no works best</li>
          <li>✅ You can guess the country at any time (uses 1 question)</li>
          <li>❌ The AI won't say the country name directly</li>
          <li>❌ Running out of questions = game over</li>
        </ul>
      </div>

      {/* ── The Game ─────────────────────────────────────────── */}
      {/*
        GameBoard is a Client Component ("use client" inside it via useGame).
        It handles all the game state, API calls, and interactivity.
      */}
      <GameBoard />

      {/* ── Back link ────────────────────────────────────────── */}
      <div className="text-center">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-indigo-600 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

    </div>
  );
}

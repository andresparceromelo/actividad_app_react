"use client";
/**
 * GuessInput.jsx
 * ─────────────────────────────────────────────────────────────
 * Separate input for submitting a final country guess.
 * Visually distinct from the question input to avoid confusion.
 *
 * Props:
 *   - onSubmit: function(guess: string) — called with the user's guess
 *   - disabled: boolean — disables during AI thinking or game over
 * ─────────────────────────────────────────────────────────────
 */

import { useState } from "react";

export default function GuessInput({ onSubmit, disabled }) {
  const [guessValue, setGuessValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = guessValue.trim();
    if (!trimmed || disabled) return;

    onSubmit(trimmed);
    setGuessValue("");
  }

  return (
    <div className="space-y-2">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">
        🔍 Submit a Guess
      </label>

      {/* Input row — styled differently (green theme) */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={guessValue}
          onChange={(e) => setGuessValue(e.target.value)}
          placeholder='e.g. "France", "Brazil", "Japan"...'
          disabled={disabled}
          className="flex-1 px-4 py-2.5 text-sm border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
        />
        <button
          type="submit"
          disabled={disabled || !guessValue.trim()}
          className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Guess!
        </button>
      </form>

      <p className="text-xs text-gray-400">
        A guess uses one of your 20 questions. Make it count!
      </p>
    </div>
  );
}

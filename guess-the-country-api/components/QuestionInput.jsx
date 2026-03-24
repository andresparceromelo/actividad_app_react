"use client";
/**
 * QuestionInput.jsx
 * ─────────────────────────────────────────────────────────────
 * Input field for asking questions to the AI.
 * Handles form submission and prevents empty submissions.
 *
 * Props:
 *   - onSubmit: function(question: string) — called when user submits
 *   - disabled: boolean — disables input during AI thinking or game over
 *   - questionsRemaining: number — shows the counter
 * ─────────────────────────────────────────────────────────────
 */

import { useState } from "react";

export default function QuestionInput({ onSubmit, disabled, questionsRemaining }) {
  // Local state just for this input field
  const [inputValue, setInputValue] = useState("");

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent page refresh
    const trimmed = inputValue.trim();
    if (!trimmed || disabled) return;

    onSubmit(trimmed);
    setInputValue(""); // Clear the input after sending
  }

  return (
    <div className="space-y-2">
      {/* Label and remaining counter */}
      <div className="flex items-center justify-between text-sm">
        <label className="font-medium text-gray-700">
          💬 Ask a Question
        </label>
        <span
          className={`font-mono font-bold px-2 py-0.5 rounded-full text-xs ${
            questionsRemaining <= 5
              ? "bg-red-100 text-red-700"
              : "bg-indigo-100 text-indigo-700"
          }`}
        >
          {questionsRemaining} questions left
        </span>
      </div>

      {/* Input row */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='e.g. "Is it in Europe?" or "Is the capital a major city?"'
          disabled={disabled}
          className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
        />
        <button
          type="submit"
          disabled={disabled || !inputValue.trim()}
          className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Ask
        </button>
      </form>

      {/* Hint text */}
      <p className="text-xs text-gray-400">
        Tip: Yes/no questions work best! e.g. "Is it in Asia?", "Is it a small country?"
      </p>
    </div>
  );
}

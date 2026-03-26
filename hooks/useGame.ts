"use client";
/**
 * useGame.js
 * ─────────────────────────────────────────────────────────────
 * Custom React hook that manages ALL game state and logic.
 *
 * Why a custom hook?
 * → Separates business logic from UI components.
 * → The GameBoard component just calls this hook and renders —
 *   it doesn't need to know HOW the game works, only WHAT to show.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from "react";
import { getRandomCountry, checkGuess } from "@/utils/countryUtils";
import { Country, ChatMessage } from "@/utils/types";

// How many questions the player gets per game
const MAX_QUESTIONS = 20;

// URL for the countries API (only fetching fields we need)
const COUNTRIES_API =
  "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,latlng,region,subregion";

export function useGame() {
  // ── State declarations ───────────────────────────────────────

  // The secret country (never shown to the user during the game)
  const [secretCountry, setSecretCountry] = useState<Country | null>(null);

  // All countries loaded from the API (used to pick a random one)
  const [allCountries, setAllCountries] = useState<Country[]>([]);

  // The chat history: array of { role: "user"|"ai", text: string }
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // How many questions the user has asked so far
  const [questionsUsed, setQuestionsUsed] = useState<number>(0);

  // Game status: "loading" | "playing" | "won" | "lost"
  const [gameStatus, setGameStatus] = useState<"loading" | "playing" | "won" | "lost">("loading");

  // Whether the AI is currently generating a response
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // Any error message to show the user
  const [error, setError] = useState<string | null>(null);

  // ── Fetch countries on first load ───────────────────────────
  useEffect(() => {
    async function loadCountries() {
      try {
        setGameStatus("loading");
        const res = await fetch(COUNTRIES_API);

        if (!res.ok) throw new Error("Could not load countries. Try refreshing.");

        const data = await res.json();
        setAllCountries(data);

        // Pick a random country and start the game
        const chosen = getRandomCountry(data);
        startNewGame(chosen);
      } catch (err) {
        setError(err.message);
        setGameStatus("loading"); // stays on loading so error shows
      }
    }

    loadCountries();
  }, []); // Empty array = run once when component mounts

  // ── Start (or restart) the game ─────────────────────────────
  const startNewGame = useCallback(
    (country: Country | null = null) => {
      // If no country is passed, pick a new random one
      const newCountry = country ?? getRandomCountry(allCountries);

      setSecretCountry(newCountry);
      setMessages([
        {
          role: "ai",
          text: "🌍 I'm thinking of a country... You have 20 questions to find out which one! Ask me anything — yes/no questions work best!",
        },
      ]);
      setQuestionsUsed(0);
      setGameStatus("playing");
      setIsAiThinking(false);
      setError(null);
    },
    [allCountries]
  );

  // ── Handle a question from the user ─────────────────────────
  const askQuestion = useCallback(
    async (questionText: string) => {
      // Guard: don't allow questions if game isn't active
      if (gameStatus !== "playing" || isAiThinking) return;
      if (!questionText.trim()) return;

      const newQuestionCount = questionsUsed + 1;

      // Add the user's message to the chat
      setMessages((prev) => [
        ...prev,
        { role: "user", text: questionText },
      ]);
      setQuestionsUsed(newQuestionCount);
      setIsAiThinking(true);
      setError(null);

      try {
        // Build the chat history in the format the AI service expects
        const historyForAI = messages.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.text,
        }));

        // Call our Next.js API route (which calls novita.ai server-side)
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: questionText,
            country: secretCountry,
            history: historyForAI,
          }),
        });

        if (!res.ok) throw new Error("Could not get an answer. Try again.");

        const { answer } = await res.json();

        // Add AI response to chat
        setMessages((prev) => [...prev, { role: "ai", text: answer }]);

        // Check if the player has run out of questions
        if (newQuestionCount >= MAX_QUESTIONS) {
          setGameStatus("lost");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsAiThinking(false);
      }
    },
    [gameStatus, isAiThinking, questionsUsed, messages, secretCountry]
  );

  // ── Handle a country guess from the user ────────────────────
  const submitGuess = useCallback(
    async (guessText: string) => {
      if (gameStatus !== "playing" || isAiThinking) return;
      if (!guessText.trim()) return;

      const isCorrect = checkGuess(guessText, secretCountry);
      const newQuestionCount = questionsUsed + 1;

      // Add the guess as a user message
      setMessages((prev) => [
        ...prev,
        { role: "user", text: `🔍 My guess: ${guessText}` },
      ]);
      setQuestionsUsed(newQuestionCount);

      if (isCorrect) {
        // Player wins!
        setMessages((prev) => [
          ...(prev as ChatMessage[]),
          {
            role: "ai" as const,
            text: `🎉 YES! You got it! The country was **${secretCountry?.name.common}**! Incredible geography skills! 🌟`,
          },
        ]);
        setGameStatus("won");
      } else {
        // Wrong guess — counts as a used question
        const remaining = MAX_QUESTIONS - newQuestionCount;
        setMessages((prev) => [
          ...(prev as ChatMessage[]),
          {
            role: "ai" as const,
            text:
              remaining > 0
                ? `❌ Nope, that's not it! You have ${remaining} question${remaining !== 1 ? "s" : ""} left. Keep thinking!`
                : `❌ Wrong guess! You've used all your questions. The country was **${secretCountry?.name.common}**. Better luck next time!`,
          },
        ]);

        if (newQuestionCount >= MAX_QUESTIONS) {
          setGameStatus("lost");
        }
      }
    },
    [gameStatus, isAiThinking, questionsUsed, secretCountry]
  );

  // ── Return everything the UI needs ──────────────────────────
  return {
    secretCountry,
    messages,
    questionsUsed,
    questionsRemaining: MAX_QUESTIONS - questionsUsed,
    maxQuestions: MAX_QUESTIONS,
    gameStatus,
    isAiThinking,
    error,
    askQuestion,
    submitGuess,
    restartGame: () => startNewGame(),
  };
}

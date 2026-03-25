"use client";
/**
 * GameBoard.jsx
 * ─────────────────────────────────────────────────────────────
 * The main game component. It orchestrates all the game UI.
 * It uses the useGame() hook for ALL logic — it only handles rendering.
 *
 * This is the key separation of concerns:
 *   useGame() → knows HOW the game works
 *   GameBoard → knows HOW to display it
 * ─────────────────────────────────────────────────────────────
 */

import { useGame } from "@/hooks/useGame";
import ChatBox from "@/components/ChatBox";
import QuestionInput from "@/components/QuestionInput";
import GuessInput from "@/components/GuessInput";
import CountryCard from "@/components/CountryCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function GameBoard() {
  // Destructure everything we need from the game hook
  const {
    secretCountry,
    messages,
    questionsUsed,
    questionsRemaining,
    maxQuestions,
    gameStatus,
    isAiThinking,
    error,
    askQuestion,
    submitGuess,
    restartGame,
  } = useGame();

  // ── Loading state ────────────────────────────────────────────
  if (gameStatus === "loading") {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <LoadingSpinner size="lg" message="Loading countries from the API..." />
        {/* Show any error that occurred during loading */}
        {error && (
          <ErrorMessage
            message={error}
            onRetry={() => window.location.reload()}
          />
        )}
      </div>
    );
  }

  // ── Determine if inputs should be disabled ──────────────────
  const isGameOver = gameStatus === "won" || gameStatus === "lost";
  const inputsDisabled = isAiThinking || isGameOver;

  // ── Progress bar percentage ──────────────────────────────────
  const progressPercent = (questionsUsed / maxQuestions) * 100;

  return (
    <div className="space-y-6">
      {/* ── Top stats bar ──────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Questions Used
          </span>
          <span className="text-sm font-bold text-gray-900">
            {questionsUsed} / {maxQuestions}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              questionsRemaining <= 5 ? "bg-red-500" : "bg-indigo-500"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ── Game over banner ───────────────────────────────────── */}
      {gameStatus === "won" && (
        <GameOverBanner
          type="won"
          questionsUsed={questionsUsed}
          onRestart={restartGame}
        />
      )}
      {gameStatus === "lost" && (
        <GameOverBanner type="lost" onRestart={restartGame} />
      )}

      {/* ── Chat area ─────────────────────────────────────────── */}
      <ChatBox messages={messages} isAiThinking={isAiThinking} />

      {/* ── Error message (mid-game errors) ───────────────────── */}
      {error && <ErrorMessage message={error} />}

      {/* ── Input area (hidden when game is over) ─────────────── */}
      {!isGameOver && (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4">
          <QuestionInput
            onSubmit={askQuestion}
            disabled={inputsDisabled}
            questionsRemaining={questionsRemaining}
          />

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <GuessInput onSubmit={submitGuess} disabled={inputsDisabled} />
        </div>
      )}

      {/* ── Country reveal (shown after game ends) ────────────── */}
      {isGameOver && secretCountry && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-800">
            🗺️ The Answer Was...
          </h3>
          <CountryCard country={secretCountry} />

          {/* Restart button */}
          <button
            onClick={restartGame}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all"
          >
            🔄 Play Again with a New Country
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * GameOverBanner
 * Shows a win or lose message at the top of the game.
 */
function GameOverBanner({ type, questionsUsed, onRestart }) {
  const isWin = type === "won";

  return (
    <div
      className={`rounded-2xl p-5 text-center ${
        isWin
          ? "bg-emerald-50 border border-emerald-200"
          : "bg-red-50 border border-red-200"
      }`}
    >
      <div className="text-4xl mb-2">{isWin ? "🎉" : "😔"}</div>
      <h2
        className={`text-xl font-bold mb-1 ${
          isWin ? "text-emerald-800" : "text-red-800"
        }`}
      >
        {isWin ? "You Got It!" : "Game Over!"}
      </h2>
      <p className={`text-sm ${isWin ? "text-emerald-600" : "text-red-600"}`}>
        {isWin
          ? `Amazing! You figured it out in ${questionsUsed} question${questionsUsed !== 1 ? "s" : ""}! 🌟`
          : "You used all 20 questions. Better luck next time!"}
      </p>
    </div>
  );
}

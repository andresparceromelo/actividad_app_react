/**
 * ErrorMessage.jsx
 * ─────────────────────────────────────────────────────────────
 * Displays an error message in a styled red box.
 * Props:
 *   - message: the error text to display
 *   - onRetry: optional function to call when "Try Again" is clicked
 * ─────────────────────────────────────────────────────────────
 */

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      {/* Icon */}
      <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>

      {/* Text area */}
      <div className="flex-1">
        <p className="text-red-700 text-sm font-medium">{message}</p>

        {/* Retry button (optional) */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-xs text-red-600 underline hover:text-red-800 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

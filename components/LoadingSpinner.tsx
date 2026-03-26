/**
 * LoadingSpinner.jsx
 * ─────────────────────────────────────────────────────────────
 * A reusable loading indicator.
 * Props:
 *   - size: "sm" | "md" | "lg" (default: "md")
 *   - message: optional text to show below the spinner
 * ─────────────────────────────────────────────────────────────
 */

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

export default function LoadingSpinner({ size = "md", message }: LoadingSpinnerProps) {
  // Map size prop to Tailwind classes
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      {/* The spinning circle */}
      <div
        className={`${sizeClasses[size]} rounded-full border-indigo-200 border-t-indigo-600 animate-spin`}
      />
      {/* Optional message below the spinner */}
      {message && (
        <p className="text-sm text-gray-500 animate-pulse">{message}</p>
      )}
    </div>
  );
}

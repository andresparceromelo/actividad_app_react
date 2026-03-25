/**
 * Footer.jsx
 * ─────────────────────────────────────────────────────────────
 * Shared footer that appears on every page.
 * Shows team info and project credits.
 * ─────────────────────────────────────────────────────────────
 */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-indigo-950 text-indigo-300 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <span className="text-lg">🌍</span>
          <span className="font-semibold text-white">GeoQuest</span>
          <span className="text-indigo-400">— Guess the Country in 20 Questions</span>
        </div>

        {/* Right side */}
        <div className="text-indigo-400">
          © {year} — Proyecto Universitario · React + Next.js
        </div>
      </div>
    </footer>
  );
}

"use client";
/**
 * Header.jsx
 * ─────────────────────────────────────────────────────────────
 * Shared header that appears on every page.
 * Uses Next.js <Link> for client-side navigation (no full page reload).
 * ─────────────────────────────────────────────────────────────
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  // usePathname lets us know which page we're on (to highlight active link)
  const pathname = usePathname();

  return (
    <header className="bg-indigo-900 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / App Name */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="text-2xl">🌍</span>
          <span className="text-xl font-bold tracking-tight">
            GeoQuest
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-indigo-200 ${
              pathname === "/" ? "text-white underline underline-offset-4" : "text-indigo-300"
            }`}
          >
            Home
          </Link>
          <Link
            href="/game"
            className={`text-sm font-medium transition-colors hover:text-indigo-200 ${
              pathname === "/game"
                ? "text-white underline underline-offset-4"
                : "text-indigo-300"
            }`}
          >
            Play Game
          </Link>
        </nav>
      </div>
    </header>
  );
}

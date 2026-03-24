/**
 * app/layout.jsx
 * ─────────────────────────────────────────────────────────────
 * The ROOT layout in Next.js App Router.
 * Everything rendered here wraps EVERY page in the app.
 *
 * This is where we:
 *   - Import global styles
 *   - Add Header and Footer (shared across all pages)
 *   - Set page metadata (title, description)
 * ─────────────────────────────────────────────────────────────
 */

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Next.js metadata — sets the <title> and <meta description> tags
export const metadata = {
  title: "GeoQuest — Guess the Country in 20 Questions",
  description:
    "A fun geography guessing game powered by AI. Ask questions, get hints, and guess the mystery country!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        {/* Header appears on every page */}
        <Header />

        {/* Main content area — grows to fill available space */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Footer appears on every page */}
        <Footer />
      </body>
    </html>
  );
}

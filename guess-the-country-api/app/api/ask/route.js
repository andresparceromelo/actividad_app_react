/**
 * app/api/ask/route.js
 * ─────────────────────────────────────────────────────────────
 * This is a Next.js API Route (server-side).
 *
 * WHY do this server-side?
 * → The NOVITA_API_KEY must NEVER be exposed to the browser.
 * → This route acts as a secure proxy between the browser and novita.ai.
 * → The browser calls /api/ask, this calls novita.ai with the secret key.
 * ─────────────────────────────────────────────────────────────
 */

import { NextResponse } from "next/server";
import { askAI } from "@/services/aiService";

/**
 * POST /api/ask
 * Receives the user's question and country data, returns the AI answer.
 */
export async function POST(request) {
  try {
    // Parse the request body
    const { question, country, history } = await request.json();

    // Basic validation
    if (!question || !country) {
      return NextResponse.json(
        { error: "Missing question or country data" },
        { status: 400 }
      );
    }

    // Call the AI service (this is where novita.ai is actually called)
    const answer = await askAI(question, country, history);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

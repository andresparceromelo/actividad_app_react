/**
 * app/api/ask/route.js
 * ─────────────────────────────────────────────────────────────
 * Next.js API Route — actúa como proxy seguro hacia novita.ai.
 *
 * MODO AUTOMÁTICO:
 * → Si NOVITA_API_KEY está configurada → usa la IA real (novita.ai)
 * → Si NO hay API key              → usa respuestas simuladas (mock)
 *
 * Esto permite probar la app sin necesidad de una API key.
 * ─────────────────────────────────────────────────────────────
 */

import { NextResponse } from "next/server";
import { askAI } from "@/services/aiService";
import { getMockAnswer } from "@/services/mockAiService";

/**
 * POST /api/ask
 * Recibe la pregunta del usuario y los datos del país, devuelve la respuesta.
 */
export async function POST(request) {
  try {
    const { question, country, history } = await request.json();

    if (!question || !country) {
      return NextResponse.json(
        { error: "Faltan datos: question o country" },
        { status: 400 }
      );
    }

    let answer;

    // ── Decidir si usar IA real o mock ──────────────────────────
    const hasApiKey =
      process.env.NOVITA_API_KEY &&
      process.env.NOVITA_API_KEY !== "your_novita_api_key_here";

    if (hasApiKey) {
      // ✅ API key configurada → usar novita.ai real
      console.log("🤖 Using novita.ai AI");
      answer = await askAI(question, country, history);
    } else {
      // 🧪 Sin API key → usar respuestas simuladas
      console.log("🧪 Using mock AI (no API key configured)");

      // Pequeño delay para simular latencia de red (más realista)
      await new Promise((resolve) => setTimeout(resolve, 600));

      answer = getMockAnswer(question, country);
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Algo salió mal. Intenta de nuevo." },
      { status: 500 }
    );
  }
}

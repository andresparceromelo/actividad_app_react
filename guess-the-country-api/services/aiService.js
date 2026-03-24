/**
 * aiService.js
 * ─────────────────────────────────────────────────────────────
 * This service handles all communication with the novita.ai API.
 * It builds the prompt, sends the request, and returns the answer.
 *
 * novita.ai uses an OpenAI-compatible API, so the request format
 * is identical to OpenAI's chat completion endpoint.
 * ─────────────────────────────────────────────────────────────
 */

// The novita.ai base URL for OpenAI-compatible requests
const NOVITA_BASE_URL = "https://api.novita.ai/v3/openai";

// The model we'll use (cheap and fast for a game)
const MODEL = "meta-llama/llama-3.1-8b-instruct";

/**
 * askAI
 * Sends the user's question to the AI along with the secret country data.
 *
 * @param {string} userQuestion  - The question the player typed
 * @param {object} country       - The secret country object (hidden from UI)
 * @param {Array}  chatHistory   - Previous messages for context
 * @returns {Promise<string>}    - The AI's answer text
 */
export async function askAI(userQuestion, country, chatHistory = []) {
  // ── 1. Build the system prompt ──────────────────────────────
  // This tells the AI WHO it is and what country it's thinking of.
  // We include all country data here so the AI can answer questions.
  const systemPrompt = buildSystemPrompt(country);

  // ── 2. Build the messages array ─────────────────────────────
  // We send the full chat history so the AI remembers previous answers.
  const messages = [
    { role: "system", content: systemPrompt },
    // Include previous turns (max 10 to save tokens)
    ...chatHistory.slice(-10),
    { role: "user", content: userQuestion },
  ];

  // ── 3. Call the API ─────────────────────────────────────────
  const response = await fetch(`${NOVITA_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // API key comes from .env.local → process.env.NOVITA_API_KEY
      Authorization: `Bearer ${process.env.NOVITA_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      max_tokens: 200,   // Keep answers short and snappy
      temperature: 0.7,  // A bit of creativity, not too random
    }),
  });

  // ── 4. Handle errors ────────────────────────────────────────
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();

  // Extract the text from the response
  return data.choices[0].message.content;
}

/**
 * buildSystemPrompt
 * Creates the instructions the AI follows during the game.
 * This is the "brain" of the game — it shapes how the AI behaves.
 *
 * @param {object} country - The secret country data
 * @returns {string}       - The full system prompt
 */
function buildSystemPrompt(country) {
  // Extract country details safely (some fields may be missing)
  const name = country?.name?.common ?? "Unknown";
  const capital = country?.capital?.[0] ?? "Unknown";
  const region = country?.region ?? "Unknown";
  const subregion = country?.subregion ?? "Unknown";

  // Get currency name (currencies is an object like { USD: { name: "Dollar" } })
  const currencyCode = country?.currencies
    ? Object.keys(country.currencies)[0]
    : null;
  const currencyName = currencyCode
    ? country.currencies[currencyCode].name
    : "Unknown";

  // Geographic coordinates
  const lat = country?.latlng?.[0] ?? 0;
  const lng = country?.latlng?.[1] ?? 0;
  const hemisphere =
    lat >= 0 ? "Northern Hemisphere" : "Southern Hemisphere";

  return `
You are a fun and friendly game host for a geography guessing game called "Guess the Country in 20 Questions".

The secret country is: ${name}

Country facts you can use to give hints:
- Capital city: ${capital}
- Region: ${region}
- Subregion: ${subregion}
- Currency: ${currencyName} (${currencyCode})
- Location: ${hemisphere}, approximately ${Math.abs(lat)}°${lat >= 0 ? "N" : "S"}, ${Math.abs(lng)}°${lng >= 0 ? "E" : "W"}

YOUR RULES:
1. NEVER directly say the country name unless the player guesses it correctly.
2. Answer questions with YES, NO, or a short helpful hint.
3. Be encouraging and fun — this is a game!
4. If the player guesses WRONG, say "No, that's not it! Keep trying."
5. If the player guesses CORRECTLY, say "🎉 YES! You got it! The country is ${name}!"
6. Keep all answers under 2 sentences.
7. If asked about the flag, describe colors/symbols without naming the country.
8. If asked yes/no questions, answer them clearly.

Remember: You're a game host, not a geography teacher. Keep it fun!
  `.trim();
}

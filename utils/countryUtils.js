/**
 * countryUtils.js
 * ─────────────────────────────────────────────────────────────
 * Helper functions for working with country data.
 * Keeping these here means our components stay clean.
 * ─────────────────────────────────────────────────────────────
 */

/**
 * getRandomCountry
 * Picks a random country from an array.
 * Simple but important — this is how the game selects its mystery country.
 *
 * @param {Array} countries - Array of country objects
 * @returns {object|null}   - A single random country
 */
export function getRandomCountry(countries) {
  if (!countries || countries.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
}

/**
 * getCurrencyDisplay
 * Formats the currency object into a readable string like "US Dollar (USD)"
 *
 * @param {object} currencies - The currencies object from the API
 * @returns {string}          - Human-readable currency string
 */
export function getCurrencyDisplay(currencies) {
  if (!currencies) return "Unknown";
  const code = Object.keys(currencies)[0];
  if (!code) return "Unknown";
  return `${currencies[code].name} (${code})`;
}

/**
 * normalizeGuess
 * Cleans up a user's guess for comparison.
 * Converts "  FRANCE  " → "france" so matching is case-insensitive.
 *
 * @param {string} text - Raw user input
 * @returns {string}    - Lowercase trimmed string
 */
export function normalizeGuess(text) {
  return text?.trim().toLowerCase() ?? "";
}

/**
 * checkGuess
 * Compares the user's guess to the real country name.
 * Handles variations like "United States" vs "United States of America".
 *
 * @param {string} guess   - The user's guess (raw text)
 * @param {object} country - The secret country object
 * @returns {boolean}      - true if the guess is correct
 */
export function checkGuess(guess, country) {
  if (!guess || !country) return false;

  const normalized = normalizeGuess(guess);
  const commonName = normalizeGuess(country?.name?.common);
  const officialName = normalizeGuess(country?.name?.official);

  // Check against both common and official names
  return normalized === commonName || normalized === officialName;
}

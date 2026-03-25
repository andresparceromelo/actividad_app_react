/**
 * mockAiService.js
 * ─────────────────────────────────────────────────────────────
 * Simula respuestas de IA usando lógica real basada en los datos
 * del país. NO necesita API key — funciona 100% offline.
 *
 * Detecta el tipo de pregunta y responde con datos reales del país.
 * ─────────────────────────────────────────────────────────────
 */

/**
 * getMockAnswer
 * Analiza la pregunta del usuario y genera una respuesta inteligente
 * basada en los datos reales del país seleccionado.
 *
 * @param {string} question  - La pregunta del usuario
 * @param {object} country   - El país secreto con todos sus datos
 * @returns {string}         - Una respuesta simulada
 */
export function getMockAnswer(question, country) {
  // Normalizar la pregunta a minúsculas para comparar más fácil
  const q = question.toLowerCase();

  const name        = country?.name?.common ?? "este país";
  const capital     = country?.capital?.[0] ?? "desconocida";
  const region      = country?.region ?? "desconocida";
  const subregion   = country?.subregion ?? "desconocida";
  const lat         = country?.latlng?.[0] ?? 0;
  const lng         = country?.latlng?.[1] ?? 0;

  // Moneda
  const currencyCode = country?.currencies
    ? Object.keys(country.currencies)[0]
    : null;
  const currencyName = currencyCode
    ? country.currencies[currencyCode].name
    : "desconocida";

  // ── Detectar si el usuario está ADIVINANDO el país ──────────
  // Si la pregunta empieza con "es " o "my guess" o contiene "guess"
  const isGuess =
    q.startsWith("🔍") ||
    q.includes("my guess") ||
    q.includes("es este") ||
    q.includes("guess:");

  if (isGuess) {
    // La lógica de adivinanza ya la maneja useGame.js directamente,
    // pero por si acaso llega aquí:
    return `Sigue intentando — ¡estás haciendo buenas preguntas! 🤔`;
  }

  // ── Preguntas sobre CONTINENTE / REGIÓN ────────────────────
  if (q.includes("europe") || q.includes("europa")) {
    return region === "Europe"
      ? `✅ ¡Sí! Este país está en Europa. Más específicamente en ${subregion}.`
      : `❌ No, este país NO está en Europa. Está en ${region}.`;
  }

  if (q.includes("asia")) {
    return region === "Asia"
      ? `✅ ¡Sí! Este país está en Asia (${subregion}).`
      : `❌ No, no está en Asia. Está en ${region}.`;
  }

  if (q.includes("africa") || q.includes("áfrica")) {
    return region === "Africa"
      ? `✅ ¡Sí! Este país está en África (${subregion}).`
      : `❌ No, no está en África. Está en ${region}.`;
  }

  if (q.includes("america") || q.includes("américas") || q.includes("americas")) {
    return region === "Americas"
      ? `✅ ¡Sí! Este país está en las Américas (${subregion}).`
      : `❌ No, no está en las Américas. Está en ${region}.`;
  }

  if (q.includes("oceania") || q.includes("oceanía")) {
    return region === "Oceania"
      ? `✅ ¡Sí! Este país está en Oceanía.`
      : `❌ No, no está en Oceanía. Está en ${region}.`;
  }

  if (q.includes("south america") || q.includes("sudamérica") || q.includes("suramérica")) {
    return subregion === "South America"
      ? `✅ ¡Sí! Este país está en Sudamérica.`
      : `❌ No, no está en Sudamérica. ${
          region === "Americas" ? `Está en otra parte de las Américas (${subregion}).` : `Está en ${region}.`
        }`;
  }

  if (q.includes("north america") || q.includes("norteamérica")) {
    return subregion === "North America"
      ? `✅ ¡Sí! Este país está en Norteamérica.`
      : `❌ No, no está en Norteamérica.`;
  }

  if (q.includes("caribbean") || q.includes("caribe")) {
    return subregion === "Caribbean"
      ? `✅ ¡Sí! Este país está en el Caribe. 🌴`
      : `❌ No, no está en el Caribe.`;
  }

  if (q.includes("middle east") || q.includes("oriente medio")) {
    return subregion === "Western Asia"
      ? `✅ ¡Sí! Este país está en el Medio Oriente (Asia Occidental).`
      : `❌ No, no está en el Medio Oriente.`;
  }

  // ── Preguntas sobre HEMISFERIO ──────────────────────────────
  if (q.includes("northern hemisphere") || q.includes("hemisferio norte")) {
    return lat >= 0
      ? `✅ ¡Sí! Este país está en el Hemisferio Norte.`
      : `❌ No, está en el Hemisferio Sur.`;
  }

  if (q.includes("southern hemisphere") || q.includes("hemisferio sur")) {
    return lat < 0
      ? `✅ ¡Sí! Este país está en el Hemisferio Sur.`
      : `❌ No, está en el Hemisferio Norte.`;
  }

  // ── Preguntas sobre el MAR / OCÉANO ────────────────────────
  if (
    q.includes("coast") || q.includes("ocean") || q.includes("sea") ||
    q.includes("costa") || q.includes("mar") || q.includes("océano") ||
    q.includes("landlocked") || q.includes("mediterranean")
  ) {
    // Aproximación: países sin costa tienen lat/lng muy adentro del continente
    // Usamos la lista de países sin salida al mar más conocidos
    const landlockedCountries = [
      "Afghanistan", "Andorra", "Armenia", "Austria", "Azerbaijan",
      "Belarus", "Bhutan", "Bolivia", "Botswana", "Burkina Faso",
      "Burundi", "Central African Republic", "Chad", "Czech Republic",
      "Ethiopia", "Hungary", "Kazakhstan", "Kosovo", "Kyrgyzstan",
      "Laos", "Lesotho", "Liechtenstein", "Luxembourg", "Malawi",
      "Mali", "Moldova", "Mongolia", "Nepal", "Niger", "North Macedonia",
      "Paraguay", "Rwanda", "San Marino", "Serbia", "Slovakia",
      "South Sudan", "Swaziland", "Switzerland", "Tajikistan",
      "Turkmenistan", "Uganda", "Uzbekistan", "Vatican City",
      "Zambia", "Zimbabwe",
    ];
    const isLandlocked = landlockedCountries.includes(name);

    if (q.includes("landlocked") || q.includes("sin salida al mar")) {
      return isLandlocked
        ? `✅ ¡Sí! Este país no tiene salida al mar — es un país sin litoral.`
        : `❌ No, este país SÍ tiene acceso al mar o al océano.`;
    }

    return isLandlocked
      ? `❌ No, este país no tiene costa — es un país sin litoral (landlocked).`
      : `✅ ¡Sí! Este país tiene costa marítima. 🌊`;
  }

  // ── Preguntas sobre la CAPITAL ──────────────────────────────
  if (
    q.includes("capital") ||
    q.includes("capital city")
  ) {
    if (q.includes("start with") || q.includes("empieza con") || q.includes("letra")) {
      const letter = capital[0].toUpperCase();
      return `La capital empieza con la letra **${letter}**.`;
    }
    if (q.includes("how many") || q.includes("cuántas letras") || q.includes("letters")) {
      return `La capital tiene **${capital.length} letras**.`;
    }
    return `La capital es una ciudad importante. Te daré una pista: empieza con **${capital[0].toUpperCase()}** y tiene ${capital.length} letras.`;
  }

  // ── Preguntas sobre MONEDA ──────────────────────────────────
  if (
    q.includes("currency") || q.includes("moneda") ||
    q.includes("euro") || q.includes("dollar") || q.includes("dólar")
  ) {
    if (q.includes("euro")) {
      return currencyCode === "EUR"
        ? `✅ ¡Sí! Este país usa el Euro (€).`
        : `❌ No, este país no usa el Euro. Su moneda es el ${currencyName}.`;
    }
    if (q.includes("dollar") || q.includes("dólar") || q.includes("usd")) {
      return currencyCode === "USD"
        ? `✅ ¡Sí! Este país usa el Dólar Americano (USD).`
        : `❌ No usa el USD. Su moneda es el ${currencyName} (${currencyCode}).`;
    }
    return `La moneda de este país empieza con **${currencyName[0].toUpperCase()}**. Tiene ${currencyName.length} letras.`;
  }

  // ── Preguntas sobre TAMAÑO / POBLACIÓN ─────────────────────
  if (
    q.includes("large") || q.includes("big") || q.includes("small") ||
    q.includes("grande") || q.includes("pequeño") || q.includes("tiny") ||
    q.includes("size") || q.includes("tamaño")
  ) {
    // Estimamos por subregión (no tenemos área exacta con los campos actuales)
    const smallRegions = ["Caribbean", "Southern Europe", "Polynesia", "Micronesia"];
    const isSmall = smallRegions.includes(subregion);

    if (q.includes("small") || q.includes("pequeño") || q.includes("tiny")) {
      return isSmall
        ? `✅ ¡Sí! Este es un país relativamente pequeño.`
        : `❌ No exactamente — este país es de tamaño mediano a grande en su región.`;
    }
    return isSmall
      ? `❌ No, este país es bastante pequeño comparado con otros.`
      : `✅ ¡Sí! Este país tiene un tamaño considerable en su región.`;
  }

  // ── Preguntas sobre IDIOMA ──────────────────────────────────
  if (
    q.includes("language") || q.includes("idioma") || q.includes("speak") ||
    q.includes("hablan") || q.includes("spanish") || q.includes("español") ||
    q.includes("french") || q.includes("francés") || q.includes("english") ||
    q.includes("inglés") || q.includes("portuguese") || q.includes("portugués") ||
    q.includes("arabic") || q.includes("árabe")
  ) {
    // Aproximamos por región/subregión
    const spanishSpeaking = ["South America", "Central America", "Caribbean", "Southern Europe"];
    const frenchSpeaking  = ["Western Africa", "Middle Africa", "Western Europe"];
    const arabicSpeaking  = ["Western Asia", "Northern Africa"];
    const portugueseSpeaking = ["South America"]; // + Portugal

    if (q.includes("spanish") || q.includes("español")) {
      const likely = spanishSpeaking.includes(subregion) && name !== "Brazil" && name !== "Brasil";
      return likely
        ? `✅ Es muy probable que hablen español en este país.`
        : `❌ No, el español no es el idioma principal aquí.`;
    }
    if (q.includes("french") || q.includes("francés")) {
      const likely = frenchSpeaking.includes(subregion) || name === "France" || name === "Francia";
      return likely
        ? `✅ ¡Sí! El francés es un idioma oficial en este país.`
        : `❌ No, el francés no es el idioma principal aquí.`;
    }
    if (q.includes("arabic") || q.includes("árabe")) {
      const likely = arabicSpeaking.includes(subregion);
      return likely
        ? `✅ ¡Sí! El árabe se habla en este país.`
        : `❌ No, el árabe no es el idioma principal aquí.`;
    }
    return `Pista: Este país está en ${subregion}. Piensa qué idiomas se hablan en esa zona. 🗣️`;
  }

  // ── Preguntas sobre BANDERA ────────────────────────────────
  if (q.includes("flag") || q.includes("bandera")) {
    const flagColors = getFlagColorHint(name);
    return `La bandera de este país ${flagColors} 🎨`;
  }

  // ── Pregunta sobre si es una ISLA ───────────────────────────
  if (q.includes("island") || q.includes("isla") || q.includes("archipelago")) {
    const islandRegions = ["Caribbean", "Polynesia", "Micronesia", "Melanesia"];
    const isIsland =
      islandRegions.includes(subregion) ||
      ["Japan", "Indonesia", "Philippines", "Cuba", "Madagascar",
       "Sri Lanka", "New Zealand", "Iceland", "Ireland", "United Kingdom",
       "Maldives", "Seychelles", "Mauritius", "Fiji", "Bahamas",
       "Jamaica", "Trinidad and Tobago"].includes(name);

    return isIsland
      ? `✅ ¡Sí! Este país es una isla o archipiélago. 🏝️`
      : `❌ No, este país no es una isla — forma parte de un continente.`;
  }

  // ── Preguntas sobre CLIMA ───────────────────────────────────
  if (
    q.includes("hot") || q.includes("cold") || q.includes("tropical") ||
    q.includes("caliente") || q.includes("frío") || q.includes("tropical") ||
    q.includes("climate") || q.includes("clima") || q.includes("snow") || q.includes("nieve")
  ) {
    const isTropical = Math.abs(lat) < 23.5;
    const isCold = Math.abs(lat) > 55;

    if (q.includes("tropical")) {
      return isTropical
        ? `✅ ¡Sí! Este país tiene clima tropical — está cerca del ecuador. ☀️`
        : `❌ No, este país no es tropical.`;
    }
    if (q.includes("cold") || q.includes("frío") || q.includes("snow") || q.includes("nieve")) {
      return isCold
        ? `✅ ¡Sí! Este país es bastante frío — está en latitudes altas. 🥶`
        : isTropical
        ? `❌ No, este país tiene un clima cálido/tropical.`
        : `🤔 Depende de la estación, pero tiene un clima templado.`;
    }
    return isTropical
      ? `☀️ Este país tiene un clima cálido o tropical.`
      : isCold
      ? `🥶 Este país tiene un clima frío o templado-frío.`
      : `🌤️ Este país tiene un clima templado.`;
  }

  // ── Pregunta genérica de SÍ/NO que no detectamos ───────────
  // Damos una pista basada en la región para no dejar al usuario sin respuesta
  const genericHints = [
    `Pista geográfica: Este país está en **${region}**, específicamente en **${subregion}**. 🗺️`,
    `Dato útil: La capital de este país tiene **${capital.length} letras** y empieza con **${capital[0]?.toUpperCase()}**.`,
    `Pista monetaria: La moneda de este país es el **${currencyName}** (${currencyCode}). 💰`,
    `Ubicación: Este país está aproximadamente a **${Math.abs(lat).toFixed(0)}° ${lat >= 0 ? "al norte" : "al sur"}** del ecuador. 📍`,
  ];

  // Rotamos entre las pistas según la longitud del historial
  const hintIndex = Math.floor(Math.random() * genericHints.length);
  return `Hmm, interesante pregunta. ${genericHints[hintIndex]}`;
}

/**
 * getFlagColorHint
 * Devuelve una descripción aproximada de la bandera de países conocidos.
 * Para países no listados, da una pista genérica.
 */
function getFlagColorHint(countryName) {
  const flagHints = {
    "France": "es azul, blanca y roja en franjas verticales.",
    "Germany": "tiene tres franjas horizontales: negra, roja y amarilla.",
    "Japan": "es blanca con un círculo rojo en el centro.",
    "Brazil": "es verde con un rombo amarillo y un círculo azul.",
    "United States": "tiene franjas rojas y blancas con estrellas blancas en azul.",
    "Canada": "es roja y blanca con una hoja de arce roja.",
    "Australia": "es azul oscuro con la Union Jack y estrellas blancas.",
    "Argentina": "tiene franjas celestes y blancas con un sol.",
    "Mexico": "es verde, blanca y roja con un águila en el centro.",
    "Colombia": "tiene franjas amarilla, azul y roja horizontales.",
    "Spain": "tiene franjas rojas y amarillas con el escudo nacional.",
    "Italy": "es verde, blanca y roja en franjas verticales.",
    "China": "es roja con estrellas amarillas.",
    "India": "tiene franjas naranja, blanca y verde con una rueda azul.",
  };

  return flagHints[countryName] ?? "tiene colores y símbolos únicos. ¡Piensa en la región del país! 🎨";
}

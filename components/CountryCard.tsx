/**
 * CountryCard.jsx
 * ─────────────────────────────────────────────────────────────
 * Shows full country details after the game ends.
 * Only visible when the game is over (won or lost).
 *
 * Props:
 *   - country: the country object from the REST Countries API
 * ─────────────────────────────────────────────────────────────
 */

import { getCurrencyDisplay } from "@/utils/countryUtils";
import { Country } from "@/utils/types";

export default function CountryCard({ country }: { country: Country | null }) {
  if (!country) return null;

  // Extract data safely with fallbacks
  const name = country?.name?.common ?? "Unknown";
  const capital = country?.capital?.[0] ?? "N/A";
  const region = country?.region ?? "N/A";
  const subregion = country?.subregion ?? "N/A";
  const currency = getCurrencyDisplay(country?.currencies);
  const flagUrl = country?.flags?.png ?? country?.flags?.svg;
  const lat = country?.latlng?.[0]?.toFixed(2) ?? "N/A";
  const lng = country?.latlng?.[1]?.toFixed(2) ?? "N/A";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md">
      {/* Flag banner */}
      {flagUrl && (
        <div className="h-32 bg-gray-100 overflow-hidden flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={flagUrl}
            alt={`Flag of ${name}`}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Country details */}
      <div className="p-5 space-y-3">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          🌍 {name}
        </h3>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <InfoItem icon="🏛️" label="Capital" value={capital} />
          <InfoItem icon="🗺️" label="Region" value={region} />
          <InfoItem icon="📍" label="Subregion" value={subregion} />
          <InfoItem icon="💰" label="Currency" value={currency} />
          <InfoItem
            icon="📡"
            label="Coordinates"
            value={`${lat}°, ${lng}°`}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * InfoItem
 * Small helper component for a label+value pair.
 */
function InfoItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-2.5">
      <div className="text-xs text-gray-400 mb-0.5">
        {icon} {label}
      </div>
      <div className="font-semibold text-gray-800 text-sm truncate">
        {value}
      </div>
    </div>
  );
}

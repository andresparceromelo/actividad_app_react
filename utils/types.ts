export interface Currency {
  name: string;
  symbol?: string;
}

export interface CountryName {
  common: string;
  official: string;
}

export interface Country {
  name: CountryName;
  capital?: string[];
  currencies?: Record<string, Currency>;
  latlng?: [number, number];
  region?: string;
  subregion?: string;
  flags?: {
    png: string;
    svg: string;
    alt?: string;
  };
}

export interface ChatMessage {
  role: "user" | "ai" | "system" | "assistant";
  text?: string;
  content?: string;
}

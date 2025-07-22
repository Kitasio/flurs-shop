/**
 * Defines the shipping cost per country.
 * Defines shipping information (name and rate) per country.
 * Use ISO 3166-1 alpha-2 country codes (e.g., 'US', 'CA', 'GB') as keys.
 */
interface CountryShippingInfo {
  name: string;
  rate: number;
}

/**
 * The default shipping rate used as a fallback for countries not explicitly listed.
 */
const defaultShippingRate = 20;

const shippingConfig: Record<string, CountryShippingInfo> = {
  // Existing specific rates
  DE: { name: 'Germany', rate: 16 },
  PL: { name: 'Poland', rate: 5 },
  CZ: { name: 'Czech Republic', rate: 12 },
  SK: { name: 'Slovakia', rate: 12 },
  AU: { name: 'Australia', rate: 21 },
  NZ: { name: 'New Zealand', rate: 21 },
  FJ: { name: 'Fiji', rate: 21 },
  AT: { name: 'Austria', rate: 20 },
  BA: { name: 'Bosnia and Herzegovina', rate: 20 },
  BG: { name: 'Bulgaria', rate: 20 },
  DK: { name: 'Denmark', rate: 20 },
  HR: { name: 'Croatia', rate: 20 },
  EE: { name: 'Estonia', rate: 20 },
  NL: { name: 'Netherlands', rate: 20 },
  LT: { name: 'Lithuania', rate: 20 },
  LU: { name: 'Luxembourg', rate: 20 },
  LV: { name: 'Latvia', rate: 20 },
  LI: { name: 'Liechtenstein', rate: 20 },
  SI: { name: 'Slovenia', rate: 20 },
  CH: { name: 'Switzerland', rate: 20 },
  UA: { name: 'Ukraine', rate: 20 },
  VA: { name: 'Vatican City', rate: 20 },
  HU: { name: 'Hungary', rate: 20 },
  AL: { name: 'Albania', rate: 18 },
  BE: { name: 'Belgium', rate: 18 },
  MT: { name: 'Malta', rate: 18 },
  ME: { name: 'Montenegro', rate: 18 },
  NO: { name: 'Norway', rate: 18 },
  CY: { name: 'Cyprus', rate: 18 },
  FI: { name: 'Finland', rate: 18 },
  FR: { name: 'France', rate: 18 },
  AD: { name: 'Andorra', rate: 18 },
  MC: { name: 'Monaco', rate: 18 },
  GR: { name: 'Greece', rate: 18 },
  ES: { name: 'Spain', rate: 18 },
  IE: { name: 'Ireland', rate: 18 },
  IS: { name: 'Iceland', rate: 18 },
  IL: { name: 'Israel', rate: 18 },
  MK: { name: 'Macedonia', rate: 18 },
  MD: { name: 'Moldova', rate: 18 },
  RO: { name: 'Romania', rate: 18 },
  RS: { name: 'Serbia', rate: 18 },
  SE: { name: 'Sweden', rate: 18 },
  IT: { name: 'Italy', rate: 18 },
  TR: { name: 'Turkey', rate: 18 },
  SM: { name: 'San Marino', rate: 18 },
  GB: { name: 'United Kingdom', rate: 18 },
  PT: { name: 'Portugal', rate: 18 },
  AE: { name: 'United Arab Emirates', rate: 18 },
  US: { name: 'United States', rate: 20 },
  CA: { name: 'Canada', rate: 20 },



  // Countries with default rate
  AR: { name: 'Argentina', rate: defaultShippingRate },
  AM: { name: 'Armenia', rate: defaultShippingRate },
  BR: { name: 'Brazil', rate: defaultShippingRate },
  CL: { name: 'Chile', rate: defaultShippingRate },
  CN: { name: 'China', rate: defaultShippingRate },
  CO: { name: 'Colombia', rate: defaultShippingRate },
  CR: { name: 'Costa Rica', rate: defaultShippingRate },
  SZ: { name: 'Eswatini', rate: defaultShippingRate },
  GE: { name: 'Georgia', rate: defaultShippingRate },
  IN: { name: 'India', rate: defaultShippingRate },
  ID: { name: 'Indonesia', rate: defaultShippingRate },
  JP: { name: 'Japan', rate: defaultShippingRate },
  KR: { name: 'Korea (South)', rate: defaultShippingRate },
  KW: { name: 'Kuwait', rate: defaultShippingRate },
  MY: { name: 'Malaysia', rate: defaultShippingRate },
  MX: { name: 'Mexico', rate: defaultShippingRate },
  PE: { name: 'Peru', rate: defaultShippingRate },
  PH: { name: 'Philippines', rate: defaultShippingRate },
  SG: { name: 'Singapore', rate: defaultShippingRate },
  ZA: { name: 'South Africa', rate: defaultShippingRate },
  TW: { name: 'Taiwan', rate: defaultShippingRate },
  TH: { name: 'Thailand', rate: defaultShippingRate },
  UY: { name: 'Uruguay', rate: defaultShippingRate },
  VN: { name: 'Vietnam', rate: defaultShippingRate },
  // Add more countries and their info here if needed
};

/**
 * List of explicitly supported country codes for the dropdown, sorted alphabetically.
 */
export const supportedCountries = Object.keys(shippingConfig).sort();

/**
 * Maps supported country codes to their full names for display purposes.
 */
export const countryNames: Record<string, string> = Object.fromEntries(
  Object.entries(shippingConfig).map(([code, info]) => [code, info.name])
);

/**
 * Helper function to get the shipping cost for a given country code.
 * Uses the default rate if the country code is not found in `shippingConfig`.
 * Returns 0 if no countryCode is provided.
 */
export function getShippingCost(countryCode: string | undefined | null): number {
  if (!countryCode) {
    return 0; // No country selected yet
  }
  // Use the rate from the config if the country exists, otherwise use the default rate.
  return shippingConfig[countryCode]?.rate ?? defaultShippingRate;
}

/**
 * Defines the shipping cost per country.
 * Defines shipping information (name and rate) per country.
 * Use ISO 3166-1 alpha-2 country codes (e.g., 'US', 'CA', 'GB') as keys.
 */
interface CountryShippingInfo {
  name: string;
  rate: number;
}

const shippingConfig: Record<string, CountryShippingInfo> = {
  US: { name: 'United States', rate: 10 },
  CA: { name: 'Canada', rate: 15 },
  GB: { name: 'United Kingdom', rate: 18 },
  DE: { name: 'Germany', rate: 16 },
  PL: { name: 'Poland', rate: 5 },
  // Add more countries and their info here
};

/**
 * The default shipping rate used as a fallback for countries not explicitly listed.
 */
const defaultShippingRate = 15;

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

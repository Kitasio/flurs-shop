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
const defaultShippingRate = 35;

const shippingConfig: Record<string, CountryShippingInfo> = {
  // Existing specific rates
  DE: { name: 'Germany', rate: 19 },
  PL: { name: 'Poland', rate: 5 },
  CZ: { name: 'Czech Republic', rate: 12 },
  SK: { name: 'Slovakia', rate: 12 },
  AU: { name: 'Australia', rate: 50 },
  NZ: { name: 'New Zealand', rate: 50 },
  FJ: { name: 'Fiji', rate: 50 },
  AT: { name: 'Austria', rate: 25 },
  BY: { name: 'Belarus', rate: 25 },
  BA: { name: 'Bosnia and Herzegovina', rate: 25 },
  BG: { name: 'Bulgaria', rate: 25 },
  DK: { name: 'Denmark', rate: 25 },
  HR: { name: 'Croatia', rate: 25 },
  EE: { name: 'Estonia', rate: 25 },
  NL: { name: 'Netherlands', rate: 25 },
  LT: { name: 'Lithuania', rate: 25 },
  LU: { name: 'Luxembourg', rate: 25 },
  LV: { name: 'Latvia', rate: 25 },
  LI: { name: 'Liechtenstein', rate: 25 },
  SI: { name: 'Slovenia', rate: 25 },
  CH: { name: 'Switzerland', rate: 25 },
  UA: { name: 'Ukraine', rate: 25 },
  VA: { name: 'Vatican City', rate: 25 },
  HU: { name: 'Hungary', rate: 25 },
  AL: { name: 'Albania', rate: 28 },
  BE: { name: 'Belgium', rate: 28 },
  MT: { name: 'Malta', rate: 28 },
  ME: { name: 'Montenegro', rate: 28 },
  NO: { name: 'Norway', rate: 28 },
  CY: { name: 'Cyprus', rate: 28 },
  FI: { name: 'Finland', rate: 28 },
  FR: { name: 'France', rate: 28 },
  AD: { name: 'Andorra', rate: 28 },
  MC: { name: 'Monaco', rate: 28 },
  GR: { name: 'Greece', rate: 28 },
  ES: { name: 'Spain', rate: 28 },
  IE: { name: 'Ireland', rate: 28 },
  IS: { name: 'Iceland', rate: 28 },
  IL: { name: 'Israel', rate: 28 },
  MK: { name: 'Macedonia', rate: 28 },
  MD: { name: 'Moldova', rate: 28 },
  RO: { name: 'Romania', rate: 28 },
  RS: { name: 'Serbia', rate: 28 },
  SE: { name: 'Sweden', rate: 28 },
  IT: { name: 'Italy', rate: 28 },
  TR: { name: 'Turkey', rate: 28 },
  SM: { name: 'San Marino', rate: 28 },
  GB: { name: 'United Kingdom', rate: 28 },
  PT: { name: 'Portugal', rate: 28 },
  AE: { name: 'United Arab Emirates', rate: 28 },
  US: { name: 'United States', rate: 35 },
  CA: { name: 'Canada', rate: 35 },
  KI: { name: 'Kiribati', rate: 50 },
  MH: { name: 'Marshall Islands', rate: 50 },
  FM: { name: 'Micronesia', rate: 50 },
  NR: { name: 'Nauru', rate: 50 },
  PW: { name: 'Palau', rate: 50 },
  PG: { name: 'Papua New Guinea', rate: 50 },
  WS: { name: 'Samoa', rate: 50 },
  VU: { name: 'Vanuatu', rate: 50 },
  TV: { name: 'Tuvalu', rate: 50 },
  TO: { name: 'Tonga', rate: 50 },


  // Countries with default rate
  AO: { name: 'Angola', rate: defaultShippingRate },
  AR: { name: 'Argentina', rate: defaultShippingRate },
  AM: { name: 'Armenia', rate: defaultShippingRate },
  AZ: { name: 'Azerbaijan', rate: defaultShippingRate },
  BZ: { name: 'Belize', rate: defaultShippingRate },
  BJ: { name: 'Benin', rate: defaultShippingRate },
  BO: { name: 'Bolivia', rate: defaultShippingRate },
  BW: { name: 'Botswana', rate: defaultShippingRate },
  BR: { name: 'Brazil', rate: defaultShippingRate },
  BN: { name: 'Brunei', rate: defaultShippingRate },
  KH: { name: 'Cambodia', rate: defaultShippingRate },
  CM: { name: 'Cameroon', rate: defaultShippingRate },
  CL: { name: 'Chile', rate: defaultShippingRate },
  CN: { name: 'China', rate: defaultShippingRate },
  CO: { name: 'Colombia', rate: defaultShippingRate },
  CR: { name: 'Costa Rica', rate: defaultShippingRate },
  EC: { name: 'Ecuador', rate: defaultShippingRate },
  SV: { name: 'El Salvador', rate: defaultShippingRate },
  GQ: { name: 'Equatorial Guinea', rate: defaultShippingRate },
  SZ: { name: 'Eswatini', rate: defaultShippingRate },
  ET: { name: 'Ethiopia', rate: defaultShippingRate },
  GA: { name: 'Gabon', rate: defaultShippingRate },
  GM: { name: 'Gambia', rate: defaultShippingRate },
  GE: { name: 'Georgia', rate: defaultShippingRate },
  GH: { name: 'Ghana', rate: defaultShippingRate },
  GT: { name: 'Guatemala', rate: defaultShippingRate },
  GY: { name: 'Guyana', rate: defaultShippingRate },
  HN: { name: 'Honduras', rate: defaultShippingRate },
  IN: { name: 'India', rate: defaultShippingRate },
  ID: { name: 'Indonesia', rate: defaultShippingRate },
  JP: { name: 'Japan', rate: defaultShippingRate },
  KZ: { name: 'Kazakhstan', rate: defaultShippingRate },
  KE: { name: 'Kenya', rate: defaultShippingRate },
  KR: { name: 'Korea (South)', rate: defaultShippingRate },
  KW: { name: 'Kuwait', rate: defaultShippingRate },
  KG: { name: 'Kyrgyzstan', rate: defaultShippingRate },
  LA: { name: 'Laos', rate: defaultShippingRate },
  LB: { name: 'Lebanon', rate: defaultShippingRate },
  MG: { name: 'Madagascar', rate: defaultShippingRate },
  MY: { name: 'Malaysia', rate: defaultShippingRate },
  MV: { name: 'Maldives', rate: defaultShippingRate },
  MU: { name: 'Mauritius', rate: defaultShippingRate },
  MX: { name: 'Mexico', rate: defaultShippingRate },
  MN: { name: 'Mongolia', rate: defaultShippingRate },
  NA: { name: 'Namibia', rate: defaultShippingRate },
  NP: { name: 'Nepal', rate: defaultShippingRate },
  NI: { name: 'Nicaragua', rate: defaultShippingRate },
  PA: { name: 'Panama', rate: defaultShippingRate },
  PY: { name: 'Paraguay', rate: defaultShippingRate },
  PE: { name: 'Peru', rate: defaultShippingRate },
  PH: { name: 'Philippines', rate: defaultShippingRate },
  RW: { name: 'Rwanda', rate: defaultShippingRate },
  SN: { name: 'Senegal', rate: defaultShippingRate },
  SL: { name: 'Sierra Leone', rate: defaultShippingRate },
  SG: { name: 'Singapore', rate: defaultShippingRate },
  ZA: { name: 'South Africa', rate: defaultShippingRate },
  LK: { name: 'Sri Lanka', rate: defaultShippingRate },
  SR: { name: 'Suriname', rate: defaultShippingRate },
  TW: { name: 'Taiwan', rate: defaultShippingRate },
  TJ: { name: 'Tajikistan', rate: defaultShippingRate },
  TZ: { name: 'Tanzania', rate: defaultShippingRate },
  TH: { name: 'Thailand', rate: defaultShippingRate },
  TG: { name: 'Togo', rate: defaultShippingRate },
  TN: { name: 'Tunisia', rate: defaultShippingRate },
  TM: { name: 'Turkmenistan', rate: defaultShippingRate },
  UG: { name: 'Uganda', rate: defaultShippingRate },
  UY: { name: 'Uruguay', rate: defaultShippingRate },
  UZ: { name: 'Uzbekistan', rate: defaultShippingRate },
  VN: { name: 'Vietnam', rate: defaultShippingRate },
  ZM: { name: 'Zambia', rate: defaultShippingRate },
  ZW: { name: 'Zimbabwe', rate: defaultShippingRate },
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

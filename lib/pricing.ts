/**
 * Calculates the price based on the base price and selected size.
 * @param basePrice The base price (assumed to be for A3).
 * @param size The selected size ('A3', 'B2', 'B1').
 * @returns The calculated price.
 */
export function calculatePrice(basePrice: number, size: string): number {
  switch (size) {
    case 'B2':
      return basePrice + 20;
    case 'B1':
      return basePrice + 30;
    default: // Default to A3 price if size is unknown or 'A3'
      return basePrice;
  }
}

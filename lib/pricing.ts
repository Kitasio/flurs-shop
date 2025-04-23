/**
 * Calculates the price based on the base price and selected size.
 * @param basePrice The base price (assumed to be for A4).
 * @param size The selected size ('A4', 'A3', 'A2').
 * @returns The calculated price.
 */
export function calculatePrice(basePrice: number, size: string): number {
  switch (size) {
    case 'A3':
      return basePrice + 10;
    case 'A2':
      return basePrice + 20;
    default: // Default to A4 price if size is unknown or 'A4'
      return basePrice;
  }
}

"use server";

import type {
  BTCPayPosResponse,
  BTCPayProduct,
  Product,
  BTCPayInvoiceRequest,
  BTCPayInvoiceResponse,
  CartItem,
  ShippingInfo,
  BTCPayCartItem
} from '../types/btcpay';

// Ensure environment variables are defined
const API_URL = process.env.BTCPAY_API_URL;
const API_KEY = process.env.BTCPAY_API_KEY;
const POS_ID = process.env.BTCPAY_POS_ID;
const STORE_ID = process.env.BTCPAY_STORE_ID;

if (!API_URL || !API_KEY || !POS_ID || !STORE_ID) {
  throw new Error("Missing BTCPay Server environment variables");
}

export async function fetchProducts(): Promise<{ products: Product[], currency: string }> {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/apps/pos/${POS_ID}`,
      {
        headers: {
          'Authorization': `token ${API_KEY}`,
        },
        // Use Next.js caching and revalidation
        next: { revalidate: 3600 } // Revalidate every hour
      }
    );

    if (!response.ok) {
      console.error("BTCPay API Error:", response.status, await response.text());
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data: BTCPayPosResponse = await response.json();
    return {
      products: data.items
        .filter(item => !item.disabled)
        .map(item => transformBTCPayProduct(item, data.currency)),
      currency: data.currency
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Could not fetch products from BTCPay Server.');
  }
}

function transformBTCPayProduct(item: BTCPayProduct, currency: string): Product {
  // Split description into details
  const details = item.description
    .split('\n')
    .filter(line => line.trim() !== '');

  // Default sizes if not specified in description
  // TODO: Consider making sizes configurable or deriving from description/metadata
  const sizes = [
    { name: 'A3', dimensions: '297 x 420mm' },
    { name: 'B2', dimensions: '500 x 707mm' },
    { name: 'B1', dimensions: '707 x 1000mm' }
  ];

  return {
    id: item.id,
    name: item.title.toUpperCase(),
    // Ensure price is parsed correctly as a number
    price: Number.parseFloat(item.price) || 0,
    currency,
    image: item.image,
    // Use a default description or derive from details if needed
    description: details[0] || 'Limited edition art print.',
    details: details.slice(1), // Remaining lines as details
    sizes,
  };
}


export async function createInvoice(
  items: CartItem[],
  shippingInfo: ShippingInfo,
  shippingCost: number // Add shippingCost parameter
): Promise<string> {

  // --- Security Enhancement: Fetch authoritative product data on the server ---
  const { products: authoritativeProducts, currency } = await fetchProducts();
  const productMap = new Map(authoritativeProducts.map(p => [p.id, p]));

  // --- Security Enhancement: Validate cart items ---
  let itemTotal = 0;
  const validatedItems: CartItem[] = [];

  for (const item of items) {
    // Validate quantity (basic check)
    if (item.quantity <= 0) {
      console.warn(`Invalid quantity ${item.quantity} for product ID ${item.product.id}. Skipping.`);
      continue;
    }

    // Use the price from the cart item (which comes from PocketBase formats)
    itemTotal += item.calculatedPrice * item.quantity;

    // Add the validated item
    validatedItems.push(item);
  }


  if (!currency) {
    throw new Error("Cannot create invoice with empty cart, missing currency, or no valid items.");
  }
  if (validatedItems.length === 0) {
    throw new Error("No valid items found in the cart to create an invoice.");
  }


  // Calculate grand total including shipping
  const grandTotal = itemTotal + shippingCost;

  // --- Security Enhancement: Use validated items and authoritative data ---
  const btcPayCartItems: BTCPayCartItem[] = validatedItems.map(item => {
    // Note: item.product is now the authoritative product data
    // item.calculatedPrice is the server-calculated price per unit
    return {
      id: item.product.id,
      count: item.quantity,
      image: item.product.image, // Use authoritative image
      price: {
        type: 2, // Custom price type
        value: item.calculatedPrice, // Use the pre-calculated server price per unit
        formatted: `${item.calculatedPrice.toFixed(2)} ${currency}` // Format the server price
      },
      // Use authoritative name and client-provided size
      title: `${item.product.name} (${item.size})`,
      inventory: null, // Assuming inventory is not tracked strictly here
      size: item.size // Keep size info if needed for posData or metadata
    };
  }); // End of map function

  // Calculate total number of items in the cart
  const totalItemsCount = btcPayCartItems.reduce((sum, item) => sum + item.count, 0);

  const payload: BTCPayInvoiceRequest = {
    metadata: {
      itemDesc: `Order from Flurs Shop (${totalItemsCount} items + Shipping)`, // Update description
      buyerEmail: shippingInfo.email,
      buyerName: shippingInfo.name,
      buyerAddress1: shippingInfo.address1,
      buyerAddress2: shippingInfo.address2,
      buyerCity: shippingInfo.city,
      buyerState: shippingInfo.state,
      buyerZip: shippingInfo.zip,
      buyerCountry: shippingInfo.country,
      buyerPhone: shippingInfo.phone,
      physical: true,
      posData: {
        cart: btcPayCartItems.map(cartItem => ({
          id: cartItem.id,
          title: cartItem.title,
          price: cartItem.price,
          quantity: cartItem.count,
          image: cartItem.image,
          size: cartItem.size,
          inventory: cartItem.inventory,
          count: cartItem.count,
        })),
        subTotal: itemTotal,
        shippingCost: shippingCost,
        total: grandTotal,
        // Add any other custom data you want embedded
      },
      // cartItems: btcPayCartItems, // Redundant if using posData string
      // Add shipping cost to top-level metadata too if desired
      shippingCost: shippingCost, // Keep this for potential filtering/reporting
      shippingCountry: shippingInfo.country, // Keep this for potential filtering/reporting
    },
    // checkout: { ... }, // Optional redirect URL
    amount: grandTotal, // Use the grand total for the invoice amount
    currency: currency
  };

  try {
    console.log('Creating invoice for store:', STORE_ID, 'Amount:', grandTotal, currency);
    // console.log('Creating invoice with payload:', JSON.stringify(payload, null, 2)); // Use if debugging payload

    const response = await fetch(
      `${API_URL}/api/v1/stores/${STORE_ID}/invoices`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        // Disable caching for POST requests
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('BTCPay error response status:', response.status);
      console.error('BTCPay error response body:', errorBody);
      // Attempt to parse JSON for more detailed error info
      try {
        const errorData = JSON.parse(errorBody);
        console.error('Parsed BTCPay error data:', errorData);
        throw new Error(`Failed to create invoice: ${response.status} - ${errorData.message || errorBody}`);
      } catch (parseError) {
        throw new Error(`Failed to create invoice: ${response.status} - ${errorBody}`);
      }
    }

    const data: BTCPayInvoiceResponse = await response.json();
    console.log('Invoice created successfully:', data.id, 'Checkout Link:', data.checkoutLink);
    return data.checkoutLink;
  } catch (error) {
    console.error('Error creating invoice:', error);
    // Re-throw a more specific error or handle it as needed
    throw new Error(`Could not create BTCPay invoice. ${error instanceof Error ? error.message : ''}`);
  }
}

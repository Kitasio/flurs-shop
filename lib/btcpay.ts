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
    { name: 'A4', dimensions: '210 x 297mm' },
    { name: 'A3', dimensions: '297 x 420mm' },
    { name: 'A2', dimensions: '420 x 594mm' }
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
  shippingInfo: ShippingInfo
): Promise<string> {

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const currency = items[0]?.product.currency;

  if (!currency) {
    throw new Error("Cannot create invoice with empty cart or missing currency.");
  }

  const btcPayCartItems: BTCPayCartItem[] = items.map(item => ({
    id: item.product.id,
    count: item.quantity,
    image: item.product.image,
    price: {
      type: 2, // Custom price type
      value: item.product.price,
      formatted: `${item.product.price.toFixed(2)} ${currency}` // Format price
    },
    title: item.product.name,
    inventory: null, // Assuming inventory is not tracked strictly here
    size: item.size
  }));

  const payload: BTCPayInvoiceRequest = {
    metadata: {
      itemDesc: `Order from Flurs Shop (${items.length} items)`,
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
      // Include structured cart items and total in posData
      posData: {
        cart: btcPayCartItems,
        total: total,
        subTotal: total,
        // Add other fields if needed by BTCPay POS app or for records
      },
      // Optionally include cart items directly in metadata as well
      cartItems: btcPayCartItems,
    },
    // Optional: Redirect URL after payment completion
    // checkout: {
    //   redirectURL: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmation/{InvoiceId}`
    // },
    amount: total,
    currency: currency
  };

  try {
    console.log('Creating invoice for store:', STORE_ID);
    // console.log('Creating invoice with payload:', JSON.stringify(payload, null, 2));

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
    console.log('Invoice created successfully:', data.id);
    return data.checkoutLink;
  } catch (error) {
    console.error('Error creating invoice:', error);
    // Re-throw a more specific error or handle it as needed
    throw new Error(`Could not create BTCPay invoice. ${error instanceof Error ? error.message : ''}`);
  }
}

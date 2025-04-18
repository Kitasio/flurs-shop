import type { BTCPayPosResponse, BTCPayProduct, Product, BTCPayInvoiceRequest, BTCPayInvoiceResponse } from '../types/btcpay';

const API_URL = import.meta.env.VITE_BTCPAY_API_URL;
const API_KEY = import.meta.env.VITE_BTCPAY_API_KEY;
const POS_ID = import.meta.env.VITE_BTCPAY_POS_ID;
const STORE_ID = import.meta.env.VITE_BTCPAY_STORE_ID;

export async function fetchProducts(): Promise<{ products: Product[], currency: string }> {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/apps/pos/${POS_ID}`,
      {
        headers: {
          'Authorization': `token ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
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
    throw error;
  }
}

function transformBTCPayProduct(item: BTCPayProduct, currency: string): Product {
  // Split description into details
  const details = item.description
    .split('\n')
    .filter(line => line.trim() !== '');

  // Default sizes if not specified in description
  const sizes = [
    { name: 'A4', dimensions: '210 x 297mm' },
    { name: 'A3', dimensions: '297 x 420mm' },
    { name: 'A2', dimensions: '420 x 594mm' }
  ];

  return {
    id: item.id,
    name: item.title.toUpperCase(),
    price: Number.parseInt(item.price),
    currency,
    image: item.image,
    description: 'Limited edition art print.',
    details,
    sizes,
  };
}

interface ShippingInfo {
  email: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export async function createInvoice(
  items: { product: Product; quantity: number; size: string; }[],
  shippingInfo: ShippingInfo
): Promise<string> {
  if (!STORE_ID) {
    throw new Error('Store ID is not configured');
  }

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const payload: BTCPayInvoiceRequest = {
    metadata: {
      itemDesc: "Art Posters",
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
        tip: 0,
        cart: items.map(item => ({
          id: item.product.id,
          count: item.quantity,
          image: item.product.image,
          price: {
            type: 2,
            value: item.product.price,
            formatted: `${item.product.price} ${item.product.currency}`
          },
          title: item.product.name,
          inventory: null,
          size: item.size // Include size in the cart item metadata
        })),
        total,
        subTotal: total,
        customAmount: 0,
        discountAmount: 0,
        discountPercentage: 0
      },
      receiptData: {
        Tip: "0 sats",
        Cart: {}
      }
    },
    amount: total,
    currency: items[0].product.currency
  };

  try {
    console.log('Creating invoice with payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(
      `${API_URL}/api/v1/stores/${STORE_ID}/invoices`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('BTCPay error response:', errorData);
      console.error('Response status:', response.status);
      throw new Error(`Failed to create invoice: ${response.status}`);
    }

    const data: BTCPayInvoiceResponse = await response.json();
    return data.checkoutLink;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
}

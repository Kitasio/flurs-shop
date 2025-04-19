export interface BTCPayProduct {
  id: string;
  title: string;
  disabled: boolean;
  description: string;
  categories: string[];
  image: string;
  priceType: string;
  price: string; // Price from BTCPay is a string
  buyButtonText: string;
  inventory: number | null;
}

export interface BTCPayPosResponse {
  items: BTCPayProduct[];
  title: string;
  currency: string;
  id: string;
  storeId: string;
}

// Our internal representation of a Product
export interface Product {
  id: string;
  name: string;
  price: number; // We'll store price as a number internally
  currency: string;
  image: string;
  description: string; // Short description
  details: string[]; // Longer details from BTCPay description
  sizes: {
    name: string;
    dimensions: string;
  }[];
}

// Type for items in our cart context
export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

// Type for items sent to BTCPay invoice API
export interface BTCPayCartItem {
  id: string;
  count: number;
  image: string;
  price: {
    type: number; // Typically 2 for custom price
    value: number;
    formatted: string;
  };
  title: string;
  inventory: number | null;
  size?: string; // Added size field
}

// Type for shipping information
export interface ShippingInfo {
  email: string;
  name: string;
  address1: string;
  address2?: string; // Optional
  city: string;
  state?: string; // Optional
  zip: string;
  country: string;
  phone?: string; // Optional
}


export interface BTCPayInvoiceRequest {
  metadata: {
    itemDesc: string;
    buyerEmail: string;
    buyerName?: string;
    buyerAddress1?: string;
    buyerAddress2?: string;
    buyerCity?: string;
    buyerState?: string;
    buyerZip?: string;
    buyerCountry?: string;
    buyerPhone?: string;
    physical?: boolean;
    // Using Record<string, any> for flexibility as BTCPay might change this
    posData: Record<string, any>;
    // Using Record<string, any> for flexibility
    receiptData?: Record<string, any>;
    // Add orderId for better tracking if needed
    orderId?: string;
    // Include cart items directly in metadata for easier reference
    cartItems?: BTCPayCartItem[];
  };
  checkout?: {
    redirectURL?: string; // URL to redirect after payment
    // Add other checkout options if needed
  };
  amount: number;
  currency: string;
}

export interface BTCPayInvoiceResponse {
  id: string;
  storeId: string;
  amount: string;
  currency: string;
  status: string;
  checkoutLink: string;
  // Add other fields as needed
}

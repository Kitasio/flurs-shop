export interface BTCPayProduct {
  id: string;
  title: string;
  disabled: boolean;
  description: string;
  categories: string[];
  image: string;
  priceType: string;
  price: string;
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

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  details: string[];
  sizes: {
    name: string;
    dimensions: string;
  }[];
}

export interface BTCPayCartItem {
  id: string;
  count: number;
  image: string;
  price: {
    type: number;
    value: number;
    formatted: string;
  };
  title: string;
  inventory: number | null;
  size?: string; // Added size field
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
    posData: {
      tip: number;
      cart: BTCPayCartItem[];
      total: number;
      subTotal: number;
      customAmount: number;
      discountAmount: number;
      discountPercentage: number;
    };
    receiptData: {
      Tip: string;
      Cart: Record<string, never>;
    };
  };
  amount: number;
  currency: string;
}
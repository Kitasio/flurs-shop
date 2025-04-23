"use client"; // This hook and provider must run client-side

import type React from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Product, CartItem } from '../types/btcpay';
// Import the price calculation helper
import { calculatePrice } from '../lib/pricing'; // <-- Updated import path

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, size: string) => void;
  removeFromCart: (productId: string, size: string) => void; // Identify item by product ID and size
  updateQuantity: (productId: string, size: string, quantity: number) => void; // Identify item by product ID and size
  clearCart: () => void;
  total: number;
  itemCount: number;
  currency: string | null; // Add currency to the context
  isCartReady: boolean; // Flag to indicate if cart has been loaded from storage
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'flurs_cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartReady, setIsCartReady] = useState(false); // Initialize as not ready

  // Load cart from localStorage on initial mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      // Handle potential errors (e.g., corrupted data, storage unavailable)
    } finally {
      setIsCartReady(true); // Mark cart as ready after attempting load
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    // Only save if the cart is ready (i.e., initial load is complete)
    // This prevents overwriting the stored cart with an empty initial state
    if (isCartReady) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [items, isCartReady]);

  const addToCart = useCallback((product: Product, quantity: number, size: string) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        // Price doesn't change when only quantity is updated for an existing item/size combo
        return updatedItems;
      }
      // Add new item with calculated price
      const calculatedPrice = calculatePrice(product.price, size);
      return [...prevItems, { product, quantity, size, calculatedPrice }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, size: string) => {
    setItems(prevItems =>
      prevItems.filter(item => !(item.product.id === productId && item.size === size))
    );
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: Math.max(0, quantity) } // Ensure quantity doesn't go below 0
          : item
      ).filter(item => item.quantity > 0) // Remove item if quantity becomes 0
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear cart in localStorage:", error);
    }
  }, []);


  // Calculate total based on the calculated price for each item's size
  const total = items.reduce(
    (sum, item) => sum + item.calculatedPrice * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Determine currency from the first item in the cart
  const currency = items.length > 0 ? items[0].product.currency : null;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        currency, // Provide currency in context
        isCartReady
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

"use client"; // Needs client-side context access

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartIcon() {
  const { itemCount, isCartReady } = useCart();

  // Optionally, don't render or show 0 until cart is loaded from storage
  const displayCount = isCartReady ? itemCount : 0;

  return (
    <Link
      href="/cart"
      className="relative p-2 hover:bg-gray-100 transition-colors"
      aria-label={`Shopping cart with ${displayCount} items`}
    >
      <ShoppingCart size={24} className="text-gray-800" />
      {isCartReady && itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full pointer-events-none">
          {itemCount}
        </span>
      )}
    </Link>
  );
}

"use client"; // Needs client-side context access

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import Image from 'next/image';

export default function CartIcon() {
  const { itemCount, isCartReady } = useCart();

  // Optionally, don't render or show 0 until cart is loaded from storage
  const displayCount = isCartReady ? itemCount : 0;

  return (
    <Link
      href="/cart"
      className="relative p-2 hover:scale-105 transition-transform"
      aria-label={`Shopping cart with ${displayCount} items`}
    >
      <Image alt="cart-icon" width={40} height={40} src="https://flurs.fly.storage.tigris.dev/web/cart.svg"/>
      {isCartReady && itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full pointer-events-none">
          {itemCount}
        </span>
      )}
    </Link>
  );
}

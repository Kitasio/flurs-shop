"use client"; // This component needs client-side hooks (useState, useCart)

import { useState, useMemo } from 'react'; // Import useMemo
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types/btcpay';
// Import the price calculation helper
import { calculatePrice } from '../../lib/pricing'; // <-- Updated import path

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { addToCart } = useCart();

  // Calculate displayed price based on selected size
  const displayedPrice = useMemo(() => {
    // Calculate the price for a single item based on size
    const singleItemPrice = selectedSize
      ? calculatePrice(product.price, selectedSize)
      : product.price; // Use base price if no size selected or size is base

    // Multiply by quantity
    return singleItemPrice * quantity;
  }, [product.price, selectedSize, quantity]); // Add quantity to dependency array

  const handleAddToCart = () => {
    setErrorMessage(''); // Clear previous error
    setShowSuccessMessage(false); // Hide previous success message

    if (!selectedSize) {
      setErrorMessage('Please select a size.');
      return;
    }
    if (quantity < 1) {
      setErrorMessage('Quantity must be at least 1.');
      return;
    }

    try {
      addToCart(product, quantity, selectedSize);
      // Optionally reset form or show success message
      // setSelectedSize(''); // Keep size selected?
      // setQuantity(1); // Reset quantity?
      setShowSuccessMessage(true);
      // Hide success message after a few seconds
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setErrorMessage('Could not add item to cart. Please try again.');
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-serif mb-2">{product.name}</h2>
      {/* Display dynamic price */}
      <p className="text-lg text-gray-700 mb-6">
        {displayedPrice.toLocaleString(undefined, { style: 'currency', currency: product.currency, minimumFractionDigits: 2 })}
        {selectedSize && selectedSize !== 'A4' && <span className="text-sm text-gray-500 ml-2">(Size: {selectedSize})</span>}
      </p>

      {/* Short Description */}
      <p className="text-gray-600 mb-6">{product.description}</p>

      {/* First Detail Line (if exists) */}
      {product.details[0] && (
        <p className="text-gray-600 mb-6 whitespace-pre-wrap">
          {product.details[0]}
        </p>
      )}

      {/* Available Sizes Info */}
      <div className="mb-8">
        <h3 className="text-sm font-medium mb-2">Available in the following sizes:</h3>
        {product.sizes.map(size => (
          <p key={size.name} className="text-gray-600 text-sm">
            {size.name} - {size.dimensions}
          </p>
        ))}
      </div>

      {/* Interactive Section */}
      <div className="space-y-6">
        {/* Size Selector */}
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
            SIZE: *
          </label>
          <select
            id="size"
            value={selectedSize}
            onChange={(e) => {
              setSelectedSize(e.target.value);
              setErrorMessage(''); // Clear error when size changes
              setShowSuccessMessage(false);
            }}
            required
            className={`w-full p-3 border rounded bg-gray-50 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 ${errorMessage && !selectedSize ? 'border-red-500' : 'border-gray-300'}`}
            aria-describedby={errorMessage && !selectedSize ? "size-error" : undefined}
          >
            <option value="" disabled>SELECT SIZE</option>
            {product.sizes.map(size => (
              <option key={size.name} value={size.name}>{size.name}</option>
            ))}
          </select>
          {errorMessage && !selectedSize && (
            <p id="size-error" className="text-red-600 text-sm mt-1">{errorMessage}</p>
          )}
        </div>

        {/* Quantity Selector */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
            QUANTITY:
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value, 10) || 1))}
            className="w-32 p-3 border border-gray-300 rounded bg-gray-50 focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full bg-gray-900 text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          ADD TO CART
        </button>

        {/* Success Message */}
        {showSuccessMessage && (
          <p className="text-green-600 text-sm mt-2 text-center">Item added to cart!</p>
        )}
        {/* General Error Message (e.g., from addToCart failure) */}
        {errorMessage && selectedSize && (
          <p className="text-red-600 text-sm mt-2 text-center">{errorMessage}</p>
        )}
      </div>

      {/* Remaining Details */}
      <div className="mt-8 text-sm text-gray-500 space-y-2">
        {product.details.slice(1).map((detail, index) => (
          <p key={`detail-${index}-${detail}`}>{detail}</p>
        ))}
      </div>
    </div>
  );
}

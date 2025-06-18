"use client";

import { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import type { Poster } from '../../types/poster';

interface ProductClientProps {
  poster: Poster;
}

export default function ProductClient ({ poster }: ProductClientProps) {
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { addToCart } = useCart();

  // Calculate displayed price based on selected format
  const displayedPrice = useMemo(() => {
    const selectedFormatData = poster.formats.data.find(f => f.name === selectedFormat);
    const singleItemPrice = selectedFormatData ? selectedFormatData.price : poster.formats.data[0]?.price || 0;
    return singleItemPrice * quantity;
  }, [poster.formats.data, selectedFormat, quantity]);

  const handleAddToCart = () => {
    setErrorMessage('');
    setShowSuccessMessage(false);

    if (!selectedFormat) {
      setErrorMessage('Please select a format.');
      return;
    }

    // Require color selection if poster has colors
    if (poster.colors && poster.colors.length > 0 && !selectedColor) {
      setErrorMessage('Please select a color.');
      return;
    }
    if (quantity < 1) {
      setErrorMessage('Quantity must be at least 1.');
      return;
    }

    const selectedFormatData = poster.formats.data.find(f => f.name === selectedFormat);
    if (!selectedFormatData) {
      setErrorMessage('Selected format is not available.');
      return;
    }

    try {
      // Convert poster to product format for cart compatibility
      const productForCart = {
        id: poster.id,
        name: poster.name,
        price: selectedFormatData.price,
        currency: 'USD', // You might want to make this configurable
        image: poster.images.data[0],
        description: poster.description,
        details: [],
        sizes: poster.formats.data.map(f => ({ name: f.name, dimensions: f.name }))
      };

      addToCart(productForCart, quantity, selectedFormat, selectedColor);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setErrorMessage('Could not add item to cart. Please try again.');
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-serif mb-2">{poster.name}</h2>

      {/* Display dynamic price */}
      <p className="text-lg text-gray-700 mb-6">
        ${displayedPrice.toFixed(2)}
        {selectedFormat && <span className="text-sm text-gray-500 ml-2">(Format: {selectedFormat})</span>}
      </p>

      {/* Description */}
      <p dangerouslySetInnerHTML={{ __html: poster.description }} className="text-gray-600 mb-6"></p>

      {/* Available Formats Info */}
      <div className="mb-8">
        <h3 className="text-sm font-medium mb-2">Available formats:</h3>
        {poster.formats.data.map(format => (
          <p key={format.name} className="text-gray-600 text-sm">
            {format.name} - ${format.price.toFixed(2)}
          </p>
        ))}
      </div>

      {/* Interactive Section */}
      <div className="space-y-6">
        {/* Format Selector */}
        <div>
          <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-2">
            FORMAT: *
          </label>
          <select
            id="format"
            value={selectedFormat}
            onChange={(e) => {
              setSelectedFormat(e.target.value);
              setErrorMessage('');
              setShowSuccessMessage(false);
            }}
            required
            className={`w-full p-3 border bg-gray-50 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 ${errorMessage && !selectedFormat ? 'border-red-500' : 'border-gray-300'}`}
            aria-describedby={errorMessage && !selectedFormat ? "format-error" : undefined}
          >
            <option value="" disabled>SELECT FORMAT</option>
            {poster.formats.data.map(format => (
              <option key={format.name} value={format.name}>
                {format.name} - ${format.price.toFixed(2)}
              </option>
            ))}
          </select>
          {errorMessage && !selectedFormat && (
            <p id="format-error" className="text-red-600 text-sm mt-1">{errorMessage}</p>
          )}
        </div>

        {/* Color Selector (only if poster has colors) */}
        {poster.colors && poster.colors.length > 0 && (
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
              COLOR: *
            </label>
            <select
              id="color"
              value={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.target.value);
                setErrorMessage('');
                setShowSuccessMessage(false);
              }}
              required
              className={`w-full p-3 border bg-gray-50 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 ${errorMessage && !selectedColor ? 'border-red-500' : 'border-gray-300'}`}
              aria-describedby={errorMessage && !selectedColor ? "color-error" : undefined}
            >
              <option value="" disabled>SELECT COLOR</option>
              {poster.colors.map(color => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            {errorMessage && !selectedColor && (
              <p id="color-error" className="text-red-600 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
        )}

        {/* Quantity Selector */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
            QUANTITY:
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            max={poster.inventory || undefined}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value, 10) || 1))}
            className="w-32 p-3 border border-gray-300 bg-gray-50 focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
          />
          {poster.inventory && (
            <p className="text-sm text-gray-500 mt-1">{poster.inventory} in stock</p>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full bg-gray-900 text-white py-3 px-6 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          ADD TO CART
        </button>

        {/* Success Message */}
        {showSuccessMessage && (
          <p className="text-green-600 text-sm mt-2 text-center">Item added to cart!</p>
        )}
        {/* General Error Message */}
        {errorMessage && selectedFormat && (
          <p className="text-red-600 text-sm mt-2 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Hand } from 'lucide-react';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <h1 className="text-3xl font-serif italic text-gray-800 p-6 text-center">Flurs</h1>

      {/* Navigation Buttons */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl">
          {['Shop', 'Gallery', 'About'].map((text) => (
            <button
              key={text}
              onClick={() => navigate(`/${text.toLowerCase()}`)}
              className="group relative flex flex-col items-center transition-transform hover:scale-105"
            >
              {/* Hand Icon Container */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-800 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" />
                <Hand
                  size={120}
                  className="text-gray-700 transform -rotate-45 group-hover:text-gray-900 transition-colors"
                  strokeWidth={1.5}
                />
                {/* Text Overlay */}
                <span className="absolute font-serif italic text-2xl text-gray-800">
                  {text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createInvoice } from '../api/btcpay';

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

function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    email: '',
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async () => {
    // Basic validation
    const requiredFields: (keyof ShippingInfo)[] = ['email', 'name', 'address1', 'city', 'country', 'zip'];
    const missingFields = requiredFields.filter(field => !shippingInfo[field]);

    if (missingFields.length > 0) {
      setError(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }

    if (!items.length) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const checkoutUrl = await createInvoice(items, shippingInfo);
      window.location.href = checkoutUrl;
    } catch (err) {
      setError('Failed to create invoice. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-6 flex items-center">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center text-gray-800 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          <span className="font-serif italic">Back</span>
        </button>
        <h1 className="text-3xl font-serif italic text-gray-800 flex-1 text-center">Flurs</h1>
        <div className="w-20" /> {/* Spacer for centering */}
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-serif mb-8">Shopping Cart</h2>

        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-6 py-6 border-b">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover bg-gray-100"
                  />
                  <div className="flex-1">
                    <h3 className="font-serif text-lg">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="w-24 text-right">
                    {(item.product.price * item.quantity).toLocaleString()} {item.product.currency}
                  </p>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>{total.toLocaleString()} {items[0].product.currency}</span>
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={shippingInfo.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    value={shippingInfo.address1}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    value={shippingInfo.address2}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP/Postal Code *
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={shippingInfo.zip}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              >
                {loading ? 'Processing...' : 'CHECKOUT'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;

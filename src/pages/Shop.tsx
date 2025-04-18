import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartIcon from '../components/CartIcon';
import { fetchProducts } from '../api/btcpay';
import type { Product } from '../types/btcpay';

export default function Shop() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [currency, setCurrency] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.products);
        setCurrency(data.currency);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 sm:p-8 flex items-center">
        <h1 className="text-3xl sm:text-4xl font-serif italic text-gray-800 flex-1">Flurs</h1>
        <CartIcon />
      </header>

      {/* Product Grid */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 sm:gap-6">
          {products.map((product) => (
            <button
              type="button"
              key={product.id}
              onClick={() => navigate(`/${product.id}`)}
              className="group text-left w-full"
            >
              <div className="aspect-square mb-4 overflow-hidden rounded-lg shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="px-2">
                <h3 className="font-serif text-xl sm:text-lg text-gray-900 mb-2">{product.name}</h3>
                <p className="text-lg sm:text-base text-gray-500">{product.price.toLocaleString()} {currency}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

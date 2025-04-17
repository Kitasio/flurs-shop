import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartIcon from '../components/CartIcon';
import { fetchProducts } from '../api/btcpay';
import type { Product as ProductType } from '../types/btcpay';

export default function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { products } = await fetchProducts();
        const foundProduct = products.find(p => p.id === id);
        setProduct(foundProduct || null);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, quantity, selectedSize);
    setSelectedSize('');
    setQuantity(1);
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
        <CartIcon />
      </header>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Image */}
          <div className="sticky top-8 h-fit">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-serif mb-2">{product.name}</h2>
            <p className="text-lg text-gray-700 mb-6">{product.price.toLocaleString()} {product.currency}</p>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <p className="text-gray-600 mb-6 whitespace-pre-wrap">
              {product.details[0]}
            </p>

            <div className="mb-8">
              <h3 className="text-sm font-medium mb-2">Available in the following sizes:</h3>
              {product.sizes.map(size => (
                <p key={size.name} className="text-gray-600">
                  {size.name} - {size.dimensions}
                </p>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                  SIZE:
                </label>
                <select
                  id="size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                >
                  <option value="">SELECT SIZE</option>
                  {product.sizes.map(size => (
                    <option key={size.name} value={size.name}>{size.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  QUANTITY:
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value, 10))}
                  className="w-32 p-2 border border-gray-300 rounded bg-gray-100"
                />
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors"
              >
                ADD TO CART
              </button>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              {product.details.slice(1).map((detail, index) => (
                <p key={`index-${index}-detail-${detail}`} className="mb-2">{detail}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

function CartIcon() {
  const navigate = useNavigate();
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={() => navigate('/cart')}
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  );
}

export default CartIcon;
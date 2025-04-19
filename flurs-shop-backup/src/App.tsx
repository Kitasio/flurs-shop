import { Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
}

export default App;

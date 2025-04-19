"use client"; // This page relies heavily on client-side hooks and state

import type React from 'react';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link'; // Use Next.js Link
import Image from 'next/image'; // Use Next.js Image
import { useRouter } from 'next/navigation'; // Import useRouter for client-side redirect
import { Minus, Plus, X, Loader2 } from 'lucide-react'; // Add Loader icon
import { useCart } from '../../context/CartContext';
import Header from '../../components/Header'; // Import Header
import { processCheckout } from './actions'; // Import the Server Action

// Define the initial state for the form action
const initialCheckoutState = {
  message: null,
  success: false,
};

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, itemCount, currency, isCartReady } = useCart();
  const router = useRouter(); // Get router instance
  // useFormState hook to manage form submission state with Server Actions
  const [state, formAction] = useActionState(processCheckout.bind(null, items), initialCheckoutState); // Bind cart items

  // Effect to handle redirect on successful checkout
  useEffect(() => {
    if (state.success && state.checkoutUrl) {
      console.log("Checkout successful, redirecting client-side to:", state.checkoutUrl);
      // Optional: Clear cart before redirecting
      // clearCart();
      router.push(state.checkoutUrl); // Perform client-side redirect
    }
  }, [state, router]); // Add router and clearCart to dependencies

  // Display loading indicator while cart is loading from storage
  if (!isCartReady) {
    return (
      <>
        <Header showBackButton={true} />
        <div className="min-h-[calc(100vh-150px)] flex items-center justify-center">
          <Loader2 className="animate-spin mr-2" size={24} /> Loading Cart...
        </div>
      </>
    );
  }

  return (
    <>
      {/* Render Header with back button */}
      <Header showBackButton={true} />

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-2xl font-serif mb-8">Shopping Cart</h2>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link href="/" className="text-gray-800 hover:underline font-medium">
              Continue Shopping
            </Link>
          </div>
        ) : (
          // Use a form element that triggers the server action
          <form action={formAction}>
            {/* Cart Items List */}
            <div className="space-y-6 mb-10">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex items-start sm:items-center gap-4 py-4 border-b flex-col sm:flex-row">
                  <Link href={`/${item.product.id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden relative">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="96px"
                        className="object-contain"
                      />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/${item.product.id}`}>
                      <h3 className="font-serif text-lg truncate" title={item.product.name}>{item.product.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm text-gray-800 sm:hidden mt-1"> {/* Price on mobile */}
                      {item.product.price.toLocaleString(undefined, { style: 'currency', currency: item.product.currency, minimumFractionDigits: 2 })} each
                    </p>
                  </div>
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 sm:gap-4">
                    <button
                      type="button" // Prevent form submission
                      onClick={() => updateQuantity(item.product.id, item.size, Math.max(1, item.quantity - 1))}
                      className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-50"
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      type="button" // Prevent form submission
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="p-1.5 hover:bg-gray-100 rounded"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {/* Price per item group (hidden on mobile) */}
                  <p className="w-28 text-right font-medium hidden sm:block">
                    {(item.product.price * item.quantity).toLocaleString(undefined, { style: 'currency', currency: item.product.currency, minimumFractionDigits: 2 })}
                  </p>
                  {/* Remove Button */}
                  <button
                    type="button" // Prevent form submission
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    className="p-2 hover:bg-gray-100 rounded text-gray-500 hover:text-red-600"
                    aria-label="Remove item"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary and Shipping Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Shipping Information Form */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif mb-4">Shipping Information</h3>
                {/* Required Fields */}
                <InputField label="Email Address *" type="email" name="email" required />
                <InputField label="Full Name *" type="text" name="name" required />
                <InputField label="Address Line 1 *" type="text" name="address1" required />
                <InputField label="Address Line 2" type="text" name="address2" />
                <InputField label="City *" type="text" name="city" required />
                <InputField label="State/Province" type="text" name="state" />
                <InputField label="ZIP/Postal Code *" type="text" name="zip" required />
                <InputField label="Country *" type="text" name="country" required />
                <InputField label="Phone Number (Optional)" type="tel" name="phone" />
              </div>

              {/* Order Summary & Checkout Button */}
              <div className="space-y-6">
                <h3 className="text-xl font-serif mb-4">Order Summary</h3>
                <div className="flex justify-between text-lg font-medium border-t pt-4">
                  <span>Total ({itemCount} items)</span>
                  <span>{total.toLocaleString(undefined, { style: 'currency', currency: currency || 'USD', minimumFractionDigits: 2 })}</span>
                </div>

                {/* Display Server Action Error Messages */}
                {!state.success && state.message && (
                  <p className="text-red-600 text-sm bg-red-50 p-3 rounded border border-red-200">{state.message}</p>
                )}

                {/* Checkout Button (uses useFormStatus) */}
                <CheckoutButton />
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

// Helper component for input fields
function InputField({ label, type, name, required = false }: { label: string, type: string, name: string, required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        className="w-full p-2 border border-gray-300 rounded bg-gray-50 focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
      />
    </div>
  );
}

// Helper component for the submit button to show pending state
function CheckoutButton() {
  const { pending } = useFormStatus(); // Hook to check form submission status

  return (
    <button
      type="submit"
      disabled={pending} // Disable button while form is submitting
      className="w-full bg-gray-900 text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
      aria-disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2" size={20} /> Processing...
        </>
      ) : (
        'PROCEED TO CHECKOUT'
      )}
    </button>
  );
}

// Add currency to CartContextType and CartProvider return value
// (Need to modify CartContext.tsx for this)

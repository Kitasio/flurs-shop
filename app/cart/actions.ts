"use server"; // Mark this module as containing Server Actions

import { createInvoice } from '../../lib/btcpay'; // Server-side function
import type { CartItem, ShippingInfo } from '../../types/btcpay';

// Define the expected state for the form action
interface CheckoutFormState {
  message: string | null;
  success: boolean;
  checkoutUrl?: string;
  errors?: Record<string, string[]>; // For field-specific errors (optional)
}

export async function processCheckout(
  cartItems: CartItem[], // Pass cart items from the client
  prevState: CheckoutFormState, // Previous state (unused here, but required by useFormState)
  formData: FormData // Form data submitted by the user
): Promise<CheckoutFormState> {

  if (!cartItems || cartItems.length === 0) {
    return { success: false, message: "Your cart is empty." };
  }

  // Extract and validate shipping info from FormData
  const shippingInfo: ShippingInfo = {
    email: formData.get('email') as string,
    name: formData.get('name') as string,
    address1: formData.get('address1') as string,
    address2: formData.get('address2') as string || undefined,
    city: formData.get('city') as string,
    state: formData.get('state') as string || undefined,
    zip: formData.get('zip') as string,
    country: formData.get('country') as string,
    phone: formData.get('phone') as string || undefined,
  };

  // Basic server-side validation (add more as needed)
  const requiredFields: (keyof ShippingInfo)[] = ['email', 'name', 'address1', 'city', 'country', 'zip'];
  const missingFields = requiredFields.filter(field => !shippingInfo[field]);

  if (missingFields.length > 0) {
    // TODO: Implement field-specific errors if desired
    return { success: false, message: `Missing required fields: ${missingFields.join(', ')}` };
  }

  // Validate email format (basic)
  if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
    return { success: false, message: "Invalid email address format." };
  }

  try {
    console.log("Processing checkout with items:", cartItems.length, "and shipping info:", shippingInfo.email);
    const checkoutUrl = await createInvoice(cartItems, shippingInfo);
    console.log("Invoice created, returning URL:", checkoutUrl);

    // Return success state with the checkout URL
    return { success: true, message: "Invoice created successfully.", checkoutUrl: checkoutUrl };

  } catch (error) {
    console.error("Checkout failed:", error);
    // Return error state to the form
    return { success: false, message: `Checkout failed: ${error instanceof Error ? error.message : 'Please try again.'}` };
  }

  // Redirect is now handled client-side based on the returned state
}

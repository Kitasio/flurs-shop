import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchProducts } from '../../lib/btcpay';
import type { Product } from '../../types/btcpay';
import Header from '../../components/Header'; // Import Header to use it here
import ProductClient from './ProductClient'; // Import the client component

interface ProductPageProps {
  params: { id: string };
}

// Optional: Generate static paths at build time
export async function generateStaticParams() {
  try {
    const { products } = await fetchProducts();
    return products.map((product) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return []; // Return empty array on error
  }
}

// Revalidate data periodically (e.g., every hour)
export const revalidate = 3600;

// This is the main Server Component for the product page
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  let product: Product | undefined;
  let error: string | null = null;

  try {
    // Fetch all products and find the one matching the ID
    // In a real-world scenario with many products, fetch only the required one if API allows
    const { products } = await fetchProducts();
    product = products.find(p => p.id === id);
  } catch (err) {
    console.error(`Failed to load product ${id}:`, err);
    error = 'Failed to load product details. Please try again later.';
    // Consider using Next.js error handling (error.tsx)
  }

  if (error) {
    // Render error state (could be a dedicated component)
    return (
      <>
        {/* Render header with back button even on error */}
        <Header showBackButton={true} />
        <div className="min-h-[calc(100vh-150px)] flex items-center justify-center px-4">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </>
    );
  }

  // If product is not found after fetching, return 404
  if (!product) {
    notFound(); // Triggers the not-found.tsx page
  }

  return (
    <>
      {/* Render Header with back button */}
      <Header showBackButton={true} />

      {/* Product Details Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Image */}
          <div className="h-fit top-8"> {/* Make image sticky on larger screens */}
            <div className="bg-gray-50 rounded-lg overflow-hidden aspect-square relative shadow-sm">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority // Prioritize loading the main product image
              />
            </div>
          </div>

          {/* Right Column - Product Info (Pass data to Client Component) */}
          {/* ProductClient handles size, quantity, and add to cart */}
          <ProductClient product={product} />

        </div>
      </div>
    </>
  );
}

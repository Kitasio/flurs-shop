import Link from 'next/link';
import Image from 'next/image';
import { fetchProducts } from '../lib/btcpay';
import type { Product } from '../types/btcpay';
import Header from '@/components/Header';
import { listAllPosters } from '@/lib/pb';

// This is a React Server Component (RSC)
export default async function ShopPage () {
  let products: Product[] = [];
  let currency = '';
  let error: string | null = null;

  const posters = await listAllPosters();
  console.log('posters', posters);

  try {
    const data = await fetchProducts();
    products = data.products;
    currency = data.currency;
  } catch (err) {
    console.error("Failed to load products:", err);
    // In a real app, you might render a dedicated error component
    // or use Next.js error handling mechanisms (error.tsx)
    error = 'Failed to load products. Please try refreshing the page.';
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-4">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-4">
        <p className="text-gray-600">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 sm:gap-6">
          {products.map((product) => (
            <Link
              href={`/${product.id}`}
              key={product.id}
              className="group text-left w-full block"
              aria-label={`View details for ${product.name}`}
            >
              <div className="aspect-square mb-4 overflow-hidden shadow-sm bg-gray-50 relative">
                {/* Use Next.js Image component for optimization */}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill // Use fill to make image cover the container
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" // Define responsive sizes
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  priority={products.indexOf(product) < 4} // Prioritize loading images for the first few products
                />
              </div>
              <div className="px-2">
                <h3 className="font-serif text-xl sm:text-lg text-gray-900 mb-1 truncate" title={product.name}>
                  {product.name}
                </h3>
                {/* Format price properly */}
                <p className="text-lg sm:text-base text-gray-500">
                  From {product.price.toLocaleString(undefined, { style: 'currency', currency: currency, minimumFractionDigits: 2 })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

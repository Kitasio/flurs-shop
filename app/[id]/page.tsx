import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPosterById } from '../../lib/pb';
import type { Poster } from '../../types/poster';
import Header from '../../components/Header';
import ProductClient from './ProductClient';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Revalidate data periodically (e.g., every hour)
export const revalidate = 3600;

// This is the main Server Component for the product page
export default async function ProductPage ({ params }: ProductPageProps) {
  const { id } = await params;

  let poster: Poster | null = null;
  let error: string | null = null;

  try {
    poster = await getPosterById(id);
  } catch (err) {
    console.error(`Failed to load poster ${id}:`, err);
    error = 'Failed to load poster details. Please try again later.';
  }

  if (error) {
    return (
      <>
        <Header showBackButton={true} />
        <div className="min-h-[calc(100vh-150px)] flex items-center justify-center px-4">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </>
    );
  }

  // If poster is not found or is hidden, return 404
  if (!poster || poster.hidden) {
    notFound();
  }

  return (
    <>
      <Header showBackButton={true} />

      {/* Product Details Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Left Column - Product Images */}
          <div className="h-fit top-8 lg:col-span-3">
            <div className="space-y-4">
              {poster.images.data.map((image, index) => (
                <div key={index} className="bg-gray-50 overflow-hidden aspect-square relative shadow-sm">
                  <img
                    src={image}
                    alt={`${poster.name} - Image ${index + 1}`}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:col-span-1">
            <ProductClient poster={poster} />
          </div>

        </div>
      </div>
    </>
  );
}

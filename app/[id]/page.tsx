import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPosterById } from '../../lib/pb';
import type { Poster } from '../../types/poster';
import Header from '../../components/Header';
import ProductClient from './ProductClient';
import ImageGallery from './ImageGallery';
import NavigationButtons from './NavigationButtons';

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
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Left Column - Product Images */}
          <div className="h-fit top-8 lg:col-span-3">
            <ImageGallery images={poster.images.data} productName={poster.name} />
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:col-span-1">
            <ProductClient poster={poster} />
          </div>

        </div>
      </div>

      {/* Navigation Buttons - Handprint Style - Below entire product */}
      <NavigationButtons />
<div className="relative h-screen">
      {/* ABOUT */}
      <a
        href="/about"
        className="absolute top-[50px] left-[100px] w-[260px] hover:scale-105 transition-transform"
      >
        <img src="https://flurs.fly.storage.tigris.dev/web/about.svg" alt="About" className="w-full h-auto" />
      </a>

      {/* PORTFOLIO */}
      <a
        href="/portfolio"
        className="absolute top-[250px] left-[400px] w-[380px] hover:scale-105 transition-transform"
      >
        <img src="https://flurs.fly.storage.tigris.dev/web/portfolio.svg" alt="Stockists" className="w-full h-auto" />
      </a>

      {/* ARCHIVE */}
      <a
        href="/archive"
        className="absolute top-[330px] right-[100px] w-[550px] hover:scale-105 transition-transform"
      >
        <img src="https://flurs.fly.storage.tigris.dev/web/archive.svg" alt="Archive" className="w-full h-auto" />
      </a>

      {/* CONTACT */}
      <a
        href="/contact"
        className="absolute top-[50px] right-[100px] w-[600px] hover:scale-105 transition-transform"
      >
        <img src="https://flurs.fly.storage.tigris.dev/web/contact.svg" alt="Contact" className="w-full h-auto" />
      </a>
            {/* Grass */}
      <a
        href="/grass"
        className="absolute top-[550px] left-[100px] w-[600px] hover:scale-105 transition-transform"
      >
        <img src="https://flurs.fly.storage.tigris.dev/web/Group 5.svg" alt="Archive" className="w-full h-auto" />
      </a>
            {/* Flower */}
      <a
        href="/flower"
        className="absolute top-[60px] left-[390px] w-[200px] hover:scale-105 transition-transform"
      >
        <img src="https://flurs.fly.storage.tigris.dev/web/flower.svg" alt="Archive" className="w-full h-auto" />
      </a>
             {/* Flower2 */}
      <a
        href="/flower"
        className="absolute top-[60px] left-[500px] w-[200px] hover:scale-105 transition-transform"
      >
        <img src="https://flurs.fly.storage.tigris.dev/web/flower.svg" alt="Archive" className="w-full h-auto" />
      </a>
              {/* Flower3 */}
      <a
        href="/flower"
        className="absolute top-[250px] right-[450px] w-[200px] hover:scale-105 transition-transform"
      >
        <img src="https://flurs.fly.storage.tigris.dev/web/flowers.svg" alt="Archive" className="w-full h-auto" />
      </a>
               {/* Flower3 */}
      <a
        href="/flower"
        className="absolute top-[250px] right-[100px] w-[200px] hover:scale-105 transition-transform"
      >
        <img src="https://flurs.fly.storage.tigris.dev/web/flowers.svg" alt="Archive" className="w-full h-auto" />
      </a>
                {/* Flower3 */}
      <a
        href="/flower"
        className="absolute top-[250px] right-[270px] w-[200px] hover:scale-105 transition-transform"
      >
        <img src="https://flurs.fly.storage.tigris.dev/web/flowers.svg" alt="Archive" className="w-full h-auto" />
      </a>
    </div>
    </>
  );
}

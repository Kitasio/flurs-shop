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

      {/* New Grid Layout */}
  <div className="px-4 sm:px-6 lg:px-8 py-8 mt-16">
  <div className="grid grid-cols-12 grid-rows-5 bg-gray-300 gap-1">
    {/* Portfolio*/}
    <div className="col-span-4 row-span-4 relative">
      <Image
        src="https://flurs.fly.storage.tigris.dev/web/portfolio.png"
        alt="Portfolio"
        fill
        className="object-contain"
      />
    </div>
       {/*About*/}
<div className="col-start-5 col-span-3 row-start-3 row-span-2 relative"> 
   <Image
        src="https://flurs.fly.storage.tigris.dev/web/about.png"
        alt="About"
        fill
        className='object-contain'
      />
    </div>
           {/*Contact*/}
<div className="col-start-7 col-span-6 row-start-1 row-span-2 relative"> 
   <Image
        src="https://flurs.fly.storage.tigris.dev/web/contact.png"
        alt="Contact"
        fill
        className='object-contain'
      />
    </div>
    {/*Archive*/}
<div className="col-start-8 col-span-5 row-span-4 relative"> 
   <Image
        src="https://flurs.fly.storage.tigris.dev/web/archive.png"
        alt="Archive"
        fill
        className='object-contain'
      />
    </div>
  {/* Fill remaining grid cells */}
    {Array.from({ length: 70 }).map((_, index) => (
      <div
        key={index}
        className="h-40 bg-white border border-gray-400"
      />
    ))}
  </div>
</div>
    </>
  );
}

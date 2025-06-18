import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { listAllPosters } from '@/lib/pb';
import type { Poster } from '@/types/poster';

// This is a React Server Component (RSC)
export default async function ShopPage () {
  let posters: Poster[] = [];
  let error: string | null = null;

  try {
    posters = await listAllPosters();
    // Filter out hidden posters
    posters = posters.filter(poster => !poster.hidden);
  } catch (err) {
    console.error("Failed to load posters:", err);
    error = 'Failed to load posters. Please try refreshing the page.';
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-4">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  if (!posters.length) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-4">
        <p className="text-gray-600">No posters available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 sm:gap-6">
          {posters.map((poster) => (
            <Link
              href={`/${poster.id}`}
              key={poster.id}
              className="group text-left w-full block"
              aria-label={`View details for ${poster.name}`}
            >
              <div className="aspect-square mb-4 overflow-hidden shadow-sm bg-gray-50 relative">
                {/* Use the first image from the images array */}
                <Image
                  src={poster.images.data[0]}
                  alt={poster.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  priority={posters.indexOf(poster) < 4}
                />
              </div>
              <div className="px-2">
                <h3 className="font-serif text-xl sm:text-lg text-gray-900 mb-1 truncate" title={poster.name}>
                  {poster.name}
                </h3>
                {/* Show price from the first format */}
                <p className="text-lg sm:text-base text-gray-500">
                  From ${poster.formats.data[0]?.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

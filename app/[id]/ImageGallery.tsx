"use client";

import { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="bg-gray-50 overflow-hidden aspect-square relative shadow-sm">
          <img
            src={images[selectedImageIndex]}
            alt={`${productName} - Main view`}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 overflow-hidden relative transition-all duration-200 hover:ring-1 hover:ring-stone-100 hover:ring-opacity-50 hover:shadow-sm focus:outline-none focus:ring-0"
                `}
              >
                <img
                  src={image}
                  alt={`${productName} - View ${index + 1}`}
                  className="object-contain w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
      </div>

    </>
  );
}

"use client";

import { useState, useEffect } from 'react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleMainImageClick = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          if (images.length > 1) {
            navigateLightbox('prev');
          }
          break;
        case 'ArrowRight':
          if (images.length > 1) {
            navigateLightbox('next');
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="bg-gray-50 overflow-hidden aspect-square relative shadow-sm cursor-pointer">
          <img
            src={images[selectedImageIndex]}
            alt={`${productName} - Main view`}
            className="object-contain w-full h-full"
            onClick={handleMainImageClick}
          />
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 overflow-hidden relative transition-all duration-200 ${
                  selectedImageIndex === index
                    ? 'ring-2 ring-gray-900 shadow-md'
                    : 'hover:ring-1 hover:ring-gray-400 hover:shadow-sm'
                }`}
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

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Previous image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Next image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Main lightbox image */}
          <div className="max-w-full max-h-full flex items-center justify-center">
            <img
              src={images[selectedImageIndex]}
              alt={`${productName} - Full size view`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
              {selectedImageIndex + 1} / {images.length}
            </div>
          )}

          {/* Keyboard navigation hint */}
          <div className="absolute bottom-4 right-4 text-white text-xs opacity-70">
            Press ESC to close
          </div>
        </div>
      )}
    </>
  );
}

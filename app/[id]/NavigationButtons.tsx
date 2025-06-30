"use client";

export default function NavigationButtons() {
  return (
    <>
      {/* Desktop navigation (hidden on mobile) */}
      <div className="hidden sm:block relative w-full pt-[56.25%]">
        {/* ABOUT */}
        <a
          href="/about"
          className="absolute top-[4.63%] left-[5.21%] w-[13.54%] hover:scale-105 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/about.svg" alt="About" className="w-full h-auto" />
        </a>

        {/* PORTFOLIO */}
        <a
          href="/portfolio"
          className="absolute top-[23.15%] left-[20.83%] w-[19.79%] hover:scale-105 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/portfolio.svg" alt="Stockists" className="w-full h-auto" />
        </a>

        {/* ARCHIVE */}
        <a
          href="/archive"
          className="absolute top-[30.56%] right-[5.21%] w-[28.65%] hover:scale-105 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/archive.svg" alt="Archive" className="w-full h-auto" />
        </a>

        {/* CONTACT */}
        <a
          href="/contact"
          className="absolute top-[4.63%] right-[5.21%] w-[31.25%] hover:scale-105 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/contact.svg" alt="Contact" className="w-full h-auto" />
        </a>
        {/* Grass */}
        <a
          href="/grass"
          className="absolute top-[50.93%] left-[5.21%] w-[31.25%] hover:scale-105 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/Group 5.svg" alt="Archive" className="w-full h-auto" />
        </a>
        {/* Flower */}
        <a
          href="/flower"
          className="absolute top-[5.56%] left-[20.31%] w-[10.42%] hover:scale-105 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/flower.svg" alt="Archive" className="w-full h-auto" />
        </a>
        {/* Flower2 */}
        <a
          href="/flower"
          className="absolute top-[5.56%] left-[26.04%] w-[10.42%] hover:scale-105 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/flower.svg" alt="Archive" className="w-full h-auto" />
        </a>
        {/* Flower3 */}
        <a
          href="/flower"
          className="absolute top-[23.15%] right-[23.44%] w-[10.42%] hover:scale-105 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/flowers.svg" alt="Archive" className="w-full h-auto" />
        </a>
        {/* Flower3 */}
        <a
          href="/flower"
          className="absolute top-[23.15%] right-[5.21%] w-[10.42%] hover:scale-105 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/flowers.svg" alt="Archive" className="w-full h-auto" />
        </a>
        {/* Flower3 */}
        <a
          href="/flower"
          className="absolute top-[23.15%] right-[14.06%] w-[10.42%] hover:scale-105 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/flowers.svg" alt="Archive" className="w-full h-auto" />
        </a>
      </div>

      {/* Mobile navigation (visible on mobile) */}
      <div className="sm:hidden flex flex-col items-center space-y-6 p-4">
        {/* Row 1: About & Portfolio */}
        <a href="/about" className="w-2/3 hover:scale-105 transition-transform">
          <img src="https://flurs.fly.storage.tigris.dev/web/about.svg" alt="About" className="w-full h-auto" />
        </a>
        <a href="/portfolio" className="w-2/3 hover:scale-105 transition-transform">
          <img src="https://flurs.fly.storage.tigris.dev/web/portfolio.svg" alt="Stockists" className="w-full h-auto" />
        </a>
        <a href="/contact" className="w-2/3 hover:scale-105 transition-transform">
          <img src="https://flurs.fly.storage.tigris.dev/web/contact.svg" alt="Contact" className="w-full h-auto" />
        </a>
        <a href="/archive" className="w-2/3 hover:scale-105 transition-transform">
          <img src="https://flurs.fly.storage.tigris.dev/web/archive.svg" alt="Archive" className="w-full h-auto" />
        </a>
      </div>
    </>
  )
}

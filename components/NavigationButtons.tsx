"use client";

export default function NavigationButtons() {
  return (
    <>
      {/* Desktop navigation (hidden on mobile) */}
      <div className="hidden sm:block relative w-full pt-[56.25%]">
        {/* ABOUT */}
        <a
          href="/about"
          className="absolute top-[3%] left-[4%] w-[18%] hover:scale-101 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/about.svg" alt="About" className="w-full h-auto" />
        </a>

        {/* PORTFOLIO */}
        <a
          href="#"
          className="absolute top-[19%] left-[24%] w-[30%] hover:scale-101 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/coming_soon.svg" alt="Stockists" className="w-full h-auto" />
        </a>

        {/* ARCHIVE */}
        <a
         href="#"
         className="absolute top-[30%] right-[5.21%] w-[38%] hover:scale-101 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/archive.svg" alt="Archive" className="w-full h-auto" />
        </a>

        {/* CONTACT */}
        <a
          href="/contact"
          className="absolute top-[3%] right-[4%] w-[48%] hover:scale-101 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/contact.svg" alt="Contact" className="w-full h-auto" />
        </a>
        {/* Grass */}
        <a
          href="#"
          className="absolute top-[60%] left-[5.21%] w-[47%] hover:scale-101 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/Group 5.svg" alt="Archive" className="w-full h-auto" />
        </a>
        {/* Flower */}
        <a
          href="#"
          className="absolute top-[5.56%] left-[23%] w-[10.42%] hover:scale-101 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/flower.svg" alt="Archive" className="w-full h-auto" />
        </a>
        {/* Flower2 */}
        <a
          href="#"
          className="absolute top-[5.56%] left-[31%] w-[10.42%] hover:scale-101 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/flower.svg" alt="Archive" className="w-full h-auto" />
        </a>
        {/* Flower3 */}
        <a
          href="#"
          className="absolute top-[94%] right-[30%] w-[15%] hover:scale-101 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/flowers.svg" alt="Archive" className="w-full h-auto" />
        </a>
        {/* Flower3 */}
        <a
          href="#"
          className="absolute top-[94%] right-[4%] w-[15%] hover:scale-101 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/flowers.svg" alt="Archive" className="w-full h-auto" />
        </a>
        {/* Flower3 */}
        <a
          href="#"
          className="absolute top-[94%] right-[17%] w-[15%] hover:scale-101 transition-transform"
        >
          <img src="https://flurs.fly.storage.tigris.dev/web/flowers.svg" alt="Archive" className="w-full h-auto" />
        </a>
      </div>

      {/* Mobile navigation (visible on mobile) */}
      <div className="sm:hidden flex flex-col items-center space-y-6 p-4">
        {/* Row 1: About & Portfolio */}
        <a href="/portfolio" className="w-2/3 hover:scale-105 transition-transform">
          <img src="https://flurs.fly.storage.tigris.dev/web/portfolio.svg" alt="Stockists" className="w-full h-auto" />
        </a>
        <a href="/contact" className="w-2/3 hover:scale-105 transition-transform">
          <img src="https://flurs.fly.storage.tigris.dev/web/contact.svg" alt="Contact" className="w-full h-auto" />
        </a>
        <a href="/archive" className="w-2/3 hover:scale-105 transition-transform">
          <img src="https://flurs.fly.storage.tigris.dev/web/archive.svg" alt="Archive" className="w-full h-auto" />
        </a>
        <a href="/about" className="w-2/3 hover:scale-105 transition-transform">
          <img src="https://flurs.fly.storage.tigris.dev/web/about.svg" alt="About" className="w-full h-auto" />
        </a>
      </div>
    </>
  )
}

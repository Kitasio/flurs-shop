"use client";

export default function NavigationButtons() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        <button
          type="button"
          onClick={() => window.location.href = '/contact'}
          className="handprint-button contact-hand"
        >
          <span className="handprint-text">contact</span>
        </button>

        <button
          type="button"
          onClick={() => window.location.href = '/about'}
          className="handprint-button about-hand"
        >
          <span className="handprint-text">ABOUT</span>
        </button>

        <button
          type="button"
          onClick={() => window.location.href = '/portfolio'}
          className="handprint-button portfolio-hand"
        >
          <span className="handprint-text">portfolio</span>
        </button>

        <button
          type="button"
          onClick={() => window.location.href = '/archive'}
          className="handprint-button archive-hand"
        >
          <span className="handprint-text">archive</span>
        </button>
      </div>
    </div>
  );
}

import Header from '../../components/Header'; // Import Header

// This is a Server Component
export default function ContactPage() {
  return (
    <>
      {/* Render Header with back button */}
      <Header showBackButton={true} />

      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-2xl font-serif mb-6">Contact Me</h2>
        <div className="space-y-6 bg-gray-50 p-6 border border-gray-200">
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">Email</h3>
            <a href="mailto:lidiakurshuk@gmail.com" className="text-gray-600 hover:text-gray-900 break-all">
              lidiakurshuk@gmail.com
            </a>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">Nostr</h3>
            {/* Use pre for better formatting and selection */}
            <pre className="text-gray-600 text-sm bg-gray-100 p-2 rounded overflow-x-auto">npub1f9lz4ktqnkgq77e04vnmy7ay0zm6fftcsz04y2y06379usc60clss7pxza</pre>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">Telegram</h3>
            <a href="https://t.me/lydia_kurshuk" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
              @lydia_kurshuk
            </a>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">Instagram</h3>
            {/* Replace with actual Instagram link if available */}
             <a href="https://www.instagram.com/kurshuk_lydia/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
              @kurshuk_lydia
            </a> 
          </div>
        </div>
      </div>
    </>
  );
}

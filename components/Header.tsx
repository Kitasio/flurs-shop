import Link from 'next/link';
import CartIcon from './CartIcon'; // CartIcon is a Client Component

interface HeaderProps {
  showBackButton?: boolean;
  backHref?: string;
}

// This is a Server Component by default
export default function Header({ showBackButton = false, backHref = '/' }: HeaderProps) {
  return (
    <header className="p-4 sm:p-6 flex items-center border-b border-gray-200">
      <div className="flex-1 flex justify-start">
        {showBackButton && (
          <Link
            href={backHref}
            className="flex items-center text-gray-800 hover:text-gray-600 transition-colors"
          >
            {/* Using a simple back arrow for now, lucide-react needs client */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            <span className="font-serif italic text-sm sm:text-base">Back</span>
          </Link>
        )}
      </div>
      <div className="flex-1 flex justify-center">
        <Link href="/" className="text-3xl sm:text-4xl font-serif italic text-gray-800">
          Flurs
        </Link>
      </div>
      <div className="flex-1 flex justify-end">
        {/* CartIcon is a Client Component, nested within the Server Component */}
        <CartIcon />
      </div>
    </header>
  );
}

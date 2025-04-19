import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CartIcon from '../components/CartIcon';

export default function Contact() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <header className="p-6 flex items-center">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center text-gray-800 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          <span className="font-serif italic">Back</span>
        </button>
        <h1 className="text-3xl font-serif italic text-gray-800 flex-1 text-center">Flurs</h1>
        <CartIcon />
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-serif mb-4">Contact me</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Email</h3>
            <p className="text-gray-600">lidiakurshuk@gmail.com</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Nostr</h3>
            <pre className="text-gray-600">npub1f9lz4ktqnkgq77e04vnmy7ay0zm6fftcsz04y2y06379usc60clss7pxza</pre>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Telegram</h3>
            <p className="text-gray-600">@lydia_kurshuk</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Instagram</h3>
            <p className="text-gray-600">@your_instagram</p>
          </div>
        </div>
      </div>
    </div>
  );
}

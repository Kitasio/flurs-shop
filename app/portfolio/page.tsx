import Header from '../../components/Header';

export default function PortfolioPage() {
  return (
    <>
      <Header showBackButton={true} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif mb-8">Portfolio</h1>
        <div className="mb-12">
          <p className="text-gray-600 leading-relaxed text-lg">
            Explore our collection of featured works and artistic collaborations. 
            Each piece represents our commitment to quality design and creative expression.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Portfolio items would be dynamically loaded here */}
          <div className="bg-gray-100 aspect-square flex items-center justify-center">
            <p className="text-gray-500">Portfolio Item 1</p>
          </div>
          <div className="bg-gray-100 aspect-square flex items-center justify-center">
            <p className="text-gray-500">Portfolio Item 2</p>
          </div>
          <div className="bg-gray-100 aspect-square flex items-center justify-center">
            <p className="text-gray-500">Portfolio Item 3</p>
          </div>
          <div className="bg-gray-100 aspect-square flex items-center justify-center">
            <p className="text-gray-500">Portfolio Item 4</p>
          </div>
          <div className="bg-gray-100 aspect-square flex items-center justify-center">
            <p className="text-gray-500">Portfolio Item 5</p>
          </div>
          <div className="bg-gray-100 aspect-square flex items-center justify-center">
            <p className="text-gray-500">Portfolio Item 6</p>
          </div>
        </div>
      </div>
    </>
  );
}

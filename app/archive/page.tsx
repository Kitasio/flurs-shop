import Header from '../../components/Header';

export default function ArchivePage() {
  return (
    <>
      <Header showBackButton={true} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif mb-8">Archive</h1>
        <div className="mb-12">
          <p className="text-gray-600 leading-relaxed text-lg">
            Browse through our archived collection of past works, limited editions, 
            and discontinued designs. These pieces represent our creative journey and evolution.
          </p>
        </div>
        
        <div className="space-y-8">
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-serif mb-4">2024 Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-100 aspect-[3/4] flex items-center justify-center">
                <p className="text-gray-500 text-sm">Archived Item 1</p>
              </div>
              <div className="bg-gray-100 aspect-[3/4] flex items-center justify-center">
                <p className="text-gray-500 text-sm">Archived Item 2</p>
              </div>
              <div className="bg-gray-100 aspect-[3/4] flex items-center justify-center">
                <p className="text-gray-500 text-sm">Archived Item 3</p>
              </div>
              <div className="bg-gray-100 aspect-[3/4] flex items-center justify-center">
                <p className="text-gray-500 text-sm">Archived Item 4</p>
              </div>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-serif mb-4">2023 Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-100 aspect-[3/4] flex items-center justify-center">
                <p className="text-gray-500 text-sm">Archived Item 5</p>
              </div>
              <div className="bg-gray-100 aspect-[3/4] flex items-center justify-center">
                <p className="text-gray-500 text-sm">Archived Item 6</p>
              </div>
              <div className="bg-gray-100 aspect-[3/4] flex items-center justify-center">
                <p className="text-gray-500 text-sm">Archived Item 7</p>
              </div>
              <div className="bg-gray-100 aspect-[3/4] flex items-center justify-center">
                <p className="text-gray-500 text-sm">Archived Item 8</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-serif mb-4">Limited Editions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-100 aspect-[3/4] flex items-center justify-center">
                <p className="text-gray-500 text-sm">Limited Edition 1</p>
              </div>
              <div className="bg-gray-100 aspect-[3/4] flex items-center justify-center">
                <p className="text-gray-500 text-sm">Limited Edition 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

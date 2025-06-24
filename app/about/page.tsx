import Header from '../../components/Header';

export default function AboutPage() {
  return (
    <>
      <Header showBackButton={true} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif mb-8">About</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed mb-6">
            Welcome to our creative space where art meets functionality. We specialize in creating 
            unique posters and prints that transform any space into a gallery of inspiration.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our journey began with a simple belief: that beautiful design should be accessible to everyone. 
            Each piece in our collection is carefully curated and crafted to bring joy, inspiration, 
            and artistic expression to your home or workspace.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From minimalist designs to bold artistic statements, we offer a diverse range of styles 
            to suit every taste and interior. Quality is at the heart of everything we do, ensuring 
            that each print meets the highest standards of craftsmanship.
          </p>
        </div>
      </div>
    </>
  );
}

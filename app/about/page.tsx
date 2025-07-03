import Header from '../../components/Header';

export default function AboutPage() {
  return (
    <>
      <Header showBackButton={true} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-serif mb-8">About</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed mb-6">
            Hi, I'm Lydia Kurshuk, an artist, illustrator, and designer from Belarus, now based in Poland. I have a BA in Graphic Design and a diverse background in visual storytelling.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Over the years, I’ve illustrated and designed books for both children and adults, created covers for print and audiobooks, and worked with platforms like Storytel. My experience also includes storyboarding and visual storytelling for animated videos on various topics.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            I enjoy shaping ideas through illustration, clay, and digital tools. I also design and build simple websites — often collaborating with AI in the process.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I'm open to freelance projects, commissions, and creative collaborations. Feel free to reach out!
          </p>
        </div>
      </div>
    </>
  );
}

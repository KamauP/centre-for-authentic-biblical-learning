import Image from "next/image";

export default function TeachingGalleryHero() {
  return (
    <section className="relative h-[41vh] min-h-[300px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/teaching-gallery/gallery-hero.jpg"
        alt="Biblical teaching illustrations"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div className="max-w-3xl text-white">

          <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
            Teaching Gallery
          </h1>

          <p className="mt-2 font-serif text-lg font-semibold italic text-[#E5A900] md:text-xl">
            Seeing Biblical Truth Through Inspired Illustrations.
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/95 md:text-base">
            A visual library of biblical teaching that brings God&apos;s Word
            to life. Explore, learn and be transformed as the Holy Spirit
            illuminates the Scriptures.
          </p>

          {/* Decorative line */}
          <div className="mx-auto mt-4 h-[2px] w-24 bg-[#E5A900]" />

        </div>
      </div>
    </section>
  );
}
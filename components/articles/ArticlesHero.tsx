import Image from "next/image";

export default function ArticlesHero() {
  return (
    <section className="relative h-[41vh] min-h-[300px] w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/articles/articles-hero.jpg"
        alt="Bible and study resources"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-xl text-white">

            <h1 className="text-3xl font-bold leading-tight lg:text-4xl">
              Articles &amp;
              <br />
              Resources
            </h1>

            <div className="my-3 h-1 w-20 rounded-full bg-[#E5A900]" />

            <p className="text-sm font-semibold italic leading-6 text-[#E5A900] lg:text-base">
              Deepening understanding through sound
              <br />
              biblical teaching and practical study resources.
            </p>

            <p className="mt-3 max-w-md text-sm leading-5 text-gray-100 lg:text-base">
              Explore, study and grow in the knowledge of God&apos;s Word
              for personal transformation and Kingdom impact.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
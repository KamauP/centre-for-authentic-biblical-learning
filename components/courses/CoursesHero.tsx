import Image from "next/image";

export default function CoursesHero() {
  return (
    <section className="relative h-[41vh] min-h-[300px] w-full overflow-hidden">
      <Image
        src="/images/courses/courses-hero.jpg"
        alt="Students studying together"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

      <div className="relative z-10 flex h-full items-center">
        <div className="ml-8 max-w-xl md:ml-12 lg:ml-16">

          <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[52px]">
            Courses &amp; Training
          </h1>

          <p className="mt-2 max-w-[500px] font-serif text-base font-semibold italic leading-6 text-[#E5A900] md:text-lg">
            Equipping believers through sound biblical teaching,
            practical training and life-transforming discipleship.
          </p>

          <p className="mt-3 max-w-[500px] text-sm leading-5 text-white/95 md:text-base">
            From foundational Bible studies to in-depth theological
            training, our courses are designed to strengthen your
            understanding, grow your faith and prepare you for
            every good work.
          </p>

        </div>
      </div>
    </section>
  );
}
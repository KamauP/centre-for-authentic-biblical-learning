import Image from "next/image";

export default function SupportHero() {
  return (
    <section className="relative h-[41vh] min-h-[300px] w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/support/support-hero.jpg"
        alt="Supporting the ministry"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="max-w-2xl px-6 text-center text-white">

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Support
            <br />
            <span className="text-[#E5A900]">
              the Ministry
            </span>
          </h1>

          {/* Gold decorative line */}
          <div className="mx-auto my-4 h-1 w-20 rounded-full bg-[#E5A900]" />

          <p className="mx-auto max-w-md text-sm leading-6 text-gray-100 md:text-base">
            Together we are building a generation
            <br />
            established in the authentic knowledge
            <br />
            of God&apos;s Word.
          </p>

        </div>
      </div>
    </section>
  );
}
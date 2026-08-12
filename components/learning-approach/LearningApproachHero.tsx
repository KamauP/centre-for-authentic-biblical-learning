import Image from "next/image";

export default function LearningApproachHero() {
  return (
    <section className="relative h-[41vh] min-h-[300px] w-full overflow-hidden">
      <Image
        src="/images/learning-approach/learning-approach-hero.jpg"
        alt="Bible and study materials"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#123D2B]/85 via-[#123D2B]/45 to-transparent" />

      <div className="relative z-10 flex h-full items-center">
        <div className="ml-8 max-w-2xl md:ml-12 lg:ml-16">

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#E5A900]">
            Our Approach
          </p>

          <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[52px]">
            Learning That Transforms
          </h1>

          <p className="mt-3 max-w-xl font-serif text-base font-semibold italic leading-6 text-white/90 md:text-lg">
            We believe biblical learning should do more than
            fill the mind — it should shape the heart, transform
            the life and equip us for faithful service.
          </p>

        </div>
      </div>
    </section>
  );
}
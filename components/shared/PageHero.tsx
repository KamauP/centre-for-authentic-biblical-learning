import Image from "next/image";

type PageHeroProps = {
  title: string;
  description: string;
  image: string;
};

export default function PageHero({
  title,
  description,
  image,
}: PageHeroProps) {
  return (
    <section className="relative h-[41vh] min-h-[300px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="max-w-7xl mx-auto w-full px-6 pb-10 md:pb-14">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {title}
            </h1>

            <div className="w-20 h-1 bg-yellow-500 rounded-full mt-5 mb-5" />

            <p className="text-lg md:text-xl leading-relaxed text-gray-100">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
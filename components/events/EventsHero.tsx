import Image from "next/image";

export default function EventsHero() {
  return (
    <section className="relative h-[41vh] min-h-[300px] w-full overflow-hidden">
      
      <Image
        src="/images/events/events-hero.jpg"
        alt="Bible training and ministry gathering"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="max-w-xl text-white">

            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
              Events &amp;
              <br />
              Bible Training
            </h1>

            <div className="w-20 h-1 bg-[#E5A900] rounded-full my-3" />

            <p className="text-sm lg:text-base font-semibold italic leading-6 text-[#E5A900]">
              Gathering believers to grow in
              <br />
              authentic knowledge of God&apos;s Word.
            </p>

            <p className="mt-3 text-sm leading-5 text-gray-100 max-w-md">
              Iron sharpeneth iron; so a man sharpeneth
              <br />
              the countenance of his friend.
            </p>

            <p className="mt-1 text-xs font-semibold text-[#E5A900]">
              — Proverbs 27:17 (KJV)
            </p>

          </div>
        </div>
      </div>

    </section>
  );
}
import Image from "next/image";

export default function CreationNotebookHero() {
  return (
    <section className="relative h-[41vh] min-h-[300px] w-full overflow-hidden">
      {/* Background */}
      <Image
        src="/images/creations-notebook/creations-notebook-hero.jpg"
        alt="Creation's Notebook"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Light gradient behind the text */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F5EEDC]/75 via-[#F5EEDC]/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="ml-8 max-w-xl md:ml-12 lg:ml-16">

          <h1 className="font-serif text-4xl font-bold leading-tight text-[#075C3B] drop-shadow-sm md:text-5xl lg:text-[52px]">
            Creation&apos;s Notebook
          </h1>

          <p className="mt-2 max-w-[500px] font-serif text-base font-semibold italic leading-6 text-[#8B6508] drop-shadow-sm md:text-lg">
            Discovering the invisible truths of God&apos;s
            <br />
            Kingdom through the visible works of His creation.
          </p>

        </div>
      </div>
    </section>
  );
}
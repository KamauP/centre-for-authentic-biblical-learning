import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative h-[42vh] min-h-[330px] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/home/home-hero.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="max-w-md text-white">
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-3">
              Igniting a Passion
              <br />
              for the Authentic
              <br />
              Knowledge of God's Word
            </h1>

            <div className="w-20 h-1 bg-yellow-500 rounded-full mb-3" />

            <p className="text-sm lg:text-base leading-6 text-gray-100 mb-3">
              Study to shew thyself approved unto God, a workman that needeth
              not to be ashamed, rightly dividing the word of truth.
            </p>

            <p className="text-yellow-400 font-medium text-sm mb-4">
              — 2 Timothy 2:15 (KJV)
            </p>

            <Link
              href="/about"
              className="inline-block bg-green-800 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-md transition"
            >
              LEARN MORE ABOUT US →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
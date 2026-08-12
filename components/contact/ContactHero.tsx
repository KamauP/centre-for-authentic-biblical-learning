import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative h-[41vh] min-h-[300px] w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/contact/contact-hero.jpg"
        alt="People connecting at the Centre for Authentic Biblical Learning"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark overlay — stronger on the left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.62) 32%, rgba(0,0,0,0.25) 62%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="max-w-md text-white">

            <h1 className="text-4xl lg:text-5xl font-serif font-bold leading-tight">
              Contact Us
            </h1>

            {/* Gold decorative line */}
            <div className="flex items-center gap-1 mt-3 mb-4">
              <div className="w-20 h-[2px] bg-yellow-500" />
              <div className="w-2 h-2 border border-yellow-500 rotate-45" />
            </div>

            <p className="text-sm lg:text-base leading-6 text-gray-100 max-w-sm">
              We would be delighted to hear from you.
              <br />
              Whether you have a question, a testimony,
              <br />
              or a desire to learn, you are welcome.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
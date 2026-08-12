import Image from "next/image";

export default function ContactCTA() {
  return (
    <section className="w-full bg-[#F8F3E6] pb-3">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative min-h-[145px] overflow-hidden rounded-xl">

          {/* Background image */}
          <Image
            src="/images/contact/contact-cta.jpg"
            alt="Open Bible"
            fill
            className="object-cover object-left"
          />

          {/* Green overlay fading over the image */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,85,47,0.05) 0%, rgba(0,85,47,0.15) 20%, rgba(0,85,47,0.55) 35%, rgba(0,85,47,0.88) 48%, #00552F 62%, #00552F 100%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 min-h-[145px] flex items-center">

            {/* Quote */}
            <div className="ml-[25%] w-[47%] text-white">
              <div className="flex items-start gap-2">

                <span className="text-5xl leading-8 text-[#E5A900] font-serif">
                  “
                </span>

                <div>
                  <p className="text-xl md:text-2xl font-serif italic font-semibold leading-7">
                    Let all things be done
                    <br />
                    decently and in order.
                  </p>

                  <p className="text-sm md:text-base text-[#E5A900] font-semibold mt-1">
                    — 1 Corinthians 14:40 (KJV)
                  </p>
                </div>

                <span className="text-5xl leading-8 text-[#E5A900] font-serif self-end">
                  ”
                </span>

              </div>
            </div>

            {/* Message */}
            <div className="w-[20%] px-3 text-white text-xs leading-5">
              <p>
                Thank you for reaching out.
                <br />
                We look forward to connecting
                <br />
                with you and journeying with
                <br />
                you in the knowledge of
                <br />
                God&apos;s Word.
              </p>
            </div>

            {/* Prayer icon */}
            <div className="w-[8%] flex justify-center">
              <div className="text-[#E5A900] text-5xl">
                ♧
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
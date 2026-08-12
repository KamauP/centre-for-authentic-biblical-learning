import Image from "next/image";
import Link from "next/link";

export default function SupportCTA() {
  return (
    <section className="w-full bg-[#F8F3E6] pb-3">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative min-h-[145px] overflow-hidden rounded-xl">

          {/* Background image */}
          <Image
            src="/images/support/support-cta.jpg"
            alt="Open Bible"
            fill
            className="object-cover object-left"
          />

          {/* Green fades over the image */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,85,47,0.05) 0%, rgba(0,85,47,0.15) 18%, rgba(0,85,47,0.50) 34%, rgba(0,85,47,0.85) 48%, #00552F 63%, #00552F 100%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 min-h-[145px] flex items-center">

            {/* Quote */}
            <div className="ml-[23%] w-[45%] text-white">
              <div className="flex items-start gap-2">

                <span className="text-5xl leading-7 text-[#E5A900] font-serif">
                  “
                </span>

                <div>
                  <p className="text-lg md:text-xl font-serif italic font-semibold leading-6">
                    Every good and perfect gift
                    <br />
                    is from above.
                  </p>

                  <p className="text-xs md:text-sm text-[#E5A900] font-semibold mt-2">
                    — James 1:17 (KJV)
                  </p>
                </div>

              </div>
            </div>

            {/* CTA */}
            <div className="w-[27%] text-center text-white">
              <p className="text-xs leading-4 mb-2">
                Help us continue equipping believers
                <br />
                with authentic biblical knowledge.
              </p>

              <Link
                href="/support"
                className="inline-block rounded-md bg-[#E5A900] px-5 py-2 text-[10px] font-semibold text-white hover:bg-[#D49A00] transition"
              >
                BECOME A MINISTRY PARTNER →
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
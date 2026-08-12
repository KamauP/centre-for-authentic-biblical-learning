import Image from "next/image";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="w-full bg-[#F8F5EE] pb-3">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex min-h-[140px] overflow-hidden rounded-xl">

          {/* Left Image */}
          <div className="relative w-[30%] shrink-0">
            <Image
              src="/images/about/about-cta.jpg"
              alt="Person worshipping at sunset"
              fill
              className="object-cover"
            />
          </div>

          {/* Middle + Right Green Area */}
          <div className="relative flex-1 bg-[#00552F]">

            {/* Soft green fade over the image boundary */}
            <div
              className="absolute left-0 top-0 bottom-0 w-20 -translate-x-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, #00552F)",
              }}
            />

            <div className="relative z-10 h-full flex items-center">

              {/* Text */}
              <div className="flex-1 px-7 py-5">
                <p className="text-white text-lg leading-6 font-medium">
                  Join us as we ignite a passion for
                  <br />
                  the authentic knowledge of God&apos;s Word
                  <br />
                  and equip believers for faithful Kingdom service.
                </p>

                <Link
                  href="/courses"
                  className="inline-block mt-3 bg-[#E5A900] hover:bg-[#D49A00] text-white text-xs font-semibold px-5 py-2 rounded-md transition"
                >
                  EXPLORE OUR COURSES →
                </Link>
              </div>

              {/* Logo */}
              <div className="relative w-[25%] h-32 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Centre for Authentic Biblical Learning"
                  fill
                  className="object-contain"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
import Link from "next/link";
import { FaBookOpen, FaArrowRight } from "react-icons/fa6";

export default function LearningApproachCTA() {
  return (
    <section className="bg-[#F5F0E4] px-5 pb-7 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative min-h-[210px] overflow-hidden rounded-xl bg-[#00552F]">

          {/* CTA Image */}
          <div className="absolute inset-y-0 left-0 w-[40%]">
            <Image
              src="/images/learning-approach/learning-approach-cta.jpg"
              alt="Bible study"
              fill
              className="object-cover object-center"
            />

            {/* Fade image into CTA background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00552F]/30 to-[#00552F]" />
          </div>

          {/* Decorative circle */}
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/5" />

          {/* Content */}
          <div className="relative z-10 flex min-h-[210px] items-center">
            <div className="ml-[32%] flex w-[65%] items-center justify-between gap-6 px-5 py-7 md:px-8">

              <div className="max-w-lg text-white">
                <div className="mb-2 flex items-center gap-2">
                  <FaBookOpen className="text-[#E5A900]" />

                  <h2 className="font-serif text-lg font-bold md:text-xl">
                    Begin Your Learning Journey
                  </h2>
                </div>

                <p className="text-xs leading-5 text-green-50 md:text-sm">
                  Whether you are beginning to explore Scripture or
                  seeking to deepen your understanding, there is always
                  more to discover in God&apos;s Word.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 rounded-md bg-[#E5A900] px-4 py-2 text-[10px] font-bold text-white transition hover:bg-[#D49A00]"
                  >
                    EXPLORE COURSES
                    <FaArrowRight />
                  </Link>

                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 rounded-md border border-white/50 px-4 py-2 text-[10px] font-bold text-white transition hover:bg-white/10"
                  >
                    EXPLORE TEACHINGS
                    <FaArrowRight />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
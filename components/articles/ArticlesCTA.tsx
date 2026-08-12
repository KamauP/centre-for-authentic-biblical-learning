import Image from "next/image";
import Link from "next/link";
import {
  FaBookOpen,
  FaGraduationCap,
  FaArrowRight,
} from "react-icons/fa6";

export default function ArticlesCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-6 pt-1">
      <div className="relative min-h-[190px] overflow-hidden rounded-xl bg-[#00552F]">

        {/* Background image */}
        <div className="absolute inset-y-0 left-0 w-[42%]">
          <Image
            src="/images/articles/articles-cta.jpg"
            alt="Bible study"
            fill
            className="object-cover object-center"
          />

          {/* Fade image into green */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00552F]/40 to-[#00552F]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-[190px] items-center">

          <div className="ml-[34%] flex w-[62%] items-center justify-between gap-6 px-5 py-5">

            {/* Text */}
            <div className="max-w-[280px] text-white">
              <div className="mb-2 flex items-center gap-2">
                <FaBookOpen className="text-[#E5A900]" />

                <h2 className="text-base font-bold">
                  KEEP LEARNING
                </h2>
              </div>

              <p className="text-xs leading-5 text-green-50">
                Continue growing in your understanding of Scripture
                through authentic biblical teaching and study.
              </p>
            </div>

            {/* Button */}
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#E5A900] px-4 py-2 text-[10px] font-bold text-white transition hover:bg-[#D49A00]"
            >
              EXPLORE MORE
              <FaArrowRight />
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
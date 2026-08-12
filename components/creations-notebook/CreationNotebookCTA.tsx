import Image from "next/image";
import Link from "next/link";
import { FaBookOpen, FaArrowRight } from "react-icons/fa6";

export default function CreationNotebookCTA() {
  return (
    <section className="bg-[#F5F0E4] px-5 pb-6 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative min-h-[190px] overflow-hidden rounded-xl bg-[#00552F]">

          {/* Image */}
          <div className="absolute inset-y-0 left-0 w-[42%]">
            <Image
              src="/images/creations-notebook/creation-cta.jpg"
              alt="Nature and creation"
              fill
              className="object-cover object-center"
            />

            {/* Fade into green */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00552F]/40 to-[#00552F]" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex min-h-[190px] items-center">
            <div className="ml-[34%] flex w-[62%] items-center justify-between gap-6 px-5 py-6">

              <div className="max-w-md text-white">
                <div className="mb-2 flex items-center gap-2">
                  <FaBookOpen className="text-[#E5A900]" />

                  <h2 className="font-serif text-lg font-bold">
                    Open Your Eyes. Open Your Bible.
                  </h2>
                </div>

                <p className="text-xs leading-5 text-green-50">
                  Discover the lessons God has placed throughout
                  His creation and allow His Word to transform the
                  way you see the world around you.
                </p>
              </div>

              <Link
                href="/articles"
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#E5A900] px-4 py-2 text-[10px] font-bold text-white transition hover:bg-[#D49A00]"
              >
                KEEP EXPLORING
                <FaArrowRight />
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
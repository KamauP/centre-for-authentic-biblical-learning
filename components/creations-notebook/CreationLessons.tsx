import { FaSeedling } from "react-icons/fa6";

export default function CreationLessons() {
  return (
    <section className="bg-[#F5F0E4] px-5 pb-5 md:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-3 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-[#C8B990]" />

          <h2 className="font-serif text-xl font-bold text-[#294638]">
            Explore Creation&apos;s Lessons
          </h2>

          <div className="h-px w-16 bg-[#C8B990]" />
        </div>

        {/* Coming Soon */}
        <div className="flex min-h-[190px] items-center justify-center rounded-xl border border-[#E4DDCF] bg-[#FDFCF8]">
          <div className="max-w-md px-6 text-center">

            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#00552F] text-white">
              <FaSeedling className="text-lg" />
            </div>

            <h3 className="font-serif text-lg font-bold text-[#294638]">
              Creation&apos;s Lessons Coming Soon
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-600">
              We are preparing biblical lessons that explore the
              spiritual truths revealed through God&apos;s creation.
              Check back soon as this section develops.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
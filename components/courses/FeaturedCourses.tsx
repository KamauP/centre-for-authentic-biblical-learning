import { FaGraduationCap } from "react-icons/fa6";

export default function FeaturedCourses() {
  return (
    <section className="bg-[#F5F0E4] px-5 pb-7 md:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-[#294638]">
            Featured Courses
          </h2>

          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#8B6A16]">
            View All Courses →
          </span>
        </div>

        <div className="flex min-h-[190px] items-center justify-center rounded-xl border border-[#E4DDCF] bg-[#FDFCF8]">
          <div className="max-w-md px-6 text-center">

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00552F] text-white">
              <FaGraduationCap className="text-lg" />
            </div>

            <h3 className="font-serif text-xl font-bold text-[#294638]">
              Featured Courses Coming Soon
            </h3>

            <p className="mt-2 text-sm leading-5 text-gray-600">
              Our courses are currently being developed.
              Featured training opportunities will appear here
              once they are ready.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
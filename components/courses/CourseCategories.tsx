import { FaBookOpen } from "react-icons/fa6";

export default function CourseCategories() {
  return (
    <section className="bg-[#F5F0E4] px-5 py-7 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-5 flex items-center justify-center gap-4">
          <div className="hidden h-px w-24 bg-[#C8B990] sm:block" />

          <h2 className="font-serif text-2xl font-bold text-[#294638]">
            Our Course Categories
          </h2>

          <div className="hidden h-px w-24 bg-[#C8B990] sm:block" />
        </div>

        {/* Coming soon box */}
        <div className="flex min-h-[190px] items-center justify-center rounded-xl border border-[#E4DDCF] bg-[#FDFCF8]">
          <div className="max-w-md px-6 text-center">

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00552F] text-white">
              <FaBookOpen className="text-lg" />
            </div>

            <h3 className="font-serif text-xl font-bold text-[#294638]">
              Course Categories Coming Soon
            </h3>

            <p className="mt-2 text-sm leading-5 text-gray-600">
              We are currently preparing our course catalogue.
              Our different areas of biblical study and training
              will be available here soon.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
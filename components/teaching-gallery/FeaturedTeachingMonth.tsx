import { FaBookOpen } from "react-icons/fa6";

export default function FeaturedTeachingMonth() {
  return (
    <section className="bg-[#FDFCF8] py-5">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-3">
          <h2 className="font-serif text-lg font-bold text-[#294638]">
            Featured Teaching of the Month
          </h2>
        </div>

        <div className="relative min-h-[180px] overflow-hidden rounded-xl border border-[#E4DDCF] bg-[#F5F0E4]">
          <div className="flex min-h-[180px] items-center justify-center px-6 text-center">
            <div className="max-w-lg">

              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#00552F] text-white">
                <FaBookOpen className="text-sm" />
              </div>

              <h3 className="font-serif text-base font-bold text-[#294638]">
                Featured Teaching Coming Soon
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-600">
                A featured biblical teaching will be highlighted here each
                month. Check back soon as our teaching gallery grows.
              </p>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
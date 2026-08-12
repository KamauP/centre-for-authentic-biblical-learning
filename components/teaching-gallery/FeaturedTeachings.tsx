import { FaStar } from "react-icons/fa6";

export default function FeaturedTeachings() {
  return (
    <section className="bg-[#FDFCF8] py-5">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00552F] text-white">
            <FaStar className="text-xs" />
          </div>

          <h2 className="text-lg font-bold text-[#294638]">
            Featured Teachings
          </h2>
        </div>

        <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-[#E4DDCF] bg-[#F5F0E4]">
          <div className="max-w-md px-6 text-center">

            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF1EC]">
              <FaStar className="text-lg text-[#00552F]" />
            </div>

            <h3 className="text-base font-bold text-[#294638]">
              Featured Teachings Coming Soon
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-600">
              Our collection of illustrated biblical teachings is
              currently being prepared. Check back soon to explore
              lessons designed to bring God&apos;s Word to life.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
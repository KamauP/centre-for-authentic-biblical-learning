import Image from "next/image";
import { FaLeaf } from "react-icons/fa6";

export default function WeeklyReflection() {
  return (
    <div className="rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-4">
      {/* Heading */}
      <div className="mb-3 flex items-center gap-2">
        <FaLeaf className="text-[#00552F]" />

        <h2 className="font-serif text-sm font-bold uppercase tracking-wide text-[#294638]">
          Weekly Reflection
        </h2>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
        {/* Image */}
        <div className="relative h-40 w-full overflow-hidden rounded-lg sm:w-1/2 lg:h-36 lg:w-full xl:h-40 xl:w-1/2">
          <Image
            src="/images/creations-notebook/weekly-reflection.jpg"
            alt="Seed growing from the soil"
            fill
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="font-serif text-lg font-bold text-[#294638]">
            Lesson from a Seed
          </h3>

          <p className="mt-2 text-xs leading-5 text-gray-700">
            Every mighty tree was once hidden in a tiny seed.
            Likewise, every mature disciple begins with the seed
            of God&apos;s Word planted in a willing heart.
          </p>

          <p className="mt-3 font-serif text-xs italic leading-5 text-[#294638]">
            “So is my word that goeth forth out of my mouth:
            it shall not return unto me void.”
          </p>

          <p className="mt-1 text-[10px] font-semibold text-[#9A6D08]">
            — Isaiah 55:11 (KJV)
          </p>

          <button
            type="button"
            className="mt-4 rounded-md bg-[#00552F] px-4 py-2 text-[10px] font-bold text-white transition hover:bg-[#004526]"
          >
            READ MORE REFLECTIONS →
          </button>
        </div>
      </div>
    </div>
  );
}
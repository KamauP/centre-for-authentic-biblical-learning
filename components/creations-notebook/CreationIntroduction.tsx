import { FaLeaf } from "react-icons/fa6";

export default function CreationIntroduction() {
  return (
    <section className="bg-[#F5F0E4] px-5 py-4 md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-5 md:flex-row md:px-6 md:py-5">

        {/* Introduction */}
        <div className="flex flex-1 items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00552F] text-white">
            <FaLeaf className="text-lg" />
          </div>

          <div>
            <h2 className="font-serif text-lg font-bold text-[#294638]">
              Introduction
            </h2>

            <p className="mt-1 max-w-xl text-xs leading-5 text-gray-700">
              The heavens declare the glory of God, and creation
              continually testifies of its Creator. In this notebook
              we learn to observe the world around us and uncover
              the spiritual lessons that God has written into His
              creation for our learning and transformation.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden h-20 w-px bg-[#D8CDB8] md:block" />

        {/* Scripture */}
        <div className="flex flex-1 items-start gap-3">
          <span className="font-serif text-4xl font-bold leading-none text-[#C58B12]">
            “
          </span>

          <div>
            <p className="font-serif text-sm font-semibold leading-5 text-[#294638]">
              For the invisible things of him from the creation
              of the world are clearly seen, being understood by
              the things that are made, even his eternal power
              and Godhead.
            </p>

            <p className="mt-1 text-xs font-semibold text-[#9A6D08]">
              — Romans 1:20 (KJV)
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
import { FaBookBible, FaHeart, FaPersonChalkboard } from "react-icons/fa6";

export default function LearningPhilosophy() {
  return (
    <section className="bg-[#F5F0E4] px-5 py-7 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto mb-6 max-w-2xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A6D08]">
            Our Learning Philosophy
          </p>

          <h2 className="mt-1 font-serif text-2xl font-bold text-[#294638]">
            Truth That Is Learned, Lived &amp; Shared
          </h2>

          <p className="mt-2 text-xs leading-5 text-gray-600 md:text-sm">
            Biblical learning should move beyond information.
            We seek to understand God&apos;s Word, apply its truth
            to our lives and become equipped to share it with others.
          </p>
        </div>

        {/* Three principles */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Scripture */}
          <div className="rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#00552F] text-white">
              <FaBookBible className="text-lg" />
            </div>

            <h3 className="mt-3 font-serif text-base font-bold text-[#294638]">
              Grounded in Scripture
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-600">
              God&apos;s Word is our foundation. Every lesson begins
              with careful attention to what Scripture actually says.
            </p>
          </div>

          {/* Transformation */}
          <div className="rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#00552F] text-white">
              <FaHeart className="text-lg" />
            </div>

            <h3 className="mt-3 font-serif text-base font-bold text-[#294638]">
              Focused on Transformation
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-600">
              Learning is meant to change how we think, live and
              walk with God — not simply increase what we know.
            </p>
          </div>

          {/* Equipping */}
          <div className="rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#00552F] text-white">
              <FaPersonChalkboard className="text-lg" />
            </div>

            <h3 className="mt-3 font-serif text-base font-bold text-[#294638]">
              Designed to Equip
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-600">
              We want every learner to leave better prepared to
              understand Scripture, serve others and fulfill their
              God-given purpose.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
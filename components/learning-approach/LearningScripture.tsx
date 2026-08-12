import { FaBookBible } from "react-icons/fa6";

export default function LearningScripture() {
  return (
    <section className="bg-[#FDFCF8] px-5 py-8 md:px-8">
      <div className="mx-auto max-w-4xl text-center">

        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00552F] text-white">
          <FaBookBible className="text-lg" />
        </div>

        <p className="font-serif text-xl font-semibold italic leading-8 text-[#294638] md:text-2xl">
          “Study to shew thyself approved unto God, a workman
          that needeth not to be ashamed, rightly dividing the
          word of truth.”
        </p>

        <div className="mx-auto mt-4 h-px w-16 bg-[#C58B12]" />

        <p className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-[#9A6D08]">
          2 Timothy 2:15 · KJV
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-xs leading-5 text-gray-600">
          This is at the heart of our approach: to study faithfully,
          understand carefully and handle the Word of God with
          truth, humility and purpose.
        </p>

      </div>
    </section>
  );
}

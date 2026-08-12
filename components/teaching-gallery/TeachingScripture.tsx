import { FaQuoteLeft } from "react-icons/fa6";

export default function TeachingScripture() {
  return (
    <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] px-6 py-5 text-center">
      <div className="max-w-sm">

        <FaQuoteLeft className="mx-auto mb-3 text-2xl text-[#C58B12]" />

        <p className="font-serif text-base font-semibold italic leading-6 text-[#294638]">
          By this shall all men know that you are my disciples,
          if ye have love one to another.
        </p>

        <p className="mt-3 text-xs font-semibold text-[#C58B12]">
          — John 13:35 (KJV)
        </p>

      </div>
    </div>
  );
}
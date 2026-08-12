import { FaBookOpen } from "react-icons/fa6";

export default function TeachingRequest() {
  return (
    <div className="rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-4">
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5F0E4] text-[#00552F]">
          <FaBookOpen className="text-sm" />
        </div>

        <div>
          <h2 className="font-serif text-sm font-bold leading-5 text-[#294638]">
            Have a lesson idea
            <br />
            or topic you'd like us
            <br />
            to teach?
          </h2>

          <p className="mt-2 text-[10px] leading-4 text-gray-600">
            Let us know. Your suggestions help us
            serve you better.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="w-full rounded-md bg-[#C58B12] py-2 text-[10px] font-bold text-white transition hover:bg-[#AE790A]"
      >
        SUBMIT A REQUEST
      </button>
    </div>
  );
}
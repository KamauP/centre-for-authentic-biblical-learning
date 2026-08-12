import Image from "next/image";
import {
  FaHandsPraying,
  FaPaperPlane,
  FaLock,
} from "react-icons/fa6";

export default function PrayerWall() {
  return (
    <div className="relative min-h-[190px] overflow-hidden rounded-xl bg-[#FDFCF8]">

      {/* Prayer image */}
      <div className="absolute right-0 top-0 h-full w-[42%]">
        <Image
          src="/images/support/prayer-wall.jpg"
          alt="Person praying with a Bible"
          fill
          className="object-cover object-center"
        />

        {/* Soft fade into the content */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFCF8] via-[#FDFCF8]/45 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-[68%] p-5">

        <div className="flex items-center gap-2 mb-2">
          <FaHandsPraying className="text-[#00552F] text-lg" />

          <h2 className="text-base font-semibold text-[#294638]">
            PRAYER WALL
          </h2>
        </div>

        <p className="text-[11px] leading-4 text-gray-600 mb-3">
          We believe in the power of prayer. Share your prayer request
          with us and our team will stand with you in prayer.
        </p>

        <form className="space-y-2 max-w-[430px]">

          <textarea
            rows={2}
            placeholder="Share your prayer request..."
            className="w-full rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-[10px] text-gray-700 placeholder:text-gray-500 outline-none focus:border-[#00552F] resize-none"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Your Name (Optional)"
              className="w-full rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-[10px] text-gray-700 placeholder:text-gray-500 outline-none focus:border-[#00552F]"
            />

            <input
              type="email"
              placeholder="Your Email (Optional)"
              className="w-full rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-[10px] text-gray-700 placeholder:text-gray-500 outline-none focus:border-[#00552F]"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-[#00552F] px-5 py-2 text-[10px] font-semibold text-white hover:bg-[#004525] transition"
          >
            <FaPaperPlane />
            SUBMIT PRAYER REQUEST
          </button>

          <div className="flex items-center gap-1 text-[9px] text-gray-500">
            <FaLock />
            Your prayer request will be treated with care and confidentiality.
          </div>

        </form>
      </div>
    </div>
  );
}
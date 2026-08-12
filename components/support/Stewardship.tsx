import Image from "next/image";
import { FaCheck, FaShieldHeart } from "react-icons/fa6";

export default function Stewardship() {
  return (
    <div className="relative min-h-[190px] overflow-hidden rounded-xl bg-[#F3EBD8]">

      {/* Stewardship image */}
      <div className="absolute right-0 top-0 h-full w-[43%]">
        <Image
          src="/images/support/stewardship.jpg"
          alt="Plant growing from soil"
          fill
          className="object-cover object-center"
        />

        {/* Fade image into the section */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F3EBD8] via-[#F3EBD8]/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-[68%] p-5">

        <div className="flex items-center gap-2 mb-3">
          <FaShieldHeart className="text-[#C58B12] text-xl" />

          <h2 className="text-base font-semibold text-[#294638]">
            OUR COMMITMENT TO STEWARDSHIP
          </h2>
        </div>

        <p className="text-xs leading-5 text-gray-700 mb-3">
          We are committed to integrity, transparency and faithful
          stewardship of every resource entrusted to us.
        </p>

        <div className="space-y-2 text-[10px] text-gray-700">

          <div className="flex items-center gap-2">
            <FaCheck className="text-[#00552F]" />
            <span>100% of your giving goes directly to ministry work</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCheck className="text-[#00552F]" />
            <span>Regular updates on ministry projects and impact</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCheck className="text-[#00552F]" />
            <span>Accountable to God and to our partners</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCheck className="text-[#00552F]" />
            <span>Faithful stewards of His grace and provision</span>
          </div>

        </div>

      </div>
    </div>
  );
}
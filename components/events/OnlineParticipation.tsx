import {
  FaLaptop,
  FaVideo,
  FaBookOpen,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa6";

export default function OnlineParticipation() {
  return (
    <div className="rounded-xl bg-[#00552F] p-5 text-white">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5A900]">
          <FaLaptop className="text-xs" />
        </div>

        <h2 className="text-sm font-bold">
          ONLINE PARTICIPATION
        </h2>
      </div>

      {/* Description */}
      <p className="text-[10px] leading-4 text-green-50 mb-4">
        Can&apos;t join us physically? Participate in our
        programmes and teachings from wherever you are.
      </p>

      {/* Features */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-[10px]">
          <FaVideo className="text-[#E5A900]" />
          <span>Live Interactive Sessions</span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <FaBookOpen className="text-[#E5A900]" />
          <span>Online Bible Learning</span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <FaGlobe className="text-[#E5A900]" />
          <span>Global Participation</span>
        </div>
      </div>

      {/* Button */}
      <button
        type="button"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#E5A900] py-2 text-[10px] font-bold text-white transition hover:bg-[#D49A00]"
      >
        JOIN ONLINE
        <FaArrowRight />
      </button>
    </div>
  );
}
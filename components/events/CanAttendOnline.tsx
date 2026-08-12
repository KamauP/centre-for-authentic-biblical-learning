import {
  FaLaptop,
  FaVideo,
  FaFileArrowDown,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa6";

export default function CanAttendOnline() {
  return (
    <div className="rounded-xl bg-[#00552F] p-4 text-white">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5A900]">
          <FaLaptop className="text-xs" />
        </div>

        <h2 className="text-sm font-bold">
          CAN&apos;T ATTEND PHYSICALLY?
        </h2>
      </div>

      <p className="text-[10px] leading-4 text-green-50 mb-3">
        Join us online! Many of our events are
        livestreamed and recorded.
      </p>

      {/* Online options */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[10px]">
          <FaVideo className="text-[#E5A900]" />
          <span>Live Interactive Sessions</span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <FaVideo className="text-[#E5A900]" />
          <span>Session Recordings</span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <FaFileArrowDown className="text-[#E5A900]" />
          <span>Downloadable Materials</span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <FaGlobe className="text-[#E5A900]" />
          <span>Global Participation</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#E5A900] py-2 text-[10px] font-bold text-white hover:bg-[#D49A00] transition"
      >
        JOIN ONLINE
        <FaArrowRight />
      </button>
    </div>
  );
}
import { FaEnvelope, FaArrowRight } from "react-icons/fa6";

export default function StayConnected() {
  return (
    <div className="rounded-xl bg-[#00552F] p-4 text-white">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5A900]">
          <FaEnvelope className="text-xs" />
        </div>

        <h2 className="text-sm font-bold">
          STAY CONNECTED
        </h2>
      </div>

      <p className="text-[10px] leading-4 text-green-50 mb-3">
        Receive new articles, Bible studies and resource
        updates directly in your inbox.
      </p>

      <input
        type="email"
        placeholder="Your email address"
        className="w-full rounded-md bg-white px-3 py-2 text-[10px] text-gray-700 placeholder:text-gray-500 outline-none mb-2"
      />

      <button
        type="button"
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#E5A900] py-2 text-[10px] font-bold text-white transition hover:bg-[#D49A00]"
      >
        SUBSCRIBE
        <FaArrowRight />
      </button>

      <p className="mt-2 text-[8px] text-green-100">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
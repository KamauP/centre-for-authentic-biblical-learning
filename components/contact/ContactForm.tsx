import { FaPaperPlane, FaLock } from "react-icons/fa6";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-500 outline-none focus:border-[#00552F]";

export default function ContactForm() {
  return (
    <div className="h-full rounded-xl border border-gray-200 bg-[#FDFCF8] p-5">

      <div className="flex items-center gap-2 mb-5">
        <FaEnvelopeIcon />

        <h2 className="text-lg font-semibold text-[#294638]">
          SEND US A MESSAGE
        </h2>
      </div>

      <form className="space-y-2">

        <input
          type="text"
          placeholder="Full Name"
          className={inputClass}
        />

        <input
          type="email"
          placeholder="Email Address"
          className={inputClass}
        />

        <input
          type="tel"
          placeholder="Phone Number (Optional)"
          className={inputClass}
        />

        <input
          type="text"
          placeholder="Subject"
          className={inputClass}
        />

        <textarea
          placeholder="Your Message"
          rows={4}
          className={`${inputClass} resize-none`}
        />

        <button
          type="submit"
          className="w-full rounded-md bg-[#00552F] py-2 text-sm font-semibold text-white hover:bg-[#004525] transition"
        >
          <span className="inline-flex items-center gap-2">
            <FaPaperPlane />
            SEND MESSAGE
          </span>
        </button>

        <p className="flex items-center justify-center gap-1 text-[10px] text-gray-500 pt-1">
          <FaLock />
          Your information is safe with us and will never be shared.
        </p>

      </form>
    </div>
  );
}

function FaEnvelopeIcon() {
  return (
    <span className="text-[#294638] text-xl">
      ✉
    </span>
  );
}
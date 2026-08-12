import { FaClock, FaCalendarDays } from "react-icons/fa6";

export default function OfficeHours() {
  return (
    <div className="rounded-xl border border-gray-200 bg-[#FDFCF8] p-5">
      
      {/* Heading */}
      <div className="flex items-center gap-2 mb-3">
        <FaClock className="text-[#294638]" />

        <h2 className="text-lg font-semibold text-[#294638]">
          OFFICE HOURS
        </h2>
      </div>

      <p className="text-xs text-gray-600 leading-5 mb-4">
        We are here to serve you and respond to your inquiries during
        our office hours.
      </p>

      {/* Office hours */}
      <div className="space-y-2 text-xs text-gray-700">

        <div className="flex items-center">
          <span className="w-[115px] shrink-0 font-semibold">
            Monday – Friday
          </span>

          <span>
            8:00 AM – 5:00 PM (EAT)
          </span>
        </div>

        <div className="flex items-center">
          <span className="w-[115px] shrink-0 font-semibold">
            Saturday
          </span>

          <span>
            9:00 AM – 1:00 PM (EAT)
          </span>
        </div>

        <div className="flex items-center">
          <span className="w-[115px] shrink-0 font-semibold">
            Sunday
          </span>

          <span>
            Closed
          </span>
        </div>

      </div>

      {/* Online resources */}
      <div className="mt-4 flex items-center gap-3 rounded-lg bg-[#F3E9CF] px-3 py-3">
        
        <FaCalendarDays className="text-[#00552F] text-lg shrink-0" />

        <p className="text-xs font-medium text-gray-700 leading-4">
          Online resources and recorded teachings
          <br />
          are available 24/7 on our website.
        </p>

      </div>

    </div>
  );
}
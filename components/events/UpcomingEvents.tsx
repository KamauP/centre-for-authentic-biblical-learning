import { FaCalendarDays } from "react-icons/fa6";

export default function UpcomingEvents() {
  return (
    <section className="h-full">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-3">
        <FaCalendarDays className="text-[#00552F] text-lg" />

        <h2 className="text-lg font-bold text-[#294638]">
          UPCOMING EVENTS
        </h2>
      </div>

      {/* Empty events area */}
      <div className="h-[calc(100%-32px)] min-h-[190px] rounded-xl border border-gray-200 bg-[#FDFCF8] flex items-center justify-center">
        <div className="text-center px-6">

          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF1EC]">
            <FaCalendarDays className="text-[#00552F]" />
          </div>

          <h3 className="text-sm font-semibold text-[#294638]">
            No Upcoming Events
          </h3>

          <p className="mt-1 max-w-sm text-xs leading-5 text-gray-500">
            There are currently no events scheduled.
            Please check back soon for upcoming Bible
            training, workshops and ministry gatherings.
          </p>

        </div>
      </div>
    </section>
  );
}
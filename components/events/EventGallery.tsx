import { FaImages } from "react-icons/fa6";

export default function EventGallery() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <FaImages className="text-[#00552F] text-lg" />

        <h2 className="text-lg font-bold text-[#294638]">
          EVENT GALLERY
        </h2>
      </div>

      <div className="min-h-[180px] rounded-xl border border-gray-200 bg-[#FDFCF8] flex items-center justify-center">
        <div className="text-center px-6">
          <FaImages className="mx-auto mb-2 text-2xl text-gray-300" />

          <p className="text-xs text-gray-500">
            Event photos will appear here after our events.
          </p>
        </div>
      </div>
    </section>
  );
}
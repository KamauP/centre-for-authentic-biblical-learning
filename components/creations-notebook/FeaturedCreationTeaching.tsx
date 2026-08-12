import { FaBookOpen } from "react-icons/fa6";

export default function FeaturedCreationTeaching() {
  return (
    <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-6">
      <div className="max-w-sm text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#00552F] text-white">
          <FaBookOpen />
        </div>

        <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-[#9A6D08]">
          Featured Teaching
        </p>

        <h2 className="font-serif text-xl font-bold text-[#294638]">
          Coming Soon
        </h2>

        <p className="mt-2 text-xs leading-5 text-gray-600">
          Our featured Creation&apos;s Notebook teachings are being
          prepared and will be available here soon.
        </p>
      </div>
    </div>
  );
}
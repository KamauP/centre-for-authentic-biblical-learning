import { FaMagnifyingGlass } from "react-icons/fa6";

export default function ResourceSearch() {
  return (
    <div className="rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00552F] text-white">
          <FaMagnifyingGlass className="text-xs" />
        </div>

        <h2 className="text-sm font-bold text-[#294638]">
          SEARCH RESOURCES
        </h2>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search articles & resources..."
          className="min-w-0 flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-[10px] text-gray-700 placeholder:text-gray-500 outline-none focus:border-[#00552F]"
        />

        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#00552F] text-white transition hover:bg-[#004525]"
          aria-label="Search"
        >
          <FaMagnifyingGlass className="text-[10px]" />
        </button>
      </div>
    </div>
  );
}
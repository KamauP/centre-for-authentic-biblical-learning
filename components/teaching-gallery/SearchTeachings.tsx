import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchTeachings() {
  return (
    <aside className="rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-4">
      {/* Heading */}
      <h2 className="mb-3 font-serif text-sm font-bold text-[#294638]">
        SEARCH TEACHINGS
      </h2>

      {/* Search */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by keyword..."
          className="min-w-0 flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-[10px] text-gray-700 placeholder:text-gray-500 outline-none focus:border-[#00552F]"
        />

        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#00552F] text-white"
          aria-label="Search teachings"
        >
          <FaMagnifyingGlass className="text-[10px]" />
        </button>
      </div>

      {/* Filter heading */}
      <h3 className="mb-2 text-xs font-bold text-[#294638]">
        Filter By
      </h3>

      {/* Bible Book */}
      <div className="mb-3">
        <label className="mb-1 block text-[9px] font-semibold text-gray-600">
          Bible Book
        </label>

        <select className="w-full rounded-md border border-gray-200 bg-white px-2 py-2 text-[10px] text-gray-600 outline-none focus:border-[#00552F]">
          <option>All Books</option>
        </select>
      </div>

      {/* Topic */}
      <div className="mb-3">
        <label className="mb-1 block text-[9px] font-semibold text-gray-600">
          Topic / Theme
        </label>

        <select className="w-full rounded-md border border-gray-200 bg-white px-2 py-2 text-[10px] text-gray-600 outline-none focus:border-[#00552F]">
          <option>All Topics</option>
        </select>
      </div>

      {/* Character */}
      <div className="mb-3">
        <label className="mb-1 block text-[9px] font-semibold text-gray-600">
          Character
        </label>

        <select className="w-full rounded-md border border-gray-200 bg-white px-2 py-2 text-[10px] text-gray-600 outline-none focus:border-[#00552F]">
          <option>All Characters</option>
        </select>
      </div>

      {/* Scripture Reference */}
      <div className="mb-4">
        <label className="mb-1 block text-[9px] font-semibold text-gray-600">
          Scripture Reference
        </label>

        <input
          type="text"
          placeholder="Enter reference"
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-[10px] text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#00552F]"
        />
      </div>

      {/* Search Button */}
      <button
        type="button"
        className="mb-2 flex w-full items-center justify-center gap-2 rounded-md bg-[#00552F] py-2 text-[10px] font-bold text-white transition hover:bg-[#004525]"
      >
        SEARCH TEACHINGS
        <FaMagnifyingGlass className="text-[9px]" />
      </button>

      {/* Reset */}
      <button
        type="button"
        className="w-full rounded-md border border-[#C58B12] bg-white py-2 text-[10px] font-semibold text-[#294638] transition hover:bg-[#F5F0E4]"
      >
        RESET FILTERS
      </button>
    </aside>
  );
}
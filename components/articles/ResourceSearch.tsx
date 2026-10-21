
import { createClient } from "@/utils/supabase/server";
import { FaMagnifyingGlass, FaFilter } from "react-icons/fa6";

type SearchParams = {
  q?: string;
  type?: string;
  category?: string;
};

type ResourceSearchProps = {
  searchParams?: SearchParams;
};

export default async function ResourceSearch({
  searchParams = {},
}: ResourceSearchProps) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("category")
    .eq("status", "published");

  const categories = [
    ...new Set(
      (data ?? [])
        .map((item) => item.category)
        .filter((category): category is string => Boolean(category))
    ),
  ].sort();

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <FaFilter className="text-[#174D35]" />
        <h2 className="text-lg font-bold text-[#174D35]">
          Search Resources
        </h2>
      </div>

      {error && (
        <p className="mb-3 text-sm text-red-700">
          Categories could not be loaded. You can still search by keyword.
        </p>
      )}

      <form action="/resources" method="GET" className="space-y-4">
        <div>
          <label
            htmlFor="resource-search"
            className="mb-1.5 block text-sm font-medium text-gray-800"
          >
            Search by keyword
          </label>

          <div className="flex overflow-hidden rounded-lg border border-gray-300 bg-white transition focus-within:border-[#174D35] focus-within:ring-1 focus-within:ring-[#174D35]">
            <input
              id="resource-search"
              name="q"
              type="search"
              defaultValue={searchParams.q ?? ""}
              placeholder="Search articles and resources..."
              className="min-w-0 flex-1 border-0 bg-white px-3 py-3 text-sm text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 focus:outline-none focus:ring-0"
            />

            <div className="flex items-center px-3 text-[#174D35]">
              <FaMagnifyingGlass />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="resource-type"
            className="mb-1.5 block text-sm font-medium text-gray-800"
          >
            Resource type
          </label>

          <select
            id="resource-type"
            name="type"
            defaultValue={searchParams.type ?? ""}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-800 focus:border-[#174D35] focus:outline-none focus:ring-1 focus:ring-[#174D35]"
          >
            <option value="">All resources</option>
            <option value="pdf">PDF resources</option>
            <option value="article">Written articles</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="resource-category"
            className="mb-1.5 block text-sm font-medium text-gray-800"
          >
            Category
          </label>

          <select
            id="resource-category"
            name="category"
            defaultValue={searchParams.category ?? ""}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-800 focus:border-[#174D35] focus:outline-none focus:ring-1 focus:ring-[#174D35]"
          >
            <option value="">All categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#174D35] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#103B29] focus:outline-none focus:ring-2 focus:ring-[#174D35] focus:ring-offset-2"
        >
          <FaMagnifyingGlass />
          Search Resources
        </button>

        <a
          href="/resources"
          className="block text-center text-sm font-medium text-[#174D35] underline underline-offset-2 hover:text-[#103B29]"
        >
          Clear filters
        </a>
      </form>
    </section>
  );
}

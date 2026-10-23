
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import {
  FaFolderOpen,
  FaBook,
  FaFilePdf,
  FaArrowRight,
} from "react-icons/fa6";

type SearchParams = {
  q?: string;
  type?: string;
  category?: string;
};

type ResourceLibraryProps = {
  searchParams?: SearchParams;
};

export default async function ResourceLibrary({
  searchParams = {},
}: ResourceLibraryProps) {
  const supabase = await createClient();

  const { data: resources, error } = await supabase
    .from("articles")
    .select(
      "id, title, slug, excerpt, category, content_type, published_at"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to load CABL resources:", error.message);

    return (
      <section className="bg-[#F5F0E4] py-5">
        <div className="mx-auto max-w-7xl px-6">
          <p className="rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-5 text-sm text-[#647067]">
            We couldn&apos;t load the resources. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const term = searchParams.q?.trim().toLowerCase() ?? "";
  const type = searchParams.type ?? "";
  const category = searchParams.category ?? "";

  const filteredResources = (resources ?? []).filter((resource) => {
    const matchesType = !type || resource.content_type === type;
    const matchesCategory = !category || resource.category === category;

    const searchableText = [
      resource.title,
      resource.excerpt,
      resource.category,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesTerm = !term || searchableText.includes(term);

    return matchesType && matchesCategory && matchesTerm;
  });

  const hasFilters = Boolean(term || type || category);

  return (
    <section className="bg-[#F5F0E4] py-5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-3 flex items-center gap-2">
          <FaFolderOpen className="text-lg text-[#00552F]" />
          <h2 className="text-lg font-bold text-[#294638]">
            RESOURCE LIBRARY
          </h2>
        </div>

        {filteredResources.length === 0 ? (
          <div className="rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] px-5 py-8 text-center">
            <FaBook className="mx-auto mb-3 text-2xl text-[#00552F]" />

            <h3 className="font-semibold text-[#294638]">
              {hasFilters
                ? "No Matching Resources"
                : "Resources Coming Soon"}
            </h3>

            <p className="mt-2 text-sm text-[#647067]">
              {hasFilters
                ? "Try another keyword or change your filters."
                : "We are preparing biblical learning materials for you. Please check back soon."}
            </p>

            {hasFilters && (
              <Link
                href="/resources"
                className="mt-3 inline-block text-sm font-semibold text-[#00552F] underline"
              >
                Clear filters
              </Link>
            )}
          </div>
        ) : (
          <>
            {hasFilters && (
              <p className="mb-3 text-sm text-[#647067]">
                {filteredResources.length}{" "}
                {filteredResources.length === 1 ? "resource" : "resources"}{" "}
                found
              </p>
            )}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {filteredResources.map((resource) => (
                <Link
                  key={resource.id}
                  href={`/resources/${resource.slug}`}
                  className="group rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-4 transition hover:border-[#00552F] hover:shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF1EC]">
                      {resource.content_type === "pdf" ? (
                        <FaFilePdf className="text-[#00552F]" />
                      ) : (
                        <FaBook className="text-[#00552F]" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#C58B12]">
                        {resource.category || "Biblical Resources"}
                        {" · "}
                        {resource.content_type === "pdf"
                          ? "PDF Resource"
                          : "Article"}
                      </span>

                      <h3 className="mt-1 font-semibold text-[#294638] group-hover:text-[#00552F]">
                        {resource.title}
                      </h3>

                      {resource.excerpt && (
                        <p className="mt-1 line-clamp-2 text-sm text-[#647067]">
                          {resource.excerpt}
                        </p>
                      )}

                      <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#00552F]">
                        Read resource <FaArrowRight />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

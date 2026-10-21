
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import {
  FaFolderOpen,
  FaBook,
  FaFilePdf,
  FaArrowRight,
} from "react-icons/fa6";

export default async function ResourceLibrary() {
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
  }

  return (
    <section className="bg-[#F5F0E4] py-5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-3 flex items-center gap-2">
          <FaFolderOpen className="text-lg text-[#00552F]" />
          <h2 className="text-lg font-bold text-[#294638]">
            RESOURCE LIBRARY
          </h2>
        </div>

        {!resources || resources.length === 0 ? (
          <div className="rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] px-5 py-8 text-center">
            <FaBook className="mx-auto mb-3 text-2xl text-[#00552F]" />
            <h3 className="font-semibold text-[#294638]">
              Resources Coming Soon
            </h3>
            <p className="mt-2 text-sm text-[#647067]">
              We are preparing biblical learning materials for you.
              Please check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {resources.map((resource) => (
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
        )}
      </div>
    </section>
  );
}

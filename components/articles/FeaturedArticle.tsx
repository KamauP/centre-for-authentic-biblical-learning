
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import {
  FaBookOpen,
  FaArrowRight,
  FaCalendarAlt,
  FaFilePdf,
} from "react-icons/fa";

export default async function FeaturedArticle() {
  const supabase = await createClient();

  const { data: article, error } = await supabase
    .from("articles")
    .select(
      "id, title, slug, excerpt, category, author_name, content_type, cover_image_url, published_at"
    )
    .eq("status", "published")
    .eq("is_featured", true)
    .maybeSingle();

  if (error) {
    console.error("Failed to load featured resource:", error.message);
    return null;
  }

  // Hide the section when no published resource is featured.
  if (!article) {
    return null;
  }

  const formattedDate = article.published_at
    ? new Intl.DateTimeFormat("en-KE", {
        dateStyle: "medium",
      }).format(new Date(article.published_at))
    : null;

  return (
    <section className="bg-[#F5F0E4] py-5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-3 flex items-center gap-2">
          <FaBookOpen className="text-lg text-[#00552F]" />
          <h2 className="text-lg font-bold text-[#294638]">
            FEATURED ARTICLE
          </h2>
        </div>

        <article className="overflow-hidden rounded-xl border border-[#E4DDCF] bg-[#FDFCF8]">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
            {article.cover_image_url ? (
              <img
                src={article.cover_image_url}
                alt=""
                className="h-48 w-full object-cover md:h-full"
              />
            ) : (
              <div className="flex min-h-[160px] items-center justify-center bg-[#EAF1EC]">
                {article.content_type === "pdf" ? (
                  <FaFilePdf className="text-5xl text-[#00552F]" />
                ) : (
                  <FaBookOpen className="text-5xl text-[#00552F]" />
                )}
              </div>
            )}

            <div className="flex flex-col justify-center p-5 sm:p-7">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-[#C58B12]">
                <span>{article.category || "Biblical Resources"}</span>
                <span>·</span>
                <span>
                  {article.content_type === "pdf"
                    ? "PDF Resource"
                    : "Written Article"}
                </span>
              </div>

              <h3 className="text-xl font-bold leading-snug text-[#294638] sm:text-2xl">
                {article.title}
              </h3>

              {article.excerpt && (
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {article.excerpt}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                {article.author_name && (
                  <span>By {article.author_name}</span>
                )}

                {formattedDate && (
                  <span className="inline-flex items-center gap-1">
                    <FaCalendarAlt />
                    {formattedDate}
                  </span>
                )}
              </div>

              <div className="mt-5">
                <Link
                  href={`/resources/${article.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#00552F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#294638]"
                >
                  Read {article.content_type === "pdf" ? "Resource" : "Article"}
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
  FaFilePdf,
} from "react-icons/fa";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getResource(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(
      "id, title, slug, excerpt, content, category, author_name, content_type, pdf_storage_path, cover_image_url, published_at"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("Failed to load resource:", error.message);
    return null;
  }

  return data;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResource(slug);

  if (!resource) {
    return { title: "Resource Not Found | CABL" };
  }

  return {
    title: `${resource.title} | CABL`,
    description:
      resource.excerpt ||
      `Explore ${resource.title} from the Center for Authentic Biblical Learning.`,
    alternates: {
      canonical: `/resources/${resource.slug}`,
    },
  };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const resource = await getResource(slug);

  if (!resource) {
    notFound();
  }

  let pdfUrl: string | null = null;

  if (
    resource.content_type === "pdf" &&
    resource.pdf_storage_path
  ) {
    const supabase = await createClient();

    const { data, error } = await supabase.storage
      .from("cabl-pdfs")
      .createSignedUrl(resource.pdf_storage_path, 60 * 30);

    if (error) {
      console.error("Failed to create PDF link:", error.message);
    } else {
      pdfUrl = data.signedUrl;
    }
  }

  const formattedDate = resource.published_at
    ? new Intl.DateTimeFormat("en-KE", {
        dateStyle: "long",
      }).format(new Date(resource.published_at))
    : null;

  return (
    <main className="min-h-screen bg-[#F5F0E4]">
      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-6">
        <Link
          href="/resources"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#00552F] hover:underline"
        >
          <FaArrowLeft />
          Back to Resources
        </Link>

        <article className="overflow-hidden rounded-2xl border border-[#E4DDCF] bg-[#FDFCF8]">
          {resource.cover_image_url && (
            <img
              src={resource.cover_image_url}
              alt=""
              className="max-h-[360px] w-full object-cover"
            />
          )}

          <div className="p-6 sm:p-9">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-[#C58B12]">
              <span>{resource.category || "Biblical Resources"}</span>
              <span>·</span>
              <span>
                {resource.content_type === "pdf"
                  ? "PDF Resource"
                  : "Article"}
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-[#294638] sm:text-4xl">
              {resource.title}
            </h1>

            {resource.excerpt && (
              <p className="mt-4 text-lg leading-relaxed text-[#647067]">
                {resource.excerpt}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-4 border-b border-[#E4DDCF] pb-5 text-sm text-[#647067]">
              {resource.author_name && (
                <span>By {resource.author_name}</span>
              )}

              {formattedDate && (
                <span className="inline-flex items-center gap-2">
                  <FaCalendarAlt />
                  {formattedDate}
                </span>
              )}
            </div>

            {resource.content_type === "pdf" ? (
              <div className="mt-7">
                {pdfUrl ? (
                  <>
                    <div className="mb-4 flex flex-wrap gap-3">
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#00552F] px-5 py-3 text-sm font-semibold text-white hover:bg-[#294638]"
                      >
                        <FaBookOpen />
                        Read PDF
                      </a>

                      <a
                        href={pdfUrl}
                        download
                        className="inline-flex items-center gap-2 rounded-lg border border-[#00552F] px-5 py-3 text-sm font-semibold text-[#00552F] hover:bg-[#EAF1EC]"
                      >
                        <FaFilePdf />
                        Download PDF
                      </a>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-[#E4DDCF]">
                      <iframe
                        src={pdfUrl}
                        title={resource.title}
                        className="h-[75vh] min-h-[500px] w-full"
                      />
                    </div>

                    <p className="mt-3 text-sm text-[#647067]">
                      If the PDF does not display on your device, use
                      the Read PDF or Download PDF link above.
                    </p>
                  </>
                ) : (
                  <p className="rounded-lg bg-[#EAF1EC] p-4 text-sm text-[#294638]">
                    This PDF is not available right now. Please try
                    again later.
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-7 whitespace-pre-wrap text-base leading-8 text-[#294638]">
                {resource.content || "This article has no content yet."}
              </div>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}

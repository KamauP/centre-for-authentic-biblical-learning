import { FaBookOpen } from "react-icons/fa6";
import { createClient } from "@/utils/supabase/server";

export default async function FeaturedCreationTeaching() {
  const supabase = await createClient();

  const { data: creations, error } = await supabase
    .from("creations")
    .select(
      "id, title, description, reference, image_url, category, created_at"
    )
    .eq("category", "Nature Teaches Us")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  // If there are no published teachings, show the placeholder.
  if (error || !creations || creations.length === 0) {
    return (
      <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-6">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#00552F] text-white">
            <FaBookOpen />
          </div>

          <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-[#9A6D08]">
            Featured Teachings
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

  return (
    <section className="rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-5">
      {/* Section heading */}
      <div className="mb-5">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-[#9A6D08]">
          Nature Teaches Us
        </p>

        <h2 className="font-serif text-xl font-bold text-[#294638]">
          Featured Teachings
        </h2>

        <p className="mt-1 text-xs leading-5 text-gray-600">
          Explore biblical lessons drawn from the wisdom and patterns
          found in God&apos;s creation.
        </p>
      </div>

      {/* Teachings */}
      <div className="space-y-4">
        {creations.map((creation) => {
          let imageUrl: string | null = null;

          if (creation.image_url) {
            imageUrl = supabase.storage
              .from("hero-images")
              .getPublicUrl(creation.image_url).data.publicUrl;
          }

          return (
            <article
              key={creation.id}
              className="overflow-hidden rounded-lg border border-[#E4DDCF] bg-white"
            >
              {/* Image */}
              {imageUrl ? (
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={creation.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center bg-[#EAF0E8]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00552F] text-white">
                    <FaBookOpen />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <p className="mb-1 text-[9px] font-bold uppercase tracking-wide text-[#9A6D08]">
                  Featured Teaching
                </p>

                <h3 className="font-serif text-lg font-bold text-[#294638]">
                  {creation.title}
                </h3>

                {creation.reference && (
                  <p className="mt-1 text-xs font-semibold text-[#00552F]">
                    {creation.reference}
                  </p>
                )}

                {creation.description && (
                  <p className="mt-2 text-xs leading-5 text-gray-600">
                    {creation.description}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

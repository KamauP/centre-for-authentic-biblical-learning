import { createClient } from "@/utils/supabase/server";
import HeroSlider from "./HeroSlider";

export default async function Hero() {
  const supabase = await createClient();

  const { data: slides, error } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  // If Supabase fails or there are no active slides,
  // use the existing hard-coded hero.
  if (error || !slides || slides.length === 0) {
    return (
      <section
        className="relative h-[42vh] min-h-[330px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/home/home-hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto w-full px-6">
            <div className="max-w-md text-white">
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-3">
                Igniting a Passion
                <br />
                for the Authentic
                <br />
                Knowledge of God's Word
              </h1>

              <div className="w-20 h-1 bg-yellow-500 rounded-full mb-3" />

              <p className="text-sm lg:text-base leading-6 text-gray-100 mb-3">
                Study to shew thyself approved unto God, a workman that
                needeth not to be ashamed, rightly dividing the word of truth.
              </p>

              <p className="text-yellow-400 font-medium text-sm mb-4">
                — 2 Timothy 2:15 (KJV)
              </p>

              <a
                href="/about"
                className="inline-block bg-green-800 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-md transition"
              >
                LEARN MORE ABOUT US →
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const formattedSlides = slides.map((slide) => ({
    id: slide.id,
    title: slide.title,
    description: slide.description,
    reference: slide.reference,
    imageUrl: slide.image_url
      ? supabase.storage
          .from("hero-images")
          .getPublicUrl(slide.image_url).data.publicUrl
      : "/images/home/home-hero.jpg",
  }));

  return <HeroSlider slides={formattedSlides} />;
}
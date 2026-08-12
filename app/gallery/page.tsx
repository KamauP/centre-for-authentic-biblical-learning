import TeachingGalleryHero from "@/components/teaching-gallery/TeachingGalleryHero";
import FeaturedTeachings from "@/components/teaching-gallery/FeaturedTeachings";
import SearchTeachings from "@/components/teaching-gallery/SearchTeachings";
import BrowseByTheme from "@/components/teaching-gallery/BrowseByTheme";
import FeaturedTeachingMonth from "@/components/teaching-gallery/FeaturedTeachingMonth";
import TeachingRequest from "@/components/teaching-gallery/TeachingRequest";
import TeachingScripture from "@/components/teaching-gallery/TeachingScripture";

export default function TeachingGalleryPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E4]">

      {/* Hero */}
      <TeachingGalleryHero />

      {/* Featured Teachings + Search */}
      <section className="mx-auto max-w-7xl px-6 py-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[3fr_1fr]">

          {/* Featured Teachings */}
          <FeaturedTeachings />

           <aside className="space-y-4">
      <SearchTeachings />
      <TeachingRequest />
    </aside>

        </div>
      </section>

      {/* Browse by Theme */}
      <BrowseByTheme />

      <section className="mx-auto max-w-7xl px-6 py-5">
  <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.8fr_1fr]">

    <FeaturedTeachingMonth />

    <TeachingScripture />

  </div>
</section>
    </main>
  );
}
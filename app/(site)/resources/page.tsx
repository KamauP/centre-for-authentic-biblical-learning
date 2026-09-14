import type { Metadata } from "next";
import ArticlesHero from "@/components/articles/ArticlesHero";
import FeaturedArticle from "@/components/articles/FeaturedArticle";
import ResourceLibrary from "@/components/articles/ResourceLibrary";
import StudySeries from "@/components/articles/StudySeries";
import RecentArticles from "@/components/articles/RecentArticles";
import ResourceSearch from "@/components/articles/ResourceSearch";
import StayConnected from "@/components/articles/StayConnected";
import DownloadResources from "@/components/articles/DownloadResources";
import ArticlesCTA from "@/components/articles/ArticlesCTA";

export const metadata: Metadata = {
  title: "Biblical Resources & Articles | CABL",
  description:
    "Explore biblical resources, articles, study series, and learning materials from the Center for Authentic Biblical Learning to deepen your understanding of God's Word.",
  keywords: [
    "biblical resources",
    "Bible study resources",
    "Christian articles",
    "Bible articles",
    "biblical study materials",
    "Bible study",
    "Christian learning",
    "biblical learning",
    "Center for Authentic Biblical Learning",
    "CABL",
  ],
};

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E4]">

      {/* Hero */}
      <ArticlesHero />

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2.5fr_1fr]">

          {/* LEFT COLUMN */}
          <div className="space-y-5">

            <FeaturedArticle />

            <ResourceLibrary />

            <StudySeries />

            <RecentArticles />

          </div>

          {/* RIGHT COLUMN */}
          <aside className="space-y-4">

            <ResourceSearch />

            <StayConnected />

            <DownloadResources />

          </aside>

        </div>
      </section>
      <ArticlesCTA />

    </main>
  );
}
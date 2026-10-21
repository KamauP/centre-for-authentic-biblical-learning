
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
    "Explore biblical resources, Christian articles, Bible study materials, and teachings from the Center for Authentic Biblical Learning.",
  keywords: [
    "biblical resources",
    "Christian articles",
    "Bible study",
    "Christian education",
    "Bible teachings",
    "CABL",
  ],
};

type SearchParams = {
  q?: string;
  type?: string;
  category?: string;
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filters = await searchParams;

  return (
    <main className="min-h-screen bg-[#F5F0E4]">
      <ArticlesHero />

      <section className="mx-auto max-w-7xl px-6 py-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2.5fr_1fr]">
          <div className="space-y-5">
            <FeaturedArticle />
            <ResourceLibrary searchParams={filters}/>
            <StudySeries />
            <RecentArticles />
          </div>

          <aside className="space-y-4">
            <ResourceSearch searchParams={filters} />
            <StayConnected />
            <DownloadResources />
          </aside>
        </div>
      </section>

      <ArticlesCTA />
    </main>
  );
}

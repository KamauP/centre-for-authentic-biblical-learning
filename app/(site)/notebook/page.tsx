import CreationNotebookHero from "@/components/creations-notebook/CreationNotebookHero";
import CreationIntroduction from "@/components/creations-notebook/CreationIntroduction";
import CreationLessons from "@/components/creations-notebook/CreationLessons";
import FeaturedCreationTeaching from "@/components/creations-notebook/FeaturedCreationTeaching";
import WeeklyReflection from "@/components/creations-notebook/WeeklyReflection";
import CreationNotebookCTA from "@/components/creations-notebook/CreationNotebookCTA";

export default function CreationNotebookPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E4]">
      <CreationNotebookHero />

      <CreationIntroduction />

      <CreationLessons />

      {/* Featured Teaching + Weekly Reflection */}
      <section className="bg-[#F5F0E4] px-5 pb-5 md:px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 lg:grid-cols-[1.05fr_1fr]">
          <FeaturedCreationTeaching />
          <WeeklyReflection />
        </div>
      </section>
     <CreationNotebookCTA /> 
    </main>
  );
}
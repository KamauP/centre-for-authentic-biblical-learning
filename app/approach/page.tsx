import LearningApproachHero from "@/components/learning-approach/LearningApproachHero";
import LearningPhilosophy from "@/components/learning-approach/LearningPhilosophy";
import HowWeLearn from "@/components/learning-approach/HowWeLearn";
import WhatYouCanExpect from "@/components/learning-approach/WhatYouCanExpect";
import LearningScripture from "@/components/learning-approach/LearningScripture";
import LearningApproachCTA from "@/components/learning-approach/LearningApproachCTA";

export default function LearningApproachPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E4]">

      <LearningApproachHero />

      <LearningPhilosophy />

      <HowWeLearn />

      <WhatYouCanExpect />

      <LearningApproachCTA />

    </main>
  );
}
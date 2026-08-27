import type { Metadata } from "next";
import LearningApproachHero from "@/components/learning-approach/LearningApproachHero";
import LearningPhilosophy from "@/components/learning-approach/LearningPhilosophy";
import HowWeLearn from "@/components/learning-approach/HowWeLearn";
import WhatYouCanExpect from "@/components/learning-approach/WhatYouCanExpect";
import LearningScripture from "@/components/learning-approach/LearningScripture";
import LearningApproachCTA from "@/components/learning-approach/LearningApproachCTA";

export const metadata: Metadata = {
  title: "Our Learning Approach | Center for Authentic Biblical Learning",
  description:
    "Discover the learning approach of the Center for Authentic Biblical Learning, grounded in Scripture and designed to help believers grow in biblical understanding and apply God's Word to life.",
  keywords: [
    "biblical learning approach",
    "Bible study",
    "biblical education",
    "Christian education",
    "Scripture-based learning",
    "Bible teaching",
    "Center for Authentic Biblical Learning",
    "CABL",
  ],
};

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
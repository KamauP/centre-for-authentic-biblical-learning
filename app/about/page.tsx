import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import WhyWeExist from "@/components/about/WhyWeExist";
import CallToAction from "@/components/about/CallToAction";

export const metadata: Metadata = {
  title: "About Us | Center for Authentic Biblical Learning",
  description:
    "Learn about the Center for Authentic Biblical Learning (CABL), our mission, vision, core values, and commitment to equipping believers through authentic biblical learning.",
  keywords: [
    "Center for Authentic Biblical Learning",
    "CABL",
    "biblical learning",
    "Bible teaching",
    "Christian education",
    "biblical studies",
    "Christian ministry Kenya",
  ],
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About the Center for Authentic Biblical Learning"
        description="Equipping believers. Enlightening minds. Empowering lives. Advancing God's Kingdom."
        image="/images/about/about-hero.jpg"
      />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <WhyWeExist />
      <CallToAction />
    </main>
  );
}
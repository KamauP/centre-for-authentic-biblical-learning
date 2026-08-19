import PageHero from "@/components/shared/PageHero";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import WhyWeExist from "@/components/about/WhyWeExist";
import CallToAction from "@/components/about/CallToAction";
export default function AboutPage() {
  return (
    <main>
<PageHero
        title="About the Center for Authentic Biblical Learning"
        description="Equipping believers. Enlightening minds. Empowering lives. Advancing God's Kingdom."
        image="/images/about/about-hero.jpg"
      />
      <OurStory/>
       <MissionVision />
       <CoreValues />
       <WhyWeExist />
       <CallToAction />

      </main>     
    
  );
}
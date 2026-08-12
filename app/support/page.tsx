import SupportHero from "@/components/support/SupportHero";
import PartnerCards from "@/components/support/PartnerCards";
import MinistryImpact from "@/components/support/MinistryImpact";
import WaysToSupport from "@/components/support/WaysToSupport";
import Stewardship from "@/components/support/Stewardship";
import PrayerWall from "@/components/support/PrayerWall";
import SupportCTA from "@/components/support/SupportCTA";
export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#F8F3E6]">
      <SupportHero />
      <PartnerCards />
      <section className="max-w-7xl mx-auto px-6 py-3">
  <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-3">
    <MinistryImpact />
    <WaysToSupport />
  </div>
</section>
<section className="max-w-7xl mx-auto px-6 py-3">
  <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-3">
    <Stewardship />
    <PrayerWall />
  </div>
</section>
<SupportCTA />

      
    </main>
  );
}
import EventsHero from "@/components/events/EventsHero";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import WhyAttend from "@/components/events/WhyAttend";
import CanAttendOnline from "@/components/events/CanAttendOnline";
import RecurringProgrammes from "@/components/events/RecurringProgrammes";
import StayUpdated from "@/components/events/StayUpdated";
import EventGallery from "@/components/events/EventGallery";
import OnlineParticipation from "@/components/events/OnlineParticipation";
import EventsCTA from "@/components/events/EventsCTA";



export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#FDFCF8]">
      <EventsHero />
      <section className="max-w-7xl mx-auto px-6 py-4">
  <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-4">

    {/* LEFT */}
    <UpcomingEvents />

    {/* RIGHT */}
    <div className="space-y-3">
      <WhyAttend />
      <CanAttendOnline />
    </div>

  </div>
</section>
<section className="max-w-7xl mx-auto px-6 py-3">
  <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-4">
    
    <RecurringProgrammes />

    <StayUpdated />

  </div>
</section>
<section className="max-w-7xl mx-auto px-6 py-3">
  <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-4">

    <EventGallery />

    <OnlineParticipation />

  </div>
</section>
<EventsCTA />

    </main>
  );
}
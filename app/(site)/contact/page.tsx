import ContactHero from "@/components/contact/ContactHero";
import GetInTouch from "@/components/contact/GetInTouch";
import ContactForm from "@/components/contact/ContactForm";
import ConnectWithUs from "@/components/contact/ConnectWithUs";
import OfficeHours from "@/components/contact/OfficeHours";
import FAQ from "@/components/contact/FAQ";
import ContactCTA from "@/components/contact/ContactCTA";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F8F3E6]">

      <ContactHero />

      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <GetInTouch />
          <ContactForm />
          <ConnectWithUs />
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 pb-3">
  <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_2fr] gap-3">
    <OfficeHours />
    <FAQ />
  </div>
</section>
<ContactCTA />

    </main>
  );
}
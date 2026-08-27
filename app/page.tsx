import type { Metadata } from "next";
import Hero from "../components/home/Hero";
import Scripture from "../components/home/Scripture";
import Pillars from "../components/home/Pillars";
import Welcome from "../components/home/Welcome";
import Features from "@/components/home/Features";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Community from "@/components/home/Community";

export const metadata: Metadata = {
  title: "Biblical Learning & Christian Ministry in Kenya",
  description:
    "Center for Authentic Biblical Learning is a Christian ministry organization in Kenya providing biblical learning, biblical teaching, Bible study, and Christian education.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f2] text-gray-900">
      
      {/* Hero Section */}
      <Hero />

      <main className="bg-[#f3ead7]">
        {/* Three Pillars */}
        <Pillars />
        <Welcome />
        <Features />
        <Community />
      </main>

    </main>
  );
}
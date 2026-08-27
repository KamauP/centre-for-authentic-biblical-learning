import type { Metadata } from "next";
import CoursesHero from "@/components/courses/CoursesHero";
import CourseValues from "@/components/courses/CourseValues";
import CourseCategories from "@/components/courses/CourseCategories";
import FeaturedCourses from "@/components/courses/FeaturedCourses";
import WhyStudyWithUs from "@/components/courses/WhyStudyWithUs";
import CoursesCTA from "@/components/courses/CoursesCTA";

export const metadata: Metadata = {
  title: "Biblical Courses & Christian Learning | CABL",
  description:
    "Explore biblical courses and Christian learning opportunities at the Center for Authentic Biblical Learning, designed to help believers grow in their understanding and application of God's Word.",
  keywords: [
    "biblical courses",
    "Bible courses",
    "Christian courses",
    "Bible study courses",
    "biblical learning",
    "Christian education",
    "Bible teaching",
    "Center for Authentic Biblical Learning",
    "CABL",
  ],
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E4]">
      <CoursesHero />

      <CourseValues />

      <CourseCategories />

      <FeaturedCourses />

      <WhyStudyWithUs />
      <CoursesCTA />
    </main>
  );
}
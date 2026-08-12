import CoursesHero from "@/components/courses/CoursesHero";
import CourseValues from "@/components/courses/CourseValues";
import CourseCategories from "@/components/courses/CourseCategories";
import FeaturedCourses from "@/components/courses/FeaturedCourses";
import WhyStudyWithUs from "@/components/courses/WhyStudyWithUs";
import CoursesCTA from "@/components/courses/CoursesCTA";

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
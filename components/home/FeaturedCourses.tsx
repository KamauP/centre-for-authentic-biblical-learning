import SectionTitle from "@/components/shared/SectionTitle";
import CourseCard from "@/components/shared/CourseCard";

export default function FeaturedCourses() {
  const courses = [
    {
      title: "Biblical Foundations",
      description:
        "Build a strong understanding of the core teachings of Scripture.",
    },
    {
      title: "Bible Interpretation",
      description:
        "Learn sound principles for interpreting God's Word accurately.",
    },
    {
      title: "Christian Discipleship",
      description:
        "Grow in spiritual maturity and practical Christian living.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          subtitle="Courses"
          title="Featured Learning Programs"
          description="Explore some of our biblical learning opportunities designed to deepen your understanding of God's Word."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.title}
              title={course.title}
              description={course.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
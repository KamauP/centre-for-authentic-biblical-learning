import FeatureCard from "@/components/shared/FeatureCard";

export default function Features() {
  const features = [
    {
      image: "/images/notebook.jpg",
      title: "Creation's Notebook",
      description:
        "Discover spiritual lessons God reveals through His creation.",
      button: "EXPLORE → ",
      href: "/notebook",
    },
    {
      image: "/images/gallery.jpg",
      title: "Teaching Gallery",
      description:
        "Biblical illustrations that teach, challenge and transform.",
      button: "VIEW GALLERY →",
      href: "/gallery",
    },
    {
      image: "/images/courses.jpg",
      title: "Courses & Training",
      description:
        "Equipping believers through Bible studies, seminars and courses.",
      button: "VIEW COURSES →",
      href: "/courses",
    },
    {
      image: "/images/resources.jpg",
      title: "Articles & Resources",
      description:
        "In-depth articles, study notes and resources for your growth.",
      button: "READ ARTICLES →",
      href: "/resources",
    },
  ];

  return (
   <section className="py-5 ">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              image={feature.image}
              title={feature.title}
              description={feature.description}
              buttonText={feature.button}
              href={feature.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
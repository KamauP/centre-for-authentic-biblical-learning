import Link from "next/link";

type CourseCardProps = {
  title: string;
  description: string;
};

export default function CourseCard({
  title,
  description,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl transition">
      <div className="h-48 bg-green-200" />

      <div className="p-6">
        <h3 className="text-2xl font-bold text-green-900 mb-4">
          {title}
        </h3>

        <p className="text-gray-600 leading-7 mb-6">
          {description}
        </p>

        <Link
          href="/courses"
          className="font-semibold text-green-900 hover:text-yellow-600"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}
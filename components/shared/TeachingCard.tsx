import Image from "next/image";
import Link from "next/link";

type TeachingCardProps = {
  image: string;
  title: string;
  date: string;
  href: string;
};

export default function TeachingCard({
  image,
  title,
  date,
  href,
}: TeachingCardProps) {
  return (
    <div className="flex gap-3">
      <Image
        src={image}
        alt={title}
        width={70}
        height={70}
        className="rounded-lg object-cover w-[70px] h-[70px]"
      />

      <div>
        <h4 className="font-semibold text-green-900">
          {title}
        </h4>

        <p className="text-sm text-gray-500 mb-2">
          {date}
        </p>

        <Link
          href={href}
          className="text-sm text-green-700 hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
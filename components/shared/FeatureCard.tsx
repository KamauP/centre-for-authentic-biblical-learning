import Image from "next/image";
import Link from "next/link";

type FeatureCardProps = {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
};

export default function FeatureCard({
  image,
  title,
  description,
  buttonText,
  href,
}: FeatureCardProps) {
  return (
    <div className="flex bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
      
      {/* Portrait Image */}
      <div className="relative w-28 h-40 flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <h3 className="text-lg font-bold text-green-900 leading-tight mb-2">
            {title}
          </h3>

          <p className="text-sm text-gray-600 leading-5">
            {description}
          </p>
        </div>

        <Link
          href={href}
          className="mt-3 inline-block w-fit bg-green-900 text-white text-xs font-semibold px-3 py-2 rounded hover:bg-green-800 transition"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
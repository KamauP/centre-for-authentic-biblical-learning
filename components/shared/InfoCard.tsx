import { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

export default function InfoCard({
  title,
  description,
  icon,
}: InfoCardProps) {
  return (
    <div className="bg-[#fcfbf7] border border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

      {/* Icon */}
      <div className="flex justify-center mb-4">
        <span className="text-4xl text-yellow-500">
          {icon}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-green-900 mb-2">
        {title}
      </h3>

      {/* Divider */}
      <div className="w-12 h-[2px] bg-yellow-500 mx-auto rounded-full mb-4" />

      {/* Description */}
      <p className="text-gray-600 text-sm leading-6">
        {description}
      </p>

    </div>
  );
}
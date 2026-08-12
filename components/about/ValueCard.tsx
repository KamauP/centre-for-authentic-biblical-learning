import { IconType } from "react-icons";

type ValueCardProps = {
  icon: IconType;
  title: string;
  description: string;
  color?: "green" | "gold";
};

export default function ValueCard({
  icon: Icon,
  title,
  description,
  color = "green",
}: ValueCardProps) {
  const iconBg =
    color === "gold" ? "bg-yellow-600" : "bg-green-900";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center h-full">
      <div
        className={`w-12 h-12 ${iconBg} rounded-full mx-auto mb-3 flex items-center justify-center`}
      >
        <Icon className="text-white text-xl" />
      </div>

      <h3 className="text-base font-bold text-green-900 leading-tight mb-2">
        {title}
      </h3>

      <p className="text-xs text-gray-600 leading-5">
        {description}
      </p>
    </div>
  );
}
import {
  FaBookOpen,
  FaCross,
  FaLeaf,
  FaSeedling,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

import ValueCard from "./ValueCard";

const values = [
  {
    icon: FaBookOpen,
    title: "Biblical Accuracy",
    description:
      "We are committed to teaching the Word accurately and faithfully.",
    color: "green" as const,
  },
  {
    icon: FaCross,
    title: "Christ-Centred Teaching",
    description:
      "We exalt Jesus Christ in all we teach and do.",
    color: "gold" as const,
  },
  {
    icon: FaLeaf,
    title: "Practical Application",
    description:
      "We teach for transformation and daily life impact.",
    color: "green" as const,
  },
  {
    icon: FaSeedling,
    title: "Spiritual Growth",
    description:
      "We nurture believers to grow in grace and sound knowledge.",
    color: "gold" as const,
  },
  {
    icon: FaUsers,
    title: "Kingdom Service",
    description:
      "We exist to build God's Kingdom and serve His people.",
    color: "green" as const,
  },
  {
    icon: FaShieldAlt,
    title: "Integrity",
    description:
      "We operate with honesty, accountability and excellence.",
    color: "gold" as const,
  },
];

export default function CoreValues() {
  return (
    <section className="bg-[#F8F5EE] pt-1 py-6">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 text-center mb-4">
          Our Core Values
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {values.map((value) => (
            <ValueCard
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.description}
              color={value.color}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
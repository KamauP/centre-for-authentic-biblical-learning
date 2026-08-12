import {
  FaCrosshairs,
  FaGlobeAfrica,
  FaHandsHelping,
  FaBible,
} from "react-icons/fa";
import InfoCard from "../shared/InfoCard";

export default function Pillars() {
  const pillars = [
    {
      title: "Our Mission",
      description:
        "To ignite a passion for the authentic knowledge of God's Word through sound biblical teaching.",
      icon: <FaCrosshairs/>,
    },
    {
      title: "Our Vision",
      description:
        "To raise believers who rightly divide the Word of Truth and live transformed lives.",
      icon: <FaGlobeAfrica/>,
    },
    {
      title: "Our Commitment",
      description:
        "We are committed to faithful biblical interpretation, discipleship, and Christ-centered teaching.",
      icon: <FaHandsHelping />,
    },
    {
      title: " Our Motto",
      description:
        '"Rightly Dividing the Word of Truth" — 2 Timothy 2:15',
      icon: <FaBible />,
    },
  ];

  return (
    <section className=" py-5">
      <div className="max-w-[1400px] mx-auto px-16">
        <div className=" rounded-xl shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar) => (
            <InfoCard
              key={pillar.title}
              title={pillar.title}
              description={pillar.description}
              icon={pillar.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
import {
  FaHandsPraying,
  FaHandshake,
  FaBullhorn,
  FaHeart,
} from "react-icons/fa6";

const partners = [
  {
    title: "Pray with Us",
    description:
      "Your prayers uphold this ministry and open doors for God's Word to reach many hearts.",
    icon: FaHandsPraying,
    color: "bg-[#00552F]",
  },
  {
    title: "Volunteer",
    description:
      "Use your skills, time and passion to serve and help advance the mission of the Kingdom.",
    icon: FaHandshake,
    color: "bg-[#C58B12]",
  },
  {
    title: "Share the Ministry",
    description:
      "Share our teachings, articles and resources with others and help spread the gospel far and wide.",
    icon: FaBullhorn,
    color: "bg-[#00552F]",
  },
  {
    title: "Give Generously",
    description:
      "Your financial support helps us produce quality resources, train believers and reach more people.",
    icon: FaHeart,
    color: "bg-[#C58B12]",
  },
];

export default function PartnerCards() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-3">
      
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="h-px w-24 bg-[#C58B12]" />

        <h2 className="text-xl font-semibold text-[#294638] text-center">
          PARTNER WITH US IN GOD&apos;S WORK
        </h2>

        <div className="h-px w-24 bg-[#C58B12]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {partners.map((partner) => {
          const Icon = partner.icon;

          return (
            <div
              key={partner.title}
              className="rounded-lg border border-gray-200 bg-[#FDFCF8] px-4 py-3 text-center"
            >
              <div
                className={`mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full ${partner.color} text-white`}
              >
                <Icon className="text-2xl" />
              </div>

              <h3 className="text-base font-semibold text-[#294638] mb-1">
                {partner.title}
              </h3>

              <p className="text-xs leading-5 text-gray-600">
                {partner.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
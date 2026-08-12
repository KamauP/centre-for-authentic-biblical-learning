import {
  FaBookOpen,
  FaLayerGroup,
  FaLeaf,
  FaGlobe,
  FaPeopleGroup,
  FaHandHoldingHeart,
} from "react-icons/fa6";

const impacts = [
  {
    title: "Biblical Training",
    description:
      "Equipping believers through sound biblical teaching and practical training.",
    icon: FaBookOpen,
    color: "bg-[#C58B12]",
  },
  {
    title: "Teaching Resources",
    description:
      "Producing and distributing Bible studies, courses and learning materials.",
    icon: FaLayerGroup,
    color: "bg-[#C58B12]",
  },
  {
    title: "Creation's Notebook",
    description:
      "Using creation to reveal the Creator and inspire deeper understanding.",
    icon: FaLeaf,
    color: "bg-[#00552F]",
  },
  {
    title: "Digital Evangelism",
    description:
      "Reaching the nations through online teachings, articles and media resources.",
    icon: FaGlobe,
    color: "bg-[#C58B12]",
  },
  {
    title: "Leadership Development",
    description:
      "Raising godly leaders to serve their communities and the Church.",
    icon: FaPeopleGroup,
    color: "bg-[#00552F]",
  },
  {
    title: "Community Outreach",
    description:
      "Sharing God's love through outreach programmes and practical support.",
    icon: FaHandHoldingHeart,
    color: "bg-[#C58B12]",
  },
];

export default function MinistryImpact() {
  return (
    <div className="rounded-xl bg-[#FDFCF8] p-5">
      <div className="flex items-center justify-center gap-3 mb-1">
        <div className="h-px w-16 bg-[#C58B12]" />

        <h2 className="text-lg font-semibold text-[#294638]">
          OUR MINISTRY IMPACT
        </h2>

        <div className="h-px w-16 bg-[#C58B12]" />
      </div>

      <p className="text-center text-xs text-gray-600 mb-4">
        Your partnership enables us to fulfill our mission and extend the
        reach of God&apos;s Word.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
        {impacts.map((impact) => {
          const Icon = impact.icon;

          return (
            <div key={impact.title} className="text-center">
              <div
                className={`mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full ${impact.color} text-white`}
              >
                <Icon className="text-lg" />
              </div>

              <h3 className="text-xs font-semibold text-[#294638] mb-1">
                {impact.title}
              </h3>

              <p className="text-[10px] leading-4 text-gray-600">
                {impact.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
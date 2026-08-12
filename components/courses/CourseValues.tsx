import {
  FaBookOpen,
  FaUsers,
  FaHeart,
  FaSeedling,
  FaGlobe,
} from "react-icons/fa6";

const values = [
  {
    icon: FaBookOpen,
    title: "Biblical\nFoundation",
    description: "Grounded in Scripture.\nBuilt on Truth.",
  },
  {
    icon: FaUsers,
    title: "Expert\nTeachers",
    description: "Spirit-filled teachers\nwith a passion to equip.",
  },
  {
    icon: FaHeart,
    title: "Practical\nApplication",
    description: "From knowledge\nto Kingdom impact.",
  },
  {
    icon: FaSeedling,
    title: "Spiritual\nGrowth",
    description: "Grow deeper in faith\nand holiness.",
  },
  {
    icon: FaGlobe,
    title: "Kingdom\nPurpose",
    description: "Equipped for every\ngood work.",
  },
];

export default function CourseValues() {
  return (
    <section className="relative z-10 -mt-7 px-5 md:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] shadow-sm md:grid-cols-5">
        {values.map((value, index) => {
          const Icon = value.icon;

          return (
            <div
              key={value.title}
              className={`flex min-h-[125px] items-center justify-center gap-3 px-4 py-5 text-center ${
                index !== values.length - 1
                  ? "border-b border-[#E4DDCF] md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00552F] text-white">
                <Icon className="text-lg" />
              </div>

              <div className="text-left">
                <h3 className="whitespace-pre-line font-serif text-sm font-bold leading-4 text-[#294638]">
                  {value.title}
                </h3>

                <p className="mt-2 whitespace-pre-line text-[10px] leading-4 text-gray-600">
                  {value.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
import {
  FaBook,
  FaBookOpen,
  FaMagnifyingGlass,
  FaGraduationCap,
} from "react-icons/fa6";

const series = [
  {
    icon: FaBook,
    title: "Foundations of Faith",
  },
  {
    icon: FaBookOpen,
    title: "Understanding Scripture",
  },
  {
    icon: FaMagnifyingGlass,
    title: "Exploring God's Word",
  },
  {
    icon: FaGraduationCap,
    title: "Growing in Biblical Knowledge",
  },
];

export default function StudySeries() {
  return (
    <section className="bg-[#FDFCF8] py-5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex items-center gap-2 mb-3">
          <FaBook className="text-[#00552F] text-lg" />

          <h2 className="text-lg font-bold text-[#294638]">
            SCRIPTURE STUDY SERIES
          </h2>
        </div>

        {/* Series */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {series.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="min-h-[110px] rounded-xl border border-gray-200 bg-[#F5F0E4] flex flex-col items-center justify-center text-center px-4"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF1EC]">
                  <Icon className="text-sm text-[#00552F]" />
                </div>

                <h3 className="text-xs font-semibold text-[#294638]">
                  {item.title}
                </h3>

                <span className="mt-1 text-[9px] font-medium text-[#C58B12]">
                  Coming Soon
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
import {
  FaBookOpen,
  FaPeopleGroup,
  FaCalendarDays,
  FaGraduationCap,
} from "react-icons/fa6";

const programmes = [
  {
    icon: FaBookOpen,
    title: "Weekly Bible Study",
    description:
      "Growing together through the study of God's Word.",
    schedule: "Every Wednesday",
  },
  {
    icon: FaPeopleGroup,
    title: "Monthly Leadership Forum",
    description:
      "Equipping leaders with biblical wisdom and practical tools.",
    schedule: "First Saturday of every month",
  },
  {
    icon: FaCalendarDays,
    title: "Quarterly Bible Conference",
    description:
      "A focused time of teaching, worship and fellowship.",
    schedule: "Every Quarter",
  },
  {
    icon: FaGraduationCap,
    title: "Annual Learning Summit",
    description:
      "Our flagship gathering for authentic biblical learning.",
    schedule: "Once a year",
  },
];

export default function RecurringProgrammes() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <FaCalendarDays className="text-[#00552F] text-lg" />

        <h2 className="text-lg font-bold text-[#294638]">
          RECURRING PROGRAMMES
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {programmes.map((programme) => {
          const Icon = programme.icon;

          return (
            <div
              key={programme.title}
              className="rounded-xl border border-gray-200 bg-[#FDFCF8] p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00552F] text-white">
                  <Icon className="text-sm" />
                </div>

                <h3 className="text-xs font-bold leading-4 text-[#294638]">
                  {programme.title}
                </h3>
              </div>

              <p className="text-[10px] leading-4 text-gray-600">
                {programme.description}
              </p>

              <p className="mt-2 text-[10px] font-semibold text-[#C58B12]">
                {programme.schedule}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
import {
  FaFolderOpen,
  FaBook,
  FaFileLines,
  FaVideo,
  FaDownload,
} from "react-icons/fa6";

const resources = [
  {
    icon: FaBook,
    title: "Bible Study Guides",
  },
  {
    icon: FaFileLines,
    title: "Teaching Notes",
  },
  {
    icon: FaVideo,
    title: "Video Teachings",
  },
  {
    icon: FaDownload,
    title: "Downloadable Resources",
  },
];

export default function ResourceLibrary() {
  return (
    <section className="bg-[#F5F0E4] py-5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex items-center gap-2 mb-3">
          <FaFolderOpen className="text-[#00552F] text-lg" />

          <h2 className="text-lg font-bold text-[#294638]">
            RESOURCE LIBRARY
          </h2>
        </div>

        {/* Resource cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {resources.map((resource) => {
            const Icon = resource.icon;

            return (
              <div
                key={resource.title}
                className="min-h-[110px] rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] flex flex-col items-center justify-center text-center px-4"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF1EC]">
                  <Icon className="text-sm text-[#00552F]" />
                </div>

                <h3 className="text-xs font-semibold text-[#294638]">
                  {resource.title}
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
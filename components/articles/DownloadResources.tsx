import {
  FaDownload,
  FaFilePdf,
  FaBookOpen,
} from "react-icons/fa6";

export default function DownloadResources() {
  return (
    <div className="rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00552F] text-white">
          <FaDownload className="text-xs" />
        </div>

        <h2 className="text-sm font-bold text-[#294638]">
          DOWNLOAD RESOURCES
        </h2>
      </div>

      <div className="rounded-lg bg-[#F5F0E4] p-3 text-center">
        <FaBookOpen className="mx-auto mb-2 text-lg text-[#00552F]" />

        <h3 className="text-xs font-semibold text-[#294638]">
          Resources Coming Soon
        </h3>

        <p className="mt-1 text-[9px] leading-4 text-gray-500">
          Downloadable Bible study guides, teaching notes
          and other resources will be available here soon.
        </p>

        <div className="mt-3 flex items-center justify-center gap-1 text-[9px] font-semibold text-[#C58B12]">
          <FaFilePdf />
          <span>PDF resources coming soon</span>
        </div>
      </div>
    </div>
  );
}
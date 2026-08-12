import { FaBookOpen } from "react-icons/fa6";

export default function FeaturedArticle() {
  return (
    <section className="bg-[#F5F0E4] py-5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex items-center gap-2 mb-3">
          <FaBookOpen className="text-[#00552F] text-lg" />

          <h2 className="text-lg font-bold text-[#294638]">
            FEATURED ARTICLE
          </h2>
        </div>

        {/* Coming Soon */}
        <div className="min-h-[160px] rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] flex items-center justify-center">
          <div className="text-center px-6">

            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF1EC]">
              <FaBookOpen className="text-[#00552F]" />
            </div>

            <h3 className="text-sm font-bold text-[#294638]">
              Coming Soon
            </h3>

            <p className="mt-1 max-w-md text-xs leading-5 text-gray-500">
              Biblical teaching articles and practical study resources
              will be available here soon.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
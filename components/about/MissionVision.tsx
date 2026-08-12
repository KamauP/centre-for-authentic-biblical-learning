import Image from "next/image";
import { FaBullseye, FaEye } from "react-icons/fa";

export default function MissionVision() {
  return (
    <section className="bg-[#F8F5EE] pb-1 py-4">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-3 gap-3">

          {/* Mission */}
          <div className="bg-[#F1F0E8] rounded-xl p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-900 flex items-center justify-center shrink-0">
              <FaBullseye className="text-white text-2xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-green-900 mb-2">
                Our Mission
              </h2>

              <div className="w-full h-px bg-yellow-600 mb-3" />

              <p className="text-sm text-gray-700 leading-5">
                To contribute to the building of the Kingdom of God through
                training in God&apos;s Word.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-[#F5F0E0] rounded-xl p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-yellow-600 flex items-center justify-center shrink-0">
              <FaEye className="text-white text-2xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-yellow-700 mb-2">
                Our Vision
              </h2>

              <div className="w-full h-px bg-yellow-600 mb-3" />

              <p className="text-sm text-gray-700 leading-5">
                A world free from ignorance of the Word of God and its
                practical impact.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative min-h-[190px] rounded-xl overflow-hidden">
            <Image
              src="/images/about/mission-vision.jpg"
              alt="People studying the Bible together"
              fill
              className="object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
import Image from "next/image";
import { FaBookOpen } from "react-icons/fa";

export default function OurStory() {
  return (
    <section className="bg-[#F8F5EE] py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-6 items-center">

          {/* Our Story Text */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-green-900 flex items-center justify-center shrink-0">
                <FaBookOpen className="text-white text-base" />
              </div>

              <h2 className="text-2xl font-bold text-green-900">
                Our Story
              </h2>
            </div>

            <div className="space-y-2 text-gray-700 text-sm leading-5">
              <p>
                The Centre for Authentic Biblical Learning was birthed out of
                a deep burden to see God&apos;s people grow in the knowledge of
                His Word.
              </p>

              <p>
                Many have Bibles, yet lack understanding. Many read, yet remain
                untransformed. We exist to bridge that gap—teaching believers
                how to rightly divide the Word of Truth and apply it in
                everyday life.
              </p>

              <p>
                We are a Christ-centred teaching ministry committed to sound
                biblical teaching, practical application, and Kingdom impact.
              </p>
            </div>
          </div>

          {/* Our Story Image */}
          <div className="relative h-[230px] rounded-xl overflow-hidden">
            <Image
              src="/images/about/our-story.jpg"
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
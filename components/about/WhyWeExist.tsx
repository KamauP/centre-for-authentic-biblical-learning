import Image from "next/image";

export default function WhyWeExist() {
  return (
    <section className="bg-[#F8F5EE] pt-2 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-3">

          {/* Why We Exist */}
          <div className="relative bg-[#F1F0E8] rounded-xl p-5 overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <h2 className="text-xl font-bold text-green-900 mb-2">
                Why We Exist
              </h2>

              <div className="w-20 h-1 bg-yellow-500 rounded-full mb-3" />

              <p className="text-sm text-gray-700 leading-5">
                Jesus said, &quot;My people are destroyed for lack of
                knowledge...&quot; (Hosea 4:6). Ignorance of God&apos;s Word
                leads to spiritual weakness, confusion and defeat. The Center
                for Authentic Biblical Learning exists to change that story by
                equipping believers of all ages with the tools, understanding
                and confidence to study the Scriptures diligently, discover
                God&apos;s purposes, and live transformed lives that glorify
                Christ and impact the world for His Kingdom.
              </p>
            </div>
          </div>

          {/* Scripture Foundation */}
         {/* Scripture Foundation */}
<div className="relative overflow-hidden rounded-xl min-h-[150px]">

  {/* Full background image */}
  <Image
    src="/images/about/bible.jpg"
    alt="Holy Bible"
    fill
    className="object-cover"
  />

  {/* Cream overlay fading out toward the Bible */}
  <div
    className="absolute inset-0"
    style={{
      background:
  "linear-gradient(to right, #F3E9CF 0%, #F3E9CF 35%, rgba(243,233,207,0.92) 50%, rgba(243,233,207,0.45) 72%, rgba(243,233,207,0) 100%)",
    }}
  />

  {/* Content */}
  <div className="relative z-10 p-5 md:p-6 max-w-[70%]">

    <h2 className="text-xl font-semibold text-[#9A6815]">
      Our Scripture Foundation
    </h2>

    <div className="w-20 h-1 bg-yellow-500 rounded-full mt-2 mb-3" />

    <div className="flex gap-2">
      <span className="text-3xl text-yellow-600 leading-none">
        “
      </span>

      <p className="text-sm md:text-base text-gray-700 leading-6">
        Study to shew thyself approved unto God, a workman that
        needeth not to be ashamed, rightly dividing the word of truth.
      </p>
    </div>

    <p className="text-[#9A6815] font-semibold text-sm mt-2">
      — 2 Timothy 2:15 (KJV)
    </p>

  </div>

</div>
          

        </div>
      </div>
    </section>
  );
}
import {
  FaMagnifyingGlass,
  FaPeopleGroup,
  FaPenToSquare,
  FaSeedling,
  FaComments,
  FaCompass,
} from "react-icons/fa6";

const expectations = [
  {
    icon: FaMagnifyingGlass,
    title: "Careful Bible Study",
    text: "Take time to examine Scripture rather than simply accepting conclusions.",
  },
  {
    icon: FaPeopleGroup,
    title: "Learning Together",
    text: "Grow alongside others through discussion, questions and shared discovery.",
  },
  {
    icon: FaPenToSquare,
    title: "Practical Reflection",
    text: "Pause, reflect and consider how biblical truth connects with everyday life.",
  },
  {
    icon: FaSeedling,
    title: "Steady Growth",
    text: "Build understanding progressively, allowing each lesson to strengthen the next.",
  },
  {
    icon: FaComments,
    title: "Ask & Explore",
    text: "Questions are part of learning. We encourage thoughtful examination and honest inquiry.",
  },
  {
    icon: FaCompass,
    title: "Purposeful Direction",
    text: "Discover how what you learn can equip you for faithful service and Kingdom purpose.",
  },
];

export default function WhatYouCanExpect() {
  return (
    <section className="bg-[#F5F0E4] px-5 py-7 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A6D08]">
            Your Learning Experience
          </p>

          <h2 className="mt-1 font-serif text-2xl font-bold text-[#294638]">
            What You Can Expect
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-gray-600">
            Whether you are beginning your journey or going deeper,
            our learning environment is designed to help you engage
            with truth and grow with purpose.
          </p>
        </div>

        {/* Expectations */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expectations.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex gap-3 rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF1EC] text-[#00552F]">
                  <Icon className="text-sm" />
                </div>

                <div>
                  <h3 className="font-serif text-sm font-bold text-[#294638]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-gray-600">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
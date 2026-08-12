import {
  FaBookOpen,
  FaShieldHalved,
  FaUsers,
  FaCertificate,
} from "react-icons/fa6";

const reasons = [
  {
    icon: FaBookOpen,
    title: "Scripture-Centred",
    text: "Every course is anchored in the Word of God.",
  },
  {
    icon: FaShieldHalved,
    title: "Faithful & Relevant",
    text: "Sound teaching that applies to real life.",
  },
  {
    icon: FaUsers,
    title: "Learning Community",
    text: "Grow together with like-minded believers.",
  },
  {
    icon: FaCertificate,
    title: "Certificate of Completion",
    text: "Receive a certificate upon successful completion.",
  },
];

export default function WhyStudyWithUs() {
  return (
    <section className="bg-[#F5F0E4] px-5 pb-7 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-4 flex items-center justify-center gap-4">
          <div className="hidden h-px w-20 bg-[#C8B990] sm:block" />

          <h2 className="font-serif text-xl font-bold text-[#294638]">
            Why Study With Us?
          </h2>

          <div className="hidden h-px w-20 bg-[#C8B990] sm:block" />
        </div>

        {/* Reasons */}
        <div className="grid overflow-hidden rounded-xl border border-[#E4DDCF] bg-[#FDFCF8] sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className={`flex items-center gap-3 px-5 py-5 ${
                  index !== reasons.length - 1
                    ? "border-b border-[#E4DDCF] lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00552F] text-white">
                  <Icon className="text-lg" />
                </div>

                <div>
                  <h3 className="font-serif text-sm font-bold text-[#294638]">
                    {reason.title}
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-gray-600">
                    {reason.text}
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
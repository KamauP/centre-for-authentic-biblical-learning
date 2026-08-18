import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaGlobe,
} from "react-icons/fa6";

const contactDetails = [
  {
    icon: FaPhone,
    title: "Ministry Phone",
    value: "+254 792382202",
    description: "We're happy to speak with you.",
  },
 /* {
    icon: FaEnvelope,
    title: "Email Address",
    value: "--",
    description: "We aim to respond within 24 hours.",
  },
  {
    icon: FaLocationDot,
    title: "Ministry Location",
    value: "--\nNairobi, Kenya",
    description: "Our teachings reach across Kenya and beyond.",
  },*/
  {
    icon: FaGlobe,
    title: "Website",
    value: "www.centerforauthenticbiblicallearning.org",
    description: "Visit our website for resources and updates.",
  },
];

export default function GetInTouch() {
  return (
    <div className="h-full rounded-xl border border-gray-200 bg-[#FDFCF8] p-5">
      <div className="flex items-center gap-2 mb-5">
        <FaPhone className="text-[#00552F]" />
        <h2 className="text-lg font-semibold text-[#294638]">
          GET IN TOUCH
        </h2>
      </div>

      <div className="space-y-4">
        {contactDetails.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex gap-3">
              <div className="w-9 h-9 shrink-0 rounded-lg bg-[#00552F] flex items-center justify-center">
                <Icon className="text-white text-sm" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-sm font-semibold text-gray-700 whitespace-pre-line mt-0.5">
                  {item.value}
                </p>

                <p className="text-xs text-gray-600 leading-4 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
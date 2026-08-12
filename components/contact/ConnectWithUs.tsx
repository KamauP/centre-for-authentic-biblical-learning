import {
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";
import { FaRss } from "react-icons/fa";

const platforms = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    color: "bg-blue-600",
    description: "Follow our page for updates, encouragement and teachings.",
    link: "facebook.com/authenticbiblelearning",
  },
  {
    name: "Substack",
    icon: FaRss,
    color: "bg-orange-500",
    description: "Read our articles and Bible studies on Substack.",
    link: "authenticbiblelearning.substack.com",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    color: "bg-red-600",
    description: "Watch our teachings and discussions.",
    link: "youtube.com/@authenticbiblelearning",
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    color: "bg-green-500",
    description: "Join our WhatsApp broadcast for ministry updates.",
    link: "+254 700 000 000",
  },
];

export default function ConnectWithUs() {
  return (
    <div className="h-full rounded-xl border border-gray-200 bg-[#FDFCF8] p-5">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-[#294638] text-xl">♧</span>
        <h2 className="text-lg font-semibold text-[#294638]">
          CONNECT WITH US
        </h2>
      </div>

      <div className="space-y-4">
        {platforms.map((platform) => {
          const Icon = platform.icon;

          return (
            <div key={platform.name} className="flex gap-3">
              <div
                className={`w-9 h-9 shrink-0 rounded-full ${platform.color} flex items-center justify-center`}
              >
                <Icon className="text-white" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {platform.name}
                </h3>

                <p className="text-xs text-gray-600 leading-4">
                  {platform.description}
                </p>

                <p className="text-[10px] text-gray-700 mt-0.5">
                  {platform.link}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
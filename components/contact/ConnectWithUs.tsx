import {
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";
import { FaRss } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";

const platforms = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    color: "bg-blue-600",
    description: "Follow our page for updates, encouragement and teachings.",
    link: "https://www.facebook.com/share/1DVwxkTtDy/",
  },
  {
    name: "Substack",
    icon: SiSubstack ,
    color: "bg-orange-500",
    description: "Read our articles and Bible studies on Substack.",
    link: "https://substack.com/@cable905894?utm_source=share&utm_medium=android&r=8f70gp",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    color: "bg-red-600",
    description: "Watch our teachings and discussions.",
    link: "https://youtube.com/@authenticbiblelearning",
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    color: "bg-green-500",
    description: "Join our WhatsApp channel for ministry updates.",
    link: "https://whatsapp.com/channel/0029Vb84hadKWEL046VazN3j",
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
            <a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 rounded-lg transition hover:bg-gray-50"
            >
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

                <p className="text-[10px] text-gray-700 mt-0.5 break-all">
                  {platform.link}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
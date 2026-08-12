import Image from "next/image";
import Link from "next/link";
import {
  FaHandsPraying,
  FaPeopleGroup,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa6";

const actions = [
  {
    icon: FaHandsPraying,
    title: "PRAY",
    text: "Stand with us in prayer as we equip believers through God's Word.",
    href: "/contact",
  },
  {
    icon: FaPeopleGroup,
    title: "PARTICIPATE",
    text: "Join our programmes, training and ministry activities.",
    href: "/events",
  },
  {
    icon: FaHeart,
    title: "PARTNER",
    text: "Help us continue the work of authentic biblical learning.",
    href: "/support",
  },
];

export default function EventsCTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="relative min-h-[180px] overflow-hidden rounded-xl bg-[#00552F]">

        {/* Image */}
        <div className="absolute left-0 top-0 h-full w-[43%]">
          <Image
            src="/images/events/events-cta.jpg"
            alt="Person praying with a Bible"
            fill
            className="object-cover object-center"
          />

          {/* Fade image into green */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00552F]/35 to-[#00552F]" />
        </div>

        {/* Content */}
        <div className="relative z-10 ml-[34%] flex min-h-[180px] items-center">

          {/* Quote */}
          <div className="w-[32%] pr-5 text-white">
            <p className="text-sm font-semibold italic leading-5">
              &quot;How good and pleasant it is when
              <br />
              God&apos;s people live together in unity!&quot;
            </p>

            <p className="mt-2 text-[10px] font-semibold text-[#E5A900]">
              — Psalm 133:1
            </p>
          </div>

          {/* Actions */}
          <div className="grid w-[58%] grid-cols-3 gap-2">
            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="rounded-lg bg-white/10 p-3 text-white transition hover:bg-white/15"
                >
                  <Icon className="mb-2 text-[#E5A900] text-base" />

                  <h3 className="text-[10px] font-bold">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-[8px] leading-3.5 text-green-50">
                    {action.text}
                  </p>

                  <span className="mt-2 inline-flex items-center gap-1 text-[8px] font-semibold text-[#E5A900]">
                    LEARN MORE
                    <FaArrowRight />
                  </span>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
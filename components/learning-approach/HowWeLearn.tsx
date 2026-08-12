import {
  FaMagnifyingGlass,
  FaLightbulb,
  FaPersonWalking,
  FaShareNodes,
} from "react-icons/fa6";

const steps = [
  {
    number: "01",
    icon: FaMagnifyingGlass,
    title: "Discover",
    text: "We begin by exploring Scripture carefully and asking what God has revealed.",
  },
  {
    number: "02",
    icon: FaLightbulb,
    title: "Understand",
    text: "We examine the context, meaning and principles behind what we have discovered.",
  },
  {
    number: "03",
    icon: FaPersonWalking,
    title: "Apply",
    text: "Biblical truth becomes practical as we consider how it should shape our everyday lives.",
  },
  {
    number: "04",
    icon: FaShareNodes,
    title: "Share",
    text: "What we learn is not meant to stop with us. We are equipped to encourage and teach others.",
  },
];

export default function HowWeLearn() {
  return (
    <section className="bg-[#FDFCF8] px-5 py-7 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-7 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A6D08]">
            The Learning Journey
          </p>

          <h2 className="mt-1 font-serif text-2xl font-bold text-[#294638]">
            How We Learn
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-gray-600">
            A simple journey from discovering biblical truth to
            living it and sharing it with others.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-4">

          {/* Connecting line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[43px] hidden h-px bg-[#D8CDB8] md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative z-10 flex flex-col items-center text-center"
              >
                {/* Number */}
                <span className="mb-2 text-[9px] font-bold tracking-widest text-[#C58B12]">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-4 border-[#FDFCF8] bg-[#00552F] text-white shadow-sm">
                  <Icon className="text-lg" />
                </div>

                <h3 className="mt-3 font-serif text-base font-bold text-[#294638]">
                  {step.title}
                </h3>

                <p className="mt-1 max-w-[190px] text-[10px] leading-4 text-gray-600">
                  {step.text}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
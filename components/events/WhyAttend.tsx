import { FaUsers, FaCheck } from "react-icons/fa6";

const reasons = [
  "Grow in the authentic knowledge of God's Word",
  "Practical teaching for everyday life",
  "Fellowship with like-minded believers",
  "Be equipped for Kingdom impact",
];

export default function WhyAttend() {
  return (
    <div className="rounded-xl border border-gray-200 bg-[#FDFCF8] p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00552F] text-white">
          <FaUsers className="text-xs" />
        </div>

        <h2 className="text-sm font-bold text-[#294638]">
          WHY ATTEND?
        </h2>
      </div>

      <div className="space-y-2">
        {reasons.map((reason) => (
          <div
            key={reason}
            className="flex items-start gap-2 text-[10px] leading-4 text-gray-700"
          >
            <FaCheck className="mt-0.5 shrink-0 text-[#00552F]" />
            <span>{reason}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
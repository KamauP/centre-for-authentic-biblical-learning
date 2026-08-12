import {
  FaMobileScreenButton,
  FaBuildingColumns,
  FaCreditCard,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa6";

const methods = [
  {
    title: "M-PESA",
    description: "Support the ministry easily via M-Pesa.",
    icon: FaMobileScreenButton,
  },
  {
    title: "Bank Transfer",
    description: "Make a direct transfer to our ministry bank account.",
    icon: FaBuildingColumns,
  },
  {
    title: "Online Giving",
    description: "Give securely online using debit/credit card.",
    icon: FaCreditCard,
  },
  {
    title: "International Giving",
    description: "Support from anywhere in the world.",
    icon: FaGlobe,
  },
];

export default function WaysToSupport() {
  return (
    <div className="rounded-xl bg-[#00552F] p-4 text-white">
      <h2 className="text-center text-lg font-semibold mb-3">
        WAYS TO SUPPORT
      </h2>

      <div className="overflow-hidden rounded-md bg-[#FDFCF8] text-[#294638]">
        {methods.map((method, index) => {
          const Icon = method.icon;

          return (
            <div
              key={method.title}
              className={`flex items-center gap-3 px-3 py-3 ${
                index !== methods.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <Icon className="text-lg text-[#294638] shrink-0" />

              <div className="flex-1">
                <h3 className="text-xs font-semibold">
                  {method.title}
                </h3>

                <p className="text-[10px] leading-4 text-gray-600">
                  {method.description}
                </p>
              </div>

              <FaArrowRight className="text-[10px] shrink-0" />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-3 mx-auto flex items-center gap-2 rounded-md bg-[#C58B12] px-5 py-2 text-xs font-semibold text-white hover:bg-[#AD780A] transition"
      >
        VIEW GIVING DETAILS
        <FaArrowRight />
      </button>
    </div>
  );
}
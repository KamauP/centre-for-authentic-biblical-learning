"use client";

import { useState } from "react";
import {
  FaMobileScreenButton,
  FaBuildingColumns,
  FaCreditCard,
  FaGlobe,
  FaArrowRight,
  FaXmark,
} from "react-icons/fa6";

const methods = [
  {
    title: "M-PESA",
    description: "Support the ministry easily via M-Pesa.",
    icon: FaMobileScreenButton,
    active: true,
  },
  {
    title: "Bank Transfer",
    description: "Make a direct transfer to our ministry bank account.",
    icon: FaBuildingColumns,
    active: false,
  },
  {
    title: "Online Giving",
    description: "Give securely online using debit/credit card.",
    icon: FaCreditCard,
    active: false,
  },
  {
    title: "International Giving",
    description: "Support from anywhere in the world.",
    icon: FaGlobe,
    active: false,
  },
];

export default function WaysToSupport() {
  const [showMpesa, setShowMpesa] = useState(false);

  return (
    <>
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
                onClick={() => {
                  if (method.active) {
                    setShowMpesa(true);
                  }
                }}
                className={`flex items-center gap-3 px-3 py-3 ${
                  index !== methods.length - 1
                    ? "border-b border-gray-200"
                    : ""
                } ${
                  method.active
                    ? "cursor-pointer hover:bg-[#F7F5ED] transition"
                    : "opacity-60"
                }`}
              >
                <Icon className="text-lg text-[#294638] shrink-0" />

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-semibold">
                      {method.title}
                    </h3>

                    {!method.active && (
                      <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[8px] font-semibold uppercase text-gray-500">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <p className="text-[10px] leading-4 text-gray-600">
                    {method.description}
                  </p>
                </div>

                {method.active && (
                  <FaArrowRight className="text-[10px] shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setShowMpesa(true)}
          className="mt-3 mx-auto flex items-center gap-2 rounded-md bg-[#C58B12] px-5 py-2 text-xs font-semibold text-white hover:bg-[#AD780A] transition"
        >
          VIEW GIVING DETAILS
          <FaArrowRight />
        </button>
      </div>

      {/* M-Pesa Modal */}
      {showMpesa && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowMpesa(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-xl bg-[#FDFCF8] p-6 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowMpesa(false)}
              className="absolute right-3 top-3 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
              aria-label="Close"
            >
              <FaXmark />
            </button>

            {/* Icon */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <FaMobileScreenButton className="text-2xl text-[#00552F]" />
            </div>

            <h2 className="text-lg font-bold text-[#294638]">
              M-PESA SEND MONEY
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              To support the ministry, send your contribution via M-Pesa:
            </p>

            <div className="mt-4 rounded-lg bg-[#F3EAD7] px-4 py-4">
              <p className="text-xs font-medium text-gray-600">
                SEND MONEY 
              </p>

              <p className="mt-1 text-2xl font-bold tracking-wide text-[#00552F]">
                0792382202
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowMpesa(false)}
              className="mt-5 rounded-md bg-[#00552F] px-6 py-2 text-sm font-semibold text-white hover:bg-[#003F22] transition"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
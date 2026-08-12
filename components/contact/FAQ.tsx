"use client";

import { useState } from "react";
import { FaChevronDown, FaCircleQuestion } from "react-icons/fa6";

const questions = [
  "How do I join a course or training?",
  "Are the articles and resources free?",
  "How can I invite the ministry to teach at our church or group?",
  "How can I support the ministry?",
  "How soon will I get a response?",
  "Can I request a prayer?",
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-gray-200 bg-[#FDFCF8] p-5">

      <div className="flex items-center gap-2 mb-3">
        <FaCircleQuestion className="text-[#294638]" />
        <h2 className="text-lg font-semibold text-[#294638]">
          FREQUENTLY ASKED QUESTIONS
        </h2>
      </div>

      <div className="space-y-1">
        {questions.map((question, index) => (
          <div
            key={question}
            className="border border-gray-200 rounded-md overflow-hidden"
          >
            <button
              type="button"
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs font-medium transition ${
                open === index
                  ? "bg-[#F3E9CF] text-[#00552F]"
                  : "bg-white text-gray-700 hover:bg-[#F8F3E6]"
              }`}
            >
              <span>{question}</span>

              <FaChevronDown
                className={`text-[10px] transition-transform ${
                  open === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === index && (
              <div className="px-3 py-2 bg-[#FDFCF8] text-xs text-gray-600 leading-5">
                Please contact us directly and our team will be happy
                to provide you with the information you need.
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
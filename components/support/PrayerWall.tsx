"use client";
import { trackEvent } from "@/utils/analytics";
import Image from "next/image";
import { useState } from "react";
import {
  FaHandsPraying,
  FaPaperPlane,
  FaLock,
} from "react-icons/fa6";
import { createClient } from "@/utils/supabase/client";

export default function PrayerWall() {
  const supabase = createClient();

  const [request, setRequest] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!request.trim()) {
      setMessage("Please enter your prayer request.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    const { error } = await supabase
      .from("prayer_requests")
      .insert({
        request: request.trim(),
        name: name.trim() || null,
        email: email.trim() || null,
      });

    if (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }
    await trackEvent({
     event_type: "prayer_request",
     page: "/support",
     });

    setRequest("");
    setName("");
    setEmail("");
    setMessage("Your prayer request has been submitted. Thank you.");

    setSubmitting(false);
  }

  return (
    <div className="relative min-h-[190px] overflow-hidden rounded-xl bg-[#FDFCF8]">

      {/* Prayer image */}
      <div className="absolute right-0 top-0 h-full w-[42%]">
        <Image
          src="/images/support/prayer-wall.jpg"
          alt="Person praying with a Bible"
          fill
          className="object-cover object-center"
        />

        {/* Soft fade into the content */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFCF8] via-[#FDFCF8]/45 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-[68%] p-5">

        <div className="mb-2 flex items-center gap-2">
          <FaHandsPraying className="text-lg text-[#00552F]" />

          <h2 className="text-base font-semibold text-[#294638]">
            PRAYER WALL
          </h2>
        </div>

        <p className="mb-3 text-[11px] leading-4 text-gray-600">
          We believe in the power of prayer. Share your prayer request
          with us and our team will stand with you in prayer.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-[430px] space-y-2"
        >
          <textarea
            rows={2}
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder="Share your prayer request..."
            className="w-full resize-none rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-[10px] text-gray-700 placeholder:text-gray-500 outline-none focus:border-[#00552F]"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name (Optional)"
              className="w-full rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-[10px] text-gray-700 placeholder:text-gray-500 outline-none focus:border-[#00552F]"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email (Optional)"
              className="w-full rounded-md border border-gray-200 bg-white/90 px-3 py-2 text-[10px] text-gray-700 placeholder:text-gray-500 outline-none focus:border-[#00552F]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-md bg-[#00552F] px-5 py-2 text-[10px] font-semibold text-white transition hover:bg-[#004525] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaPaperPlane />
            {submitting ? "SUBMITTING..." : "SUBMIT PRAYER REQUEST"}
          </button>

          {message && (
            <p className="text-[9px] font-medium text-[#00552F]">
              {message}
            </p>
          )}

          <div className="flex items-center gap-1 text-[9px] text-gray-500">
            <FaLock />
            Your prayer request will be treated with care and confidentiality.
          </div>
        </form>
      </div>
    </div>
  );
}
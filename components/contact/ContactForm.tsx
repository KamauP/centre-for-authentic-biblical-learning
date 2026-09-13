"use client";

import { useState } from "react";
import { FaPaperPlane, FaLock } from "react-icons/fa6";
import { createClient } from "@/utils/supabase/client";
import { trackEvent } from "@/utils/analytics";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-500 outline-none focus:border-[#00552F]";

export default function ContactForm() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitting(true);
    setStatus("");

    const { error } = await supabase
      .from("messages")
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        subject: subject.trim(),
        message: message.trim(),
      });

    if (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }
await trackEvent({
  event_type: "message_sent",
  page: "/contact",
});
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");

    setStatus("Your message has been sent successfully.");
    setSubmitting(false);
  }

  return (
    <div className="h-full rounded-xl border border-gray-200 bg-[#FDFCF8] p-5">

      <div className="mb-5 flex items-center gap-2">
        <FaEnvelopeIcon />

        <h2 className="text-lg font-semibold text-[#294638]">
          SEND US A MESSAGE
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
        />

        <input
          type="tel"
          placeholder="Phone Number (Optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className={inputClass}
        />

        <textarea
          placeholder="Your Message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className={`${inputClass} resize-none`}
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-[#00552F] py-2 text-sm font-semibold text-white transition hover:bg-[#004525] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="inline-flex items-center gap-2">
            <FaPaperPlane />
            {submitting ? "SENDING..." : "SEND MESSAGE"}
          </span>
        </button>

        {status && (
          <p className="pt-1 text-center text-[10px] font-medium text-[#00552F]">
            {status}
          </p>
        )}

        <p className="flex items-center justify-center gap-1 pt-1 text-[10px] text-gray-500">
          <FaLock />
          Your information is safe with us and will never be shared.
        </p>

      </form>
    </div>
  );
}

function FaEnvelopeIcon() {
  return (
    <span className="text-xl text-[#294638]">
      ✉
    </span>
  );
}

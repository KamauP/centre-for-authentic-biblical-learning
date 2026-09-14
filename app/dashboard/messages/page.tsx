"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaTrash,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function MessagesPage() {
  const supabase = createClient();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadMessages() {
    setLoading(true);

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setMessages(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function markAsRead(message: Message) {
    const newStatus = !message.is_read;

    const { error } = await supabase
      .from("messages")
      .update({ is_read: newStatus })
      .eq("id", message.id);

    if (error) {
      console.error(error);
      return;
    }

    setMessages((current) =>
      current.map((item) =>
        item.id === message.id
          ? { ...item, is_read: newStatus }
          : item
      )
    );
  }

  async function handleDelete(message: Message) {
    const confirmed = window.confirm(
      `Are you sure you want to delete the message from ${message.name}?`
    );

    if (!confirmed) return;

    setDeletingId(message.id);

    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", message.id);

    if (error) {
      console.error(error);
      alert("Could not delete the message.");
      setDeletingId(null);
      return;
    }

    setMessages((current) =>
      current.filter((item) => item.id !== message.id)
    );

    if (expandedId === message.id) {
      setExpandedId(null);
    }

    setDeletingId(null);
  }

  function toggleMessage(message: Message) {
    const isOpening = expandedId !== message.id;

    setExpandedId(isOpening ? message.id : null);

    // Automatically mark unread messages as read when opened
    if (isOpening && !message.is_read) {
      markAsRead(message);
    }
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-green-950 sm:text-3xl">
            Messages
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            View and manage messages submitted through the website.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-green-100 border-t-green-800" />

          <p className="mt-4 text-sm text-gray-500">
            Loading messages...
          </p>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(
    (message) => !message.is_read
  ).length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-900">
            <FaEnvelope size={16} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-green-950 sm:text-3xl">
              Messages
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              Messages submitted through the website.
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      {messages.length > 0 && (
        <div className="flex gap-3">
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Total
            </p>

            <p className="mt-0.5 text-xl font-bold text-green-950">
              {messages.length}
            </p>
          </div>

          <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 shadow-sm">
            <p className="text-[11px] font-medium uppercase tracking-wide text-green-700">
              Unread
            </p>

            <p className="mt-0.5 text-xl font-bold text-green-900">
              {unreadCount}
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {messages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-900">
            <FaEnvelope size={22} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-green-950">
            No messages yet
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            Messages submitted through the website will appear here.
          </p>
        </div>
      ) : (
        /* Messages */
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {messages.map((message, index) => {
            const expanded = expandedId === message.id;
            const isDeleting = deletingId === message.id;

            return (
              <div
                key={message.id}
                className={`border-b border-gray-100 last:border-b-0 ${
                  !message.is_read
                    ? "bg-green-50/40"
                    : "bg-white"
                }`}
              >
                {/* Message row */}
                <button
                  type="button"
                  onClick={() => toggleMessage(message)}
                  className="w-full px-4 py-4 text-left transition hover:bg-gray-50 sm:px-5"
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        message.is_read
                          ? "bg-gray-100 text-gray-500"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {message.is_read ? (
                        <FaEnvelopeOpen size={13} />
                      ) : (
                        <FaEnvelope size={13} />
                      )}
                    </div>

                    {/* Main info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-2">
                          <p
                            className={`truncate text-sm ${
                              message.is_read
                                ? "font-medium text-gray-800"
                                : "font-bold text-green-950"
                            }`}
                          >
                            {message.name}
                          </p>

                          {!message.is_read && (
                            <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-800">
                              New
                            </span>
                          )}
                        </div>

                        <p className="shrink-0 text-[11px] text-gray-400">
                          {formatDate(message.created_at)}
                        </p>
                      </div>

                      <p
                        className={`mt-1 truncate text-sm ${
                          message.is_read
                            ? "font-medium text-gray-700"
                            : "font-semibold text-green-900"
                        }`}
                      >
                        {message.subject}
                      </p>

                      <p className="mt-1 truncate text-xs text-gray-500">
                        {message.message}
                      </p>
                    </div>

                    {/* Expand icon */}
                    <div className="mt-1 shrink-0 text-gray-400">
                      {expanded ? (
                        <FaChevronUp size={12} />
                      ) : (
                        <FaChevronDown size={12} />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded message */}
                {expanded && (
                  <div className="border-t border-gray-100 bg-gray-50 px-4 pb-4 pt-4 sm:px-5">
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                      {/* Sender */}
                      <div className="grid gap-3 text-sm sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            From
                          </p>

                          <p className="mt-1 font-semibold text-gray-800">
                            {message.name}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Email
                          </p>

                          <p className="mt-1 break-all font-medium text-green-800">
                            {message.email}
                          </p>
                        </div>

                        {message.phone && (
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                              Phone
                            </p>

                            <p className="mt-1 font-medium text-gray-800">
                              {message.phone}
                            </p>
                          </div>
                        )}

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Sent
                          </p>

                          <p className="mt-1 font-medium text-gray-800">
                            {formatDate(message.created_at)}
                          </p>
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="mt-5 border-t border-gray-100 pt-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                          Subject
                        </p>

                        <p className="mt-1 font-semibold text-green-950">
                          {message.subject}
                        </p>
                      </div>

                      {/* Message */}
                      <div className="mt-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                          Message
                        </p>

                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                          {message.message}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => markAsRead(message)}
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-green-200 px-4 py-2 text-xs font-semibold text-green-800 transition hover:bg-green-50"
                        >
                          {message.is_read ? (
                            <>
                              <FaEnvelope size={11} />
                              Mark Unread
                            </>
                          ) : (
                            <>
                              <FaCheck size={11} />
                              Mark Read
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(message)}
                          disabled={isDeleting}
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaTrash size={11} />
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

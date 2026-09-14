"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  FaPrayingHands,
  FaEnvelope,
  FaEnvelopeOpen,
  FaTrash,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

type PrayerRequest = {
  id: string;
  name: string | null;
  email: string | null;
  request: string;
  is_read: boolean;
  created_at: string;
};

export default function PrayerRequestsPage() {
  const supabase = createClient();

  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadRequests() {
    setLoading(true);

    const { data, error } = await supabase
      .from("prayer_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setRequests(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function markAsRead(request: PrayerRequest) {
    const newStatus = !request.is_read;

    const { error } = await supabase
      .from("prayer_requests")
      .update({ is_read: newStatus })
      .eq("id", request.id);

    if (error) {
      console.error(error);
      return;
    }

    setRequests((current) =>
      current.map((item) =>
        item.id === request.id
          ? { ...item, is_read: newStatus }
          : item
      )
    );
  }

  async function handleDelete(request: PrayerRequest) {
    const confirmed = window.confirm(
      `Are you sure you want to delete this prayer request${
        request.name ? ` from ${request.name}` : ""
      }?`
    );

    if (!confirmed) return;

    setDeletingId(request.id);

    const { error } = await supabase
      .from("prayer_requests")
      .delete()
      .eq("id", request.id);

    if (error) {
      console.error(error);
      alert("Could not delete the prayer request.");
      setDeletingId(null);
      return;
    }

    setRequests((current) =>
      current.filter((item) => item.id !== request.id)
    );

    if (expandedId === request.id) {
      setExpandedId(null);
    }

    setDeletingId(null);
  }

  function toggleRequest(request: PrayerRequest) {
    const isOpening = expandedId !== request.id;

    setExpandedId(isOpening ? request.id : null);

    // Automatically mark unread requests as read when opened
    if (isOpening && !request.is_read) {
      markAsRead(request);
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
            Prayer Requests
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            View and manage prayer requests submitted through the website.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-green-100 border-t-green-800" />

          <p className="mt-4 text-sm text-gray-500">
            Loading prayer requests...
          </p>
        </div>
      </div>
    );
  }

  const unreadCount = requests.filter(
    (request) => !request.is_read
  ).length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-900">
            <FaPrayingHands size={16} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-green-950 sm:text-3xl">
              Prayer Requests
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              Prayer requests submitted through the website.
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      {requests.length > 0 && (
        <div className="flex gap-3">
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Total
            </p>

            <p className="mt-0.5 text-xl font-bold text-green-950">
              {requests.length}
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
      {requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-900">
            <FaPrayingHands size={22} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-green-950">
            No prayer requests yet
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            Prayer requests submitted through the website will appear here.
          </p>
        </div>
      ) : (
        /* Requests */
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {requests.map((request) => {
            const expanded = expandedId === request.id;
            const isDeleting = deletingId === request.id;

            return (
              <div
                key={request.id}
                className={`border-b border-gray-100 last:border-b-0 ${
                  !request.is_read
                    ? "bg-green-50/40"
                    : "bg-white"
                }`}
              >
                {/* Request row */}
                <button
                  type="button"
                  onClick={() => toggleRequest(request)}
                  className="w-full px-4 py-4 text-left transition hover:bg-gray-50 sm:px-5"
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        request.is_read
                          ? "bg-gray-100 text-gray-500"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {request.is_read ? (
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
                              request.is_read
                                ? "font-medium text-gray-800"
                                : "font-bold text-green-950"
                            }`}
                          >
                            {request.name || "Anonymous"}
                          </p>

                          {!request.is_read && (
                            <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-800">
                              New
                            </span>
                          )}
                        </div>

                        <p className="shrink-0 text-[11px] text-gray-400">
                          {formatDate(request.created_at)}
                        </p>
                      </div>

                      {request.email && (
                        <p className="mt-0.5 truncate text-xs text-gray-500">
                          {request.email}
                        </p>
                      )}

                      <p className="mt-1.5 truncate text-sm text-gray-600">
                        {request.request}
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

                {/* Expanded request */}
                {expanded && (
                  <div className="border-t border-gray-100 bg-gray-50 px-4 pb-4 pt-4 sm:px-5">
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                      {/* Contact information */}
                      <div className="grid gap-3 text-sm sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Name
                          </p>

                          <p className="mt-1 font-semibold text-gray-800">
                            {request.name || "Anonymous"}
                          </p>
                        </div>

                        {request.email && (
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                              Email
                            </p>

                            <p className="mt-1 break-all font-medium text-green-800">
                              {request.email}
                            </p>
                          </div>
                        )}

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Submitted
                          </p>

                          <p className="mt-1 font-medium text-gray-800">
                            {formatDate(request.created_at)}
                          </p>
                        </div>
                      </div>

                      {/* Prayer request */}
                      <div className="mt-5 border-t border-gray-100 pt-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                          Prayer Request
                        </p>

                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                          {request.request}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => markAsRead(request)}
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-green-200 px-4 py-2 text-xs font-semibold text-green-800 transition hover:bg-green-50"
                        >
                          {request.is_read ? (
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
                          onClick={() => handleDelete(request)}
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

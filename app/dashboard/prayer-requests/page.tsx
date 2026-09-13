"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

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

  async function loadRequests() {
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
    const { error } = await supabase
      .from("prayer_requests")
      .update({ is_read: !request.is_read })
      .eq("id", request.id);

    if (error) {
      console.error(error);
      return;
    }

    setRequests((current) =>
      current.map((item) =>
        item.id === request.id
          ? { ...item, is_read: !item.is_read }
          : item
      )
    );
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this prayer request?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("prayer_requests")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Could not delete the prayer request.");
      return;
    }

    setRequests((current) =>
      current.filter((request) => request.id !== id)
    );
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Prayer Requests
        </h1>

        <p className="mt-4 text-gray-600">
          Loading prayer requests...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Prayer Requests
        </h1>

        <p className="mt-2 text-gray-600">
          View and manage prayer requests submitted through the website.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-lg bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            No prayer requests yet
          </h2>

          <p className="mt-2 text-gray-500">
            Prayer requests submitted through the website will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className={`rounded-lg bg-white p-6 shadow-sm ${
                !request.is_read ? "border-l-4 border-green-700" : ""
              }`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {request.name || "Anonymous"}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        request.is_read
                          ? "bg-gray-100 text-gray-600"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {request.is_read ? "Read" : "Unread"}
                    </span>
                  </div>

                  {request.email && (
                    <p className="mt-1 text-sm text-gray-500">
                      {request.email}
                    </p>
                  )}

                  <p className="mt-4 whitespace-pre-wrap text-gray-700">
                    {request.request}
                  </p>

                  <p className="mt-4 text-sm text-gray-400">
                    {new Date(request.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => markAsRead(request)}
                    className="rounded-lg border border-green-700 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
                  >
                    {request.is_read ? "Mark Unread" : "Mark Read"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(request.id)}
                    className="rounded-lg border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
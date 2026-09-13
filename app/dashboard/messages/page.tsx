"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

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

  async function loadMessages() {
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
    const { error } = await supabase
      .from("messages")
      .update({ is_read: !message.is_read })
      .eq("id", message.id);

    if (error) {
      console.error(error);
      return;
    }

    setMessages((current) =>
      current.map((item) =>
        item.id === message.id
          ? { ...item, is_read: !item.is_read }
          : item
      )
    );
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Could not delete the message.");
      return;
    }

    setMessages((current) =>
      current.filter((message) => message.id !== id)
    );
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Messages
        </h1>

        <p className="mt-4 text-gray-600">
          Loading messages...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Messages
        </h1>

        <p className="mt-2 text-gray-600">
          View and manage messages submitted through the website.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-lg bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            No messages yet
          </h2>

          <p className="mt-2 text-gray-500">
            Messages submitted through the website will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-lg bg-white p-6 shadow-sm ${
                !message.is_read
                  ? "border-l-4 border-green-700"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {message.subject}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          message.is_read
                            ? "bg-gray-100 text-gray-600"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {message.is_read ? "Read" : "Unread"}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-600">
                      {message.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {message.email}
                    </p>

                    {message.phone && (
                      <p className="text-sm text-gray-500">
                        {message.phone}
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-gray-400">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="whitespace-pre-wrap text-gray-700">
                    {message.message}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => markAsRead(message)}
                    className="rounded-lg border border-green-700 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
                  >
                    {message.is_read ? "Mark Unread" : "Mark Read"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(message.id)}
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
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function NewHeroSlidePage() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    if (!image) {
      setError("Please select a hero image.");
      setLoading(false);
      return;
    }

    if (!image.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      setLoading(false);
      return;
    }

    try {
      const fileExtension = image.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExtension}`;

      const { error: uploadError } = await supabase.storage
        .from("hero-images")
        .upload(fileName, image);

      if (uploadError) {
        throw uploadError;
      }

      const { error: insertError } = await supabase
        .from("hero_slides")
        .insert({
          title,
          description,
          reference,
          image_url: fileName,
          display_order: Number(displayOrder),
          is_active: isActive,
        });

      if (insertError) {
        throw insertError;
      }

      router.push("/dashboard/homepage");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving the slide."
      );

      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Add Hero Slide
        </h1>

        <p className="mt-2 text-gray-600">
          Create a new slide for the homepage hero.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-6 rounded-lg bg-white p-8 shadow-sm"
      >
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Igniting a Passion for God's Word"
            required
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-700"
            maxLength={70}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the description for this hero slide..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-700"
            maxLength={150}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Bible Reference
          </label>

          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="John 8:12"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-700"
            maxLength={40}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Hero Image
          </label>

          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <p className="mt-2 text-sm text-gray-500">
            Select an image to use for this slide.
          </p>
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Display Order
          </label>

          <input
            type="number"
            min="0"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-700"
          />

          <p className="mt-1 text-sm text-gray-500">
            Lower numbers appear first.
          </p>
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4"
          />

          <span className="font-medium text-gray-700">
            Active slide
          </span>
        </label>

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-green-700 px-5 py-3 font-medium text-white hover:bg-green-800 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Slide"}
          </button>
        </div>
      </form>
    </div>
  );
}
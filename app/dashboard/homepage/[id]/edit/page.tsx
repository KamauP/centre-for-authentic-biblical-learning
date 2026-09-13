"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function EditHeroSlidePage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [isActive, setIsActive] = useState(true);

  const [existingImage, setExistingImage] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load existing slide
  useEffect(() => {
    async function loadSlide() {
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setError("Could not load this hero slide.");
        setLoading(false);
        return;
      }

      setTitle(data.title || "");
      setDescription(data.description || "");
      setReference(data.reference || "");
      setDisplayOrder(String(data.display_order ?? 0));
      setIsActive(data.is_active);
      setExistingImage(data.image_url || "");

      setLoading(false);
    }

    loadSlide();
  }, [id]);

  // Save changes
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      let imageUrl = existingImage;

      // If a new image was selected
      if (newImage) {
        if (!newImage.type.startsWith("image/")) {
          throw new Error("Please select a valid image file.");
        }

        const fileExtension = newImage.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExtension}`;

        const { error: uploadError } = await supabase.storage
          .from("hero-images")
          .upload(fileName, newImage);

        if (uploadError) {
          throw uploadError;
        }

        imageUrl = fileName;

        // Delete old image
        if (existingImage) {
          await supabase.storage
            .from("hero-images")
            .remove([existingImage]);
        }
      }

      // Update database
      const { error: updateError } = await supabase
        .from("hero_slides")
        .update({
          title,
          description,
          reference,
          image_url: imageUrl,
          display_order: Number(displayOrder),
          is_active: isActive,
        })
        .eq("id", id);

      if (updateError) {
        throw updateError;
      }

      // Return to homepage dashboard
      router.push("/dashboard/homepage");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while updating the slide."
      );

      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Hero Slide
        </h1>

        <p className="mt-4 text-gray-600">
          Loading slide...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Hero Slide
        </h1>

        <p className="mt-2 text-gray-600">
          Update this homepage hero slide.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-6 rounded-lg bg-white p-8 shadow-sm"
      >
        {/* Title */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={70}
            required
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-700"
          />

          <p className="mt-1 text-sm text-gray-500">
            Maximum 70 characters.
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={150}
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-700"
          />

          <p className="mt-1 text-sm text-gray-500">
            Maximum 150 characters.
          </p>
        </div>

        {/* Reference */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Bible Reference
          </label>

          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            maxLength={40}
            placeholder="John 8:12"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-700"
          />
        </div>

        {/* Current Image */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Current Image
          </label>

          {existingImage && (
            <img
              src={
                supabase.storage
                  .from("hero-images")
                  .getPublicUrl(existingImage).data.publicUrl
              }
              alt={title}
              className="mb-4 h-48 w-full rounded-lg object-cover"
            />
          )}

          <label className="mb-2 block font-medium text-gray-700">
            Replace Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImage(e.target.files?.[0] || null)}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <p className="mt-2 text-sm text-gray-500">
            Leave empty to keep the current image.
          </p>
        </div>

        {/* Display Order */}
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
        </div>

        {/* Active */}
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

        {/* Error */}
        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {/* Buttons */}
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
            disabled={saving}
            className="rounded-lg bg-green-700 px-5 py-3 font-medium text-white hover:bg-green-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}


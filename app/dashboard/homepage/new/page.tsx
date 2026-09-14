"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  FaArrowLeft,
  FaCloudUploadAlt,
  FaImage,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

export default function NewHeroSlidePage() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [isActive, setIsActive] = useState(true);

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Create image preview
  useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [image]);

  // Handle image selection
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedImage = e.target.files?.[0];

    if (!selectedImage) return;

    setError("");

    if (!selectedImage.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (selectedImage.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setImage(selectedImage);
  }

  // Remove selected image
  function removeImage() {
    setImage(null);
    setImagePreview(null);
  }

  // Save hero slide and automatically create Creations Notebook entry
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    if (!title.trim()) {
      setError("Please enter a title.");
      setLoading(false);
      return;
    }

    let uploadedImagePath: string | null = null;
    let createdHeroId: string | null = null;

    try {
      let imageUrl: string | null = null;

      // Upload image if one was selected
      if (image) {
        if (!image.type.startsWith("image/")) {
          setError("Please select a valid image file.");
          setLoading(false);
          return;
        }

        const fileExtension =
          image.name.split(".").pop()?.toLowerCase() || "jpg";

        const fileName = `${crypto.randomUUID()}.${fileExtension}`;

        const { error: uploadError } = await supabase.storage
          .from("hero-images")
          .upload(fileName, image);

        if (uploadError) {
          throw uploadError;
        }

        imageUrl = fileName;
        uploadedImagePath = fileName;
      }

      // Create Hero Slide
      const { data: heroSlide, error: heroError } = await supabase
        .from("hero_slides")
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          reference: reference.trim() || null,
          image_url: imageUrl,
          display_order: Number(displayOrder),
          is_active: isActive,
        })
        .select("id")
        .single();

      if (heroError) {
        throw heroError;
      }

      createdHeroId = heroSlide.id;

      // Automatically create the matching Creations Notebook entry
      const { error: creationError } = await supabase
        .from("creations")
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          reference: reference.trim() || null,
          image_url: imageUrl,
          category: "Nature Teaches Us",
          is_published: true,
          hero_slide_id: heroSlide.id,
        });

      if (creationError) {
        throw creationError;
      }

      // Everything succeeded
      router.push("/dashboard/homepage");
      router.refresh();
    } catch (error) {
      console.error(error);

      // Roll back Hero Slide if it was created
      if (createdHeroId) {
        await supabase
          .from("hero_slides")
          .delete()
          .eq("id", createdHeroId);
      }

      // Roll back uploaded image if necessary
      if (uploadedImagePath) {
        await supabase.storage
          .from("hero-images")
          .remove([uploadedImagePath]);
      }

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving the slide."
      );

      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-700"
        >
          <FaArrowLeft />
          Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900">
          Add Hero Slide
        </h1>

        <p className="mt-2 text-gray-600">
          Create a new homepage hero slide. It will also be saved
          automatically in the Creations Notebook.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={70}
            required
            placeholder="Enter hero slide title"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-700 focus:ring-1 focus:ring-green-700"
          />

          <p className="mt-1 text-xs text-gray-500">
            Maximum 70 characters.
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={150}
            rows={4}
            placeholder="Enter a short description"
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-700 focus:ring-1 focus:ring-green-700"
          />

          <p className="mt-1 text-xs text-gray-500">
            Maximum 150 characters.
          </p>
        </div>

        {/* Bible Reference */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Bible Reference
          </label>

          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            maxLength={40}
            placeholder="John 8:12"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-700 focus:ring-1 focus:ring-green-700"
          />

          <p className="mt-1 text-xs text-gray-500">
            Maximum 40 characters.
          </p>
        </div>

        {/* Image */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Hero Image
          </label>

          {!imagePreview ? (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition hover:border-green-700 hover:bg-green-50">
              <FaCloudUploadAlt className="mb-3 text-3xl text-green-700" />

              <span className="text-sm font-medium text-gray-700">
                Click to upload an image
              </span>

              <span className="mt-1 text-xs text-gray-500">
                JPG, PNG, WEBP or other image formats • Max 5MB
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative overflow-hidden rounded-lg border border-gray-200">
              <img
                src={imagePreview}
                alt="Selected hero image preview"
                className="h-56 w-full object-cover"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                aria-label="Remove image"
                title="Remove image"
              >
                <FaTimes />
              </button>

              <div className="flex items-center gap-2 bg-white px-4 py-3 text-sm text-gray-700">
                <FaImage className="text-green-700" />

                <span className="truncate">
                  {image?.name}
                </span>
              </div>
            </div>
          )}

          <p className="mt-2 text-xs text-gray-500">
            Leave empty to use the website&apos;s default hero image.
          </p>
        </div>

        {/* Display Order */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Display Order
          </label>

          <input
            type="number"
            min="0"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-700 focus:ring-1 focus:ring-green-700"
          />

          <p className="mt-1 text-xs text-gray-500">
            Lower numbers appear first.
          </p>
        </div>

        {/* Active */}
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 accent-green-700"
          />

          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FaCheckCircle className="text-green-700" />
              Active slide
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Active slides can appear on the homepage.
            </p>
          </div>
        </label>

        {/* Info */}
        <div className="rounded-lg border border-green-100 bg-green-50 p-4">
          <p className="text-sm font-medium text-green-900">
            Creations Notebook
          </p>

          <p className="mt-1 text-xs leading-5 text-green-800">
            This hero slide will automatically be added to the
            Creations Notebook under &quot;Nature Teaches Us&quot; so it
            remains available after it is removed from the homepage.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <FaCheckCircle />
                Save Hero Slide
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

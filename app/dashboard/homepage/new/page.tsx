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

  // Create / clean up image preview
  useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [image]);

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedImage = e.target.files?.[0];

    if (!selectedImage) return;

    setError("");

    if (!selectedImage.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // 5MB maximum
    if (selectedImage.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setImage(selectedImage);
  }

  function removeImage() {
    setImage(null);
    setImagePreview(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    if (!title.trim()) {
      setError("Please enter a title.");
      setLoading(false);
      return;
    }

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
      const fileExtension =
        image.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `${crypto.randomUUID()}.${fileExtension}`;

      // Upload image
      const { error: uploadError } = await supabase.storage
        .from("hero-images")
        .upload(fileName, image);

      if (uploadError) {
        throw uploadError;
      }

      // Create database record
      const { error: insertError } = await supabase
        .from("hero_slides")
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          reference: reference.trim() || null,
          image_url: fileName,
          display_order: Number(displayOrder),
          is_active: isActive,
        });

      if (insertError) {
        // Remove uploaded image if database insert fails
        await supabase.storage
          .from("hero-images")
          .remove([fileName]);

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
    <div className="mx-auto max-w-4xl space-y-6">

      {/* Page Header */}
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-green-900 transition hover:text-yellow-600"
        >
          <FaArrowLeft size={12} />
          Back to Homepage
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-900">
            <FaImage />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-green-950 sm:text-3xl">
              Add Hero Slide
            </h1>

            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              Create a new slide for the homepage hero.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
      >
        <div className="space-y-8 p-5 sm:p-8">

          {/* Basic Information */}
          <section>
            <div className="mb-5">
              <h2 className="text-lg font-bold text-green-950">
                Slide Content
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add the text that visitors will see on the homepage.
              </p>
            </div>

            <div className="space-y-6">

              {/* Title */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="title"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Title <span className="text-red-500">*</span>
                  </label>

                  <span className="text-xs text-gray-400">
                    {title.length}/70
                  </span>
                </div>

                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Igniting a Passion for God's Word"
                  required
                  maxLength={70}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/10"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Keep the title short enough to look good on mobile.
                </p>
              </div>

              {/* Description */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="description"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Description
                  </label>

                  <span className="text-xs text-gray-400">
                    {description.length}/150
                  </span>
                </div>

                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter the description for this hero slide..."
                  rows={4}
                  maxLength={150}
                  className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/10"
                />

                <p className="mt-2 text-xs text-gray-500">
                  A short message that supports the main title.
                </p>
              </div>

              {/* Bible Reference */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="reference"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Bible Reference
                  </label>

                  <span className="text-xs text-gray-400">
                    {reference.length}/40
                  </span>
                </div>

                <input
                  id="reference"
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="John 8:12"
                  maxLength={40}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/10"
                />
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Image */}
          <section>
            <div className="mb-5">
              <h2 className="text-lg font-bold text-green-950">
                Hero Image
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose the background image for this slide.
              </p>
            </div>

            {!imagePreview ? (
              <label
                htmlFor="hero-image"
                className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center transition hover:border-green-600 hover:bg-green-50/50"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-900">
                  <FaCloudUploadAlt size={24} />
                </div>

                <p className="mt-4 text-sm font-semibold text-gray-800">
                  Choose a hero image
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  JPG, PNG, WEBP or other image formats
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Maximum size: 5MB
                </p>

                <span className="mt-4 rounded-lg bg-green-900 px-4 py-2 text-xs font-semibold text-white">
                  Browse Files
                </span>

                <input
                  id="hero-image"
                  type="file"
                  accept="image/*"
                  required={!image}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                {/* Preview */}
                <div className="relative aspect-[16/8] bg-green-950">
                  <img
                    src={imagePreview}
                    alt="Hero image preview"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-green-900/90 px-3 py-1.5 text-xs font-semibold text-white">
                    <FaCheckCircle size={11} />
                    Ready to upload
                  </div>

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                    aria-label="Remove image"
                    title="Remove image"
                  >
                    <FaTimes size={13} />
                  </button>
                </div>

                {/* File information */}
                <div className="flex flex-col gap-3 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {image?.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {image
                        ? `${(image.size / 1024 / 1024).toFixed(2)} MB`
                        : ""}
                    </p>
                  </div>

                  <label
                    htmlFor="hero-image-replace"
                    className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg border border-green-200 px-4 py-2 text-xs font-semibold text-green-900 transition hover:bg-green-50"
                  >
                    Replace Image

                    <input
                      id="hero-image-replace"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </section>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Settings */}
          <section>
            <div className="mb-5">
              <h2 className="text-lg font-bold text-green-950">
                Slide Settings
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Control the order and visibility of this slide.
              </p>
            </div>

            <div className="space-y-6">

              {/* Display Order */}
              <div>
                <label
                  htmlFor="display-order"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Display Order
                </label>

                <input
                  id="display-order"
                  type="number"
                  min="0"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/10 sm:max-w-xs"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Lower numbers appear first. For example, 0 appears before
                  1.
                </p>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Active Slide
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Active slides are displayed on the public homepage.
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={isActive}
                  onClick={() => setIsActive((current) => !current)}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                    isActive
                      ? "bg-green-800"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                      isActive
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm leading-5 text-red-700">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 p-5 sm:flex-row sm:justify-end sm:p-6">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="min-h-11 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="min-h-11 rounded-xl bg-green-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving Slide..." : "Save Slide"}
          </button>
        </div>
      </form>
    </div>
  );
}

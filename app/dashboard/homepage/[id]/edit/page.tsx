"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  FaArrowLeft,
  FaCloudUploadAlt,
  FaImage,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  // Preview newly selected image
  useEffect(() => {
    if (!newImage) {
      setImagePreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(newImage);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [newImage]);

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

    setNewImage(selectedImage);
  }

  function removeNewImage() {
    setNewImage(null);
    setImagePreview(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);
    setError("");

    if (!title.trim()) {
      setError("Please enter a title.");
      setSaving(false);
      return;
    }

    if (Number(displayOrder) < 0) {
      setError("Display order cannot be negative.");
      setSaving(false);
      return;
    }

    try {
      let imageUrl = existingImage;
      let uploadedNewImage = "";

      // Upload new image if one was selected
      if (newImage) {
        if (!newImage.type.startsWith("image/")) {
          throw new Error("Please select a valid image file.");
        }

        if (newImage.size > 5 * 1024 * 1024) {
          throw new Error("Image must be smaller than 5MB.");
        }

        const fileExtension =
          newImage.name.split(".").pop()?.toLowerCase() || "jpg";

        const fileName = `${crypto.randomUUID()}.${fileExtension}`;

        const { error: uploadError } = await supabase.storage
          .from("hero-images")
          .upload(fileName, newImage);

        if (uploadError) {
          throw uploadError;
        }

        uploadedNewImage = fileName;
        imageUrl = fileName;
      }

      // Update database first
      const { error: updateError } = await supabase
        .from("hero_slides")
        .update({
          title: title.trim(),
          description: description.trim() || null,
          reference: reference.trim() || null,
          image_url: imageUrl,
          display_order: Number(displayOrder),
          is_active: isActive,
        })
        .eq("id", id);

      // If database update failed, clean up newly uploaded image
      if (updateError) {
        if (uploadedNewImage) {
          await supabase.storage
            .from("hero-images")
            .remove([uploadedNewImage]);
        }

        throw updateError;
      }

      // Database update succeeded, so now delete the old image
      if (newImage && existingImage) {
        const { error: deleteError } = await supabase.storage
          .from("hero-images")
          .remove([existingImage]);

        if (deleteError) {
          console.error(
            "Old image could not be deleted:",
            deleteError
          );
        }
      }

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
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-green-950 sm:text-3xl">
            Edit Hero Slide
          </h1>

          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Loading slide...
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-green-100 border-t-green-800" />

          <p className="mt-4 text-sm text-gray-500">
            Loading hero slide...
          </p>
        </div>
      </div>
    );
  }

  const currentImageUrl = existingImage
    ? supabase.storage
        .from("hero-images")
        .getPublicUrl(existingImage).data.publicUrl
    : null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
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
              Edit Hero Slide
            </h1>

            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              Update this homepage hero slide.
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
          {/* Slide Content */}
          <section>
            <div className="mb-5">
              <h2 className="text-lg font-bold text-green-950">
                Slide Content
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Update the text that visitors will see on the homepage.
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
                  maxLength={70}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/10"
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
                  maxLength={150}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/10"
                />

                <p className="mt-2 text-xs text-gray-500">
                  A short message that supports the main title.
                </p>
              </div>

              {/* Reference */}
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
                  maxLength={40}
                  placeholder="John 8:12"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/10"
                />
              </div>
            </div>
          </section>

          <div className="border-t border-gray-100" />

          {/* Hero Image */}
          <section>
            <div className="mb-5">
              <h2 className="text-lg font-bold text-green-950">
                Hero Image
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Keep the current image or replace it with a new one.
              </p>
            </div>

            {/* New image selected */}
            {imagePreview ? (
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <div className="relative aspect-[16/8] bg-green-950">
                  <img
                    src={imagePreview}
                    alt="New hero image preview"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-green-900/90 px-3 py-1.5 text-xs font-semibold text-white">
                    <FaCheckCircle size={11} />
                    New image
                  </div>

                  <button
                    type="button"
                    onClick={removeNewImage}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                    aria-label="Remove new image"
                    title="Remove new image"
                  >
                    <FaTimes size={13} />
                  </button>
                </div>

                <div className="flex flex-col gap-3 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {newImage?.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {newImage
                        ? `${(newImage.size / 1024 / 1024).toFixed(2)} MB`
                        : ""}
                    </p>
                  </div>

                  <label
                    htmlFor="hero-image-replace"
                    className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg border border-green-200 px-4 py-2 text-xs font-semibold text-green-900 transition hover:bg-green-50"
                  >
                    Choose Different Image

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
            ) : currentImageUrl ? (
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <div className="relative aspect-[16/8] bg-green-950">
                  <img
                    src={currentImageUrl}
                    alt={title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    <FaImage size={11} />
                    Current image
                  </div>
                </div>

                <div className="bg-white p-4">
                  <label
                    htmlFor="hero-image"
                    className="inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-green-200 px-4 py-3 text-sm font-semibold text-green-900 transition hover:bg-green-50 sm:w-auto"
                  >
                    <FaCloudUploadAlt size={14} />
                    Replace Image

                    <input
                      id="hero-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  <p className="mt-2 text-xs text-gray-500">
                    Maximum image size: 5MB.
                  </p>
                </div>
              </div>
            ) : (
              <label
                htmlFor="hero-image"
                className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center transition hover:border-green-600 hover:bg-green-50/50"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-900">
                  <FaCloudUploadAlt size={24} />
                </div>

                <p className="mt-4 text-sm font-semibold text-gray-800">
                  Add a hero image
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
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </section>

          <div className="border-t border-gray-100" />

          {/* Slide Settings */}
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
                    isActive ? "bg-green-800" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                      isActive ? "left-6" : "left-1"
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
            disabled={saving}
            className="min-h-11 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="min-h-11 rounded-xl bg-green-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaImages,
  FaCheckCircle,
  FaEyeSlash,
} from "react-icons/fa";

type HeroSlide = {
  id: string;
  title: string;
  description: string | null;
  reference: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
};

export default function HomepagePage() {
  const supabase = createClient();

  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadSlides() {
    setLoading(true);

    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setSlides(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadSlides();
  }, []);

  async function handleDelete(slide: HeroSlide) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${slide.title}" from the homepage?\n\nThe teaching will remain in the Creations Notebook.`
    );

    if (!confirmed) return;

    setDeletingId(slide.id);

    try {
      // Delete only the Hero Slide.
      // Do NOT delete the image from Storage because
      // the Creations Notebook may still be using it.
      const { error } = await supabase
        .from("hero_slides")
        .delete()
        .eq("id", slide.id);

      if (error) {
        console.error(error);
        alert("Could not delete the slide.");
        return;
      }

      // Because creations.hero_slide_id uses ON DELETE SET NULL,
      // the linked Creation remains safely in the Notebook.

      setSlides((currentSlides) =>
        currentSlides.filter((item) => item.id !== slide.id)
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-green-950 sm:text-3xl">
            Homepage
          </h1>

          <p className="mt-1 text-sm text-gray-600 sm:text-base">
            Manage the slides displayed in the homepage hero.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-green-100 border-t-green-800" />

          <p className="mt-4 text-sm text-gray-500">
            Loading hero slides...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-900">
            <FaImages size={16} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-green-950 sm:text-3xl">
              Homepage
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              Manage your homepage hero slides.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/homepage/new"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-green-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-950"
        >
          <FaPlus size={12} />
          Add Slide
        </Link>
      </div>

      {/* Summary */}
      {slides.length > 0 && (
        <div className="flex gap-3">
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Total
            </p>

            <p className="mt-0.5 text-xl font-bold text-green-950">
              {slides.length}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Active
            </p>

            <p className="mt-0.5 text-xl font-bold text-green-800">
              {slides.filter((slide) => slide.is_active).length}
            </p>
          </div>
        </div>
      )}

      {/* Slides */}
      {slides.length > 0 ? (
        <div className="space-y-3">
          {slides.map((slide, index) => {
            const imageUrl = slide.image_url
              ? supabase.storage
                  .from("hero-images")
                  .getPublicUrl(slide.image_url).data.publicUrl
              : null;

            const isDeleting = deletingId === slide.id;

            return (
              <div
                key={slide.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative h-36 w-full shrink-0 bg-green-950 sm:h-32 sm:w-48">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FaImages className="text-2xl text-green-300" />
                      </div>
                    )}

                    {/* Slide number */}
                    <div className="absolute left-2.5 top-2.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                      Slide {index + 1}
                    </div>

                    {/* Status */}
                    <div className="absolute right-2.5 top-2.5">
                      {slide.is_active ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-900/90 px-2.5 py-1 text-[10px] font-semibold text-white">
                          <FaCheckCircle size={9} />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white">
                          <FaEyeSlash size={9} />
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
                    <div className="min-w-0">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <h2 className="truncate text-base font-bold text-green-950">
                          {slide.title}
                        </h2>

                        <span className="shrink-0 text-xs text-gray-500">
                          Order:{" "}
                          <span className="font-semibold text-green-900">
                            {slide.display_order}
                          </span>
                        </span>
                      </div>

                      {slide.description && (
                        <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-gray-600">
                          {slide.description}
                        </p>
                      )}

                      {slide.reference && (
                        <p className="mt-2 text-xs font-semibold text-green-800">
                          {slide.reference}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                      <Link
                        href={`/dashboard/homepage/${slide.id}/edit`}
                        className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-green-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-green-950"
                      >
                        <FaEdit size={11} />
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(slide)}
                        disabled={isDeleting}
                        className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white px-3.5 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <FaTrash size={11} />
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-900">
            <FaImages size={22} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-green-950">
            No hero slides yet
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            Create your first homepage hero slide with a title, Bible
            reference, description, and background image.
          </p>

          <Link
            href="/dashboard/homepage/new"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-950"
          >
            <FaPlus size={13} />
            Add Your First Slide
          </Link>
        </div>
      )}
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

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

  // Load hero slides
  async function loadSlides() {
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

  // Delete a slide
  async function handleDelete(slide: HeroSlide) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this hero slide?"
    );

    if (!confirmed) return;

    // Delete the image from Storage
    if (slide.image_url) {
      const { error: imageError } = await supabase.storage
        .from("hero-images")
        .remove([slide.image_url]);

      if (imageError) {
        console.error("Image delete error:", imageError);
      }
    }

    // Delete the slide from the database
    const { error } = await supabase
      .from("hero_slides")
      .delete()
      .eq("id", slide.id);

    if (error) {
      console.error(error);
      alert("Could not delete the slide.");
      return;
    }

    // Remove the slide from the page
    setSlides((currentSlides) =>
      currentSlides.filter((item) => item.id !== slide.id)
    );
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Homepage
        </h1>

        <p className="mt-4 text-gray-600">
          Loading hero slides...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Homepage
          </h1>

          <p className="mt-2 text-gray-600">
            Manage the slides displayed in the homepage hero.
          </p>
        </div>

        <Link
          href="/dashboard/homepage/new"
          className="rounded-lg bg-green-700 px-5 py-3 font-medium text-white hover:bg-green-800"
        >
          + Add Slide
        </Link>
      </div>

      {/* Slides */}
      {slides.length > 0 ? (
        <div className="space-y-4">
          {slides.map((slide) => {
            const imageUrl = slide.image_url
              ? supabase.storage
                  .from("hero-images")
                  .getPublicUrl(slide.image_url).data.publicUrl
              : null;

            return (
              <div
                key={slide.id}
                className="overflow-hidden rounded-lg bg-white shadow-sm"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  {imageUrl && (
                    <div className="h-56 w-full md:h-auto md:w-64">
                      <img
                        src={imageUrl}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {slide.title}
                        </h2>

                        {slide.description && (
                          <p className="mt-2 text-gray-600">
                            {slide.description}
                          </p>
                        )}

                        {slide.reference && (
                          <p className="mt-3 text-sm font-medium text-green-800">
                            {slide.reference}
                          </p>
                        )}
                      </div>

                      {/* Status */}
                      <div className="text-right">
                        <span
                          className={`rounded-full px-3 py-1 text-sm ${
                            slide.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {slide.is_active ? "Active" : "Inactive"}
                        </span>

                        <p className="mt-2 text-sm text-gray-500">
                          Order: {slide.display_order}
                        </p>
                      </div>
                    </div>

                    {/* Edit & Delete */}
                    <div className="mt-5 flex gap-3">
                      <Link
                        href={`/dashboard/homepage/${slide.id}/edit`}
                        className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(slide)}
                        className="rounded-lg border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* No slides */
        <div className="rounded-lg bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            No hero slides yet
          </h2>

          <p className="mt-2 text-gray-500">
            Add your first homepage hero slide to get started.
          </p>
        </div>
      )}
    </div>
  );
}

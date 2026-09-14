"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type HeroSlide = {
  id: string;
  title: string;
  description: string | null;
  reference: string | null;
  imageUrl: string | null;
};

const DEFAULT_HERO_IMAGE = "/images/home/home-hero.jpg";

function truncateText(text: string | null, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength).trimEnd() + "...";
}

export default function HeroSlider({
  slides,
}: {
  slides: HeroSlide[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[currentSlide];

  // Use the uploaded image if available.
  // Otherwise use the default CABL hero image.
  const backgroundImage = slide.imageUrl || DEFAULT_HERO_IMAGE;

  return (
    <section
      className="relative h-[42vh] min-h-[330px] bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-md text-white">
            <h1 className="mb-3 text-3xl font-bold leading-tight lg:text-4xl">
              {truncateText(slide.title, 70)}
            </h1>

            <div className="mb-3 h-1 w-20 rounded-full bg-yellow-500" />

            {slide.description && (
              <p className="mb-3 text-sm leading-6 text-gray-100 lg:text-base">
                {truncateText(slide.description, 150)}
              </p>
            )}

            {slide.reference && (
              <p className="mb-4 text-sm font-medium text-yellow-400">
                — {truncateText(slide.reference, 40)}
              </p>
            )}

            <Link
              href="/about"
              className="inline-block rounded-md bg-green-800 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              LEARN MORE ABOUT US →
            </Link>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-yellow-500"
                  : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}


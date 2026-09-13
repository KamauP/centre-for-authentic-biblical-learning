"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type HeroSlide = {
  id: string;
  title: string;
  description: string | null;
  reference: string | null;
  imageUrl: string;
};

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

  return (
    <section
      className="relative h-[42vh] min-h-[330px] bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `url('${slide.imageUrl}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="max-w-md text-white">
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-3">
              {truncateText(slide.title, 70)}
            </h1>

            <div className="w-20 h-1 bg-yellow-500 rounded-full mb-3" />

            {slide.description && (
              <p className="text-sm lg:text-base leading-6 text-gray-100 mb-3">
                {truncateText(slide.description, 150)}
              </p>
            )}

            {slide.reference && (
              <p className="text-yellow-400 font-medium text-sm mb-4">
                — {truncateText(slide.reference, 40)}
              </p>
            )}

            <Link
              href="/about"
              className="inline-block bg-green-800 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-md transition"
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


"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageViewer({
  images,
  index,
  onClose,
  onPrev,
  onNext,
  albumName,
}: {
  images: any[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  albumName?: string;
}) {
  const [prevIndex, setPrevIndex] = useState(index);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Track direction changes
  useEffect(() => {
    if (index > prevIndex) {
      setDirection("right");
    } else if (index < prevIndex) {
      setDirection("left");
    }
    setPrevIndex(index);
  }, [index, prevIndex]);

  // Allow user to close with ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setDirection("left");
        onPrev();
      }
      if (e.key === "ArrowRight") {
        setDirection("right");
        onNext();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  const image = images[index];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden animate-in fade-in duration-200 p-4 sm:p-6">
      {/* Album name */}
      {albumName && (
        <div className="mb-4 sm:mb-6 text-white text-center">
          <p className="text-sm sm:text-base font-medium opacity-80 uppercase tracking-wide">
            Album
          </p>
          <h2 className="text-xl sm:text-2xl font-bold mt-1 duration-250 delay-75">
            {albumName}
          </h2>
        </div>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 cursor-pointer backdrop-blur-sm hover:scale-110 active:scale-95"
        aria-label="Fermer"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Image container with title */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
        <div
          key={index}
          className={`relative w-full h-[50vh] sm:h-[70vh] max-h-screen mb-4 sm:mb-6 rounded-lg overflow-hidden shadow-2xl animate-in fade-in duration-250 ${
            direction === "right"
              ? "slide-in-from-left-2"
              : "slide-in-from-right-2"
          }`}
        >
          <Image
            src={image.url}
            alt={image.title || "Image"}
            fill
            className="object-contain select-none"
            priority
          />
        </div>

        {/* Image title below */}
        <div
          key={`title-${index}`}
          className="text-center text-white animate-in fade-in duration-250 delay-75 mb-4 sm:mb-0"
        >
          <h2 className="text-base sm:text-lg font-semibold truncate max-w-2xl">
            {image.title || "Sans titre"}
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            {index + 1} / {images.length}
          </p>
        </div>
      </div>

      {/* Navigation buttons - desktop (sides) */}
      <button
        onClick={onPrev}
        className="hidden sm:flex absolute left-4 lg:left-6 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 cursor-pointer backdrop-blur-sm hover:scale-110 active:scale-95 items-center justify-center"
        aria-label="Image précédente"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={onNext}
        className="hidden sm:flex absolute right-4 lg:right-6 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 cursor-pointer backdrop-blur-sm hover:scale-110 active:scale-95 items-center justify-center"
        aria-label="Image suivante"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Navigation buttons - mobile (bottom) */}
      <div className="sm:hidden flex gap-4 mt-4 w-full justify-center">
        <button
          onClick={onPrev}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 cursor-pointer backdrop-blur-sm hover:scale-110 active:scale-95 flex items-center justify-center"
          aria-label="Image précédente"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 cursor-pointer backdrop-blur-sm hover:scale-110 active:scale-95 flex items-center justify-center"
          aria-label="Image suivante"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-white/40 transition-all duration-300"
          style={{ width: `${((index + 1) / images.length) * 100}%` }}
        />
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 text-white/50 text-xs flex gap-2 sm:gap-4 animate-in fade-in duration-500 delay-200 text-center">
        <span className="hidden sm:inline">← Précédent</span>
        <span className="hidden sm:inline">Suivant →</span>
        <span>ESC</span>
      </div>
    </div>
  );
}

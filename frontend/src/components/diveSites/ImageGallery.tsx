"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  media: { type: "image" | "video"; url: string }[];
  className?: string;
}

export default function ImageGallery({ media, className = "min-h-[22rem] lg:min-h-[42rem]" }: Props) {
  const [current, setCurrent] = useState(0);
  const currentMedia = media[current];
  const nextMedia = () => setCurrent((previous) => (previous + 1) % media.length);
  const previousMedia = () => setCurrent((previous) => (previous - 1 + media.length) % media.length);

  if (!currentMedia) return null;

  return (
    <div className={`relative isolate w-full overflow-hidden bg-black ${className}`}>
      {currentMedia.type === "image" ? (
        <Image
          src={currentMedia.url}
          alt={`Vista submarina ${current + 1} de ${media.length}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />
      ) : (
        <video src={currentMedia.url} controls playsInline className="absolute inset-0 h-full w-full object-cover" />
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 to-transparent" />
      <p className="absolute bottom-5 left-5 z-10 font-mono text-xs font-semibold tabular-nums text-white">
        {String(current + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}
      </p>

      {media.length > 1 ? (
        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
          <button type="button" onClick={previousMedia} aria-label="Multimedia anterior" className="grid size-12 cursor-pointer place-items-center border border-white/30 bg-black/65 text-white transition-colors hover:border-rojo hover:bg-rojo">
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button type="button" onClick={nextMedia} aria-label="Multimedia siguiente" className="grid size-12 cursor-pointer place-items-center border border-white/30 bg-black/65 text-white transition-colors hover:border-rojo hover:bg-rojo">
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}

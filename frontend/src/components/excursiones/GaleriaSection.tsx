"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, Play, X } from "lucide-react";
import { useIntl } from "react-intl";

interface GaleriaSectionProps {
  galleryImages: string[];
  galleryVideos?: string[];
  title: string;
}

type MediaItem = { type: "image" | "video"; src: string };

const cellClasses = [
  "col-span-12 row-span-2 md:col-span-7",
  "col-span-6 md:col-span-5",
  "col-span-6 md:col-span-5",
  "col-span-12",
];

export default function GaleriaSection({ galleryImages, galleryVideos = [], title }: GaleriaSectionProps) {
  const intl = useIntl();
  const translatedTitle = intl.formatMessage({ id: title });
  const closeButton = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const allMedia: MediaItem[] = [
    ...galleryImages.map((src) => ({ type: "image" as const, src })),
    ...galleryVideos.map((src) => ({ type: "video" as const, src })),
  ];
  const featured = allMedia.slice(0, 4);
  const selectedItem = selected === null ? null : allMedia[selected];

  useEffect(() => {
    if (selected === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((current) => current === null ? 0 : (current + 1) % allMedia.length);
      if (event.key === "ArrowLeft") setSelected((current) => current === null ? 0 : (current - 1 + allMedia.length) % allMedia.length);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selected, allMedia.length]);

  if (allMedia.length === 0) return null;

  const previous = () => setSelected((current) => current === null ? 0 : (current - 1 + allMedia.length) % allMedia.length);
  const next = () => setSelected((current) => current === null ? 0 : (current + 1) % allMedia.length);

  return (
    <section aria-labelledby="gallery-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="gallery-title" className="text-4xl font-bold uppercase leading-none tracking-[-.04em] text-white md:text-6xl">Galería</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/58">Imágenes reales de {translatedTitle.toLocaleLowerCase()} y del entorno del Golfo Nuevo.</p>
        </div>
        <button type="button" onClick={() => setSelected(0)} className="inline-flex min-h-12 w-fit items-center gap-3 border border-white/20 px-5 text-sm font-bold uppercase tracking-[.08em] text-white transition-colors hover:border-rojo hover:bg-rojo">
          <Images className="size-5" aria-hidden="true" />
          Ver todo ({allMedia.length})
        </button>
      </div>

      <div className="mt-10 grid auto-rows-[11rem] grid-flow-dense grid-cols-12 gap-1 md:auto-rows-[15rem]">
        {featured.map((media, index) => (
          <button
            key={`${media.src}-${index}`}
            type="button"
            onClick={() => setSelected(index)}
            className={`group relative min-h-44 overflow-hidden bg-[#15191b] text-left ${cellClasses[index]}`}
            aria-label={`Abrir ${media.type === "image" ? "imagen" : "video"} ${index + 1} de ${translatedTitle}`}
          >
            {media.type === "image" ? (
              <Image src={media.src} alt="" fill sizes="(max-width: 768px) 100vw, 70vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            ) : (
              <video src={media.src} muted playsInline preload="metadata" className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80" />
            {media.type === "video" ? <span className="absolute bottom-5 left-5 grid size-12 place-items-center bg-rojo text-white"><Play className="size-5 fill-current" aria-hidden="true" /></span> : null}
          </button>
        ))}
      </div>

      {selectedItem ? (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-[#050607]/96 p-3 md:p-8" role="dialog" aria-modal="true" aria-label={`Galería de ${translatedTitle}`} onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <div className="relative flex h-[min(88dvh,56rem)] w-full max-w-7xl items-center justify-center border border-white/12 bg-[#090b0c]">
            <button ref={closeButton} type="button" onClick={() => setSelected(null)} className="absolute right-3 top-3 z-20 grid size-12 place-items-center border border-white/20 bg-[#090b0c] text-white transition-colors hover:bg-rojo" aria-label="Cerrar galería">
              <X className="size-5" aria-hidden="true" />
            </button>
            {selectedItem.type === "image" ? (
              <div className="relative size-full">
                <Image src={selectedItem.src} alt={`${translatedTitle}, contenido ${selected! + 1}`} fill sizes="100vw" className="object-contain" />
              </div>
            ) : (
              <video src={selectedItem.src} controls autoPlay playsInline className="max-h-full max-w-full" />
            )}
            <button type="button" onClick={previous} className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-white/20 bg-[#090b0c]/90 text-white transition-colors hover:bg-rojo" aria-label="Contenido anterior">
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
            <button type="button" onClick={next} className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-white/20 bg-[#090b0c]/90 text-white transition-colors hover:bg-rojo" aria-label="Contenido siguiente">
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
            <p className="absolute bottom-3 left-3 bg-[#090b0c]/90 px-4 py-2 text-xs font-bold uppercase tracking-[.1em] text-white/70">{selected! + 1} / {allMedia.length}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, MoveRight } from "lucide-react";
import { FormattedMessage } from "react-intl";
import type { DiveSite } from "@/lib/data/ArrayDiveSites";
import { SharedDetailTransition } from "@/components/detail/SharedDetailTransition";

interface Props {
  sites: DiveSite[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  setSelectedCoords: (coords: [number, number]) => void;
  certificationFilter: string | null;
  openModal: (site: DiveSite) => void;
  modalSiteName?: string;
}

const getCardImage = (site: DiveSite) =>
  site.media.find((item) => item.type === "image")?.url ?? "/images/placeholder.jpg";

export default function DiveSitesCarousel({
  sites,
  activeIndex,
  setActiveIndex,
  setSelectedCoords,
  certificationFilter,
  openModal,
  modalSiteName,
}: Props) {
  const rail = useRef<HTMLDivElement>(null);
  const filteredSites = certificationFilter
    ? sites.filter((site) => site.certification === certificationFilter)
    : sites;

  useEffect(() => {
    if (filteredSites.length > 0 && activeIndex >= filteredSites.length) {
      setActiveIndex(0);
      setSelectedCoords(filteredSites[0].coords);
    }
  }, [activeIndex, filteredSites, setActiveIndex, setSelectedCoords]);

  const select = (site: DiveSite, index: number) => {
    setActiveIndex(index);
    setSelectedCoords(site.coords);
  };

  const scroll = (direction: -1 | 1) => {
    rail.current?.scrollBy({ left: direction * Math.min(window.innerWidth * 0.72, 540), behavior: "smooth" });
  };

  if (!filteredSites.length) {
    return <p className="border border-white/12 p-8 text-center text-white/65">No hay sitios disponibles para este filtro.</p>;
  }

  return (
    <section className="mt-12" aria-labelledby="dive-sites-rail-title">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.15em] text-rojo">{filteredSites.length} puntos</p>
          <h2 id="dive-sites-rail-title" className="mt-2 text-2xl font-bold uppercase tracking-[-.025em] text-white md:text-3xl">
            <FormattedMessage id="diveSites.explore" defaultMessage="Explorá el mapa submarino" />
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={() => scroll(-1)} aria-label="Ver sitios anteriores" className="grid size-12 cursor-pointer place-items-center border border-white/16 text-white transition-colors hover:border-rojo hover:bg-rojo">
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Ver sitios siguientes" className="grid size-12 cursor-pointer place-items-center border border-white/16 text-white transition-colors hover:border-rojo hover:bg-rojo">
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={rail}
        className="flex snap-x snap-mandatory gap-1 overflow-x-auto pb-3 [scrollbar-color:#e51b23_#171b1d] lg:min-h-[34rem]"
      >
        {filteredSites.map((site, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={site.name}
              type="button"
              data-active={active}
              aria-pressed={active}
              onMouseEnter={() => select(site, index)}
              onFocus={() => select(site, index)}
              onClick={() => {
                select(site, index);
                openModal(site);
              }}
              className="group relative min-h-[30rem] basis-[82vw] shrink-0 snap-center cursor-pointer overflow-hidden text-left transition-[flex-basis] duration-500 ease-out sm:basis-[60vw] lg:min-h-[34rem] lg:basis-28 lg:data-[active=true]:basis-[34rem]"
            >
              <SharedDetailTransition id={`dive-site-${site.name}`} role="image" enabled={modalSiteName !== site.name}>
                <div className="absolute inset-0">
                  <Image
                    src={getCardImage(site)}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 60vw, 544px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </SharedDetailTransition>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-white/68">
                  <MapPin className="size-4 text-rojo" aria-hidden />
                  {site.time} / {site.certification}
                </div>
                <SharedDetailTransition id={`dive-site-${site.name}`} role="title" enabled={modalSiteName !== site.name}>
                  <h3 className="mt-4 min-w-[15rem] max-w-md text-3xl font-bold uppercase leading-[.95] tracking-[-.035em] text-white md:text-4xl">
                    <FormattedMessage id={site.name} />
                  </h3>
                </SharedDetailTransition>
                <span className="mt-6 inline-flex min-h-11 items-center gap-3 text-xs font-bold uppercase tracking-[.11em] text-white">
                  <FormattedMessage id="diveSites.viewDetail" defaultMessage="Ver detalle" />
                  <MoveRight className="size-5 text-rojo transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

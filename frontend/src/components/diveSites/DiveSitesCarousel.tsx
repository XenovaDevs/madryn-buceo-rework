"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import type { DiveSite } from "@/lib/data/ArrayDiveSites";
import { getDetailTransitionName } from "@/components/detail/SharedDetailTransition";

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
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const filteredSites = useMemo(
    () => certificationFilter
      ? sites.filter((site) => site.certification === certificationFilter)
      : sites,
    [certificationFilter, sites],
  );

  useEffect(() => {
    if (filteredSites.length > 0 && activeIndex >= filteredSites.length) {
      setActiveIndex(0);
      setSelectedCoords(filteredSites[0].coords);
    }
  }, [activeIndex, filteredSites, setActiveIndex, setSelectedCoords]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const carousel = rail.current;
    const activeCard = cardRefs.current[activeIndex];
    if (!carousel || !activeCard) return;

    const centeredPosition = activeCard.offsetLeft - (carousel.clientWidth - activeCard.clientWidth) / 2;
    carousel.scrollTo({
      left: Math.max(0, centeredPosition),
      behavior: prefersReducedMotion || activeIndex === 0 ? "auto" : "smooth",
    });
  }, [activeIndex, filteredSites, prefersReducedMotion]);

  useEffect(() => {
    if (isPaused || modalSiteName || prefersReducedMotion || filteredSites.length < 2) return;

    const timer = window.setInterval(() => {
      const nextIndex = activeIndex >= filteredSites.length - 1 ? 0 : activeIndex + 1;
      const nextSite = filteredSites[nextIndex];
      setActiveIndex(nextIndex);
      setSelectedCoords(nextSite.coords);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [activeIndex, filteredSites, isPaused, modalSiteName, prefersReducedMotion, setActiveIndex, setSelectedCoords]);

  const select = (site: DiveSite, index: number) => {
    setActiveIndex(index);
    setSelectedCoords(site.coords);
  };

  const move = (direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + filteredSites.length) % filteredSites.length;
    select(filteredSites[nextIndex], nextIndex);
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
          <button type="button" onClick={() => move(-1)} aria-label="Ver sitios anteriores" className="grid size-12 cursor-pointer place-items-center border border-white/16 text-white transition-colors hover:border-rojo hover:bg-rojo">
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Ver sitios siguientes" className="grid size-12 cursor-pointer place-items-center border border-white/16 text-white transition-colors hover:border-rojo hover:bg-rojo">
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={rail}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
        }}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {filteredSites.map((site, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={site.name}
              ref={(element) => { cardRefs.current[index] = element; }}
              type="button"
              data-active={active}
              aria-pressed={active}
              onMouseEnter={() => select(site, index)}
              onFocus={() => select(site, index)}
              onClick={() => {
                select(site, index);
                openModal(site);
              }}
              className="group relative min-h-[29rem] basis-[84vw] shrink-0 snap-center cursor-pointer overflow-hidden border border-white/10 text-left opacity-70 transition-[opacity,border-color,transform] duration-500 ease-out hover:-translate-y-1 hover:opacity-100 data-[active=true]:border-rojo/70 data-[active=true]:opacity-100 sm:basis-[22rem] lg:min-h-[32rem] lg:basis-[24rem]"
            >
              <motion.div
                layoutId={getDetailTransitionName(`dive-site-${site.name}`, "image")}
                transition={{ layout: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
                className="absolute inset-0"
              >
                  <Image
                    src={getCardImage(site)}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 60vw, 544px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-white/68">
                  <MapPin className="size-4 text-rojo" aria-hidden />
                  {site.time} / {site.certification}
                </div>
                <motion.h3
                  layoutId={getDetailTransitionName(`dive-site-${site.name}`, "title")}
                  transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
                  className="mt-4 max-w-md text-3xl font-bold uppercase leading-[.95] tracking-[-.035em] text-white md:text-4xl"
                >
                    <FormattedMessage id={site.name} />
                </motion.h3>
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

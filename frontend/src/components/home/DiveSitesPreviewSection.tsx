"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { getDetailTransitionName } from "@/components/detail/SharedDetailTransition";
import DiveSiteModal from "@/components/diveSites/DiveSiteModal";
import { diveSites, type DiveSite } from "@/lib/data/ArrayDiveSites";

const featuredSiteNames = new Set([
  "diveSites.primavera.name",
  "diveSites.puntaCuevas.name",
  "diveSites.lasPiedras.name",
]);

const featuredSites = diveSites.filter((site) => featuredSiteNames.has(site.name));

const getSiteImage = (site: (typeof diveSites)[number]) =>
  site.media.find((item) => item.type === "image")?.url ?? "/images/placeholder.jpg";

export default function DiveSitesPreviewSection() {
  const [selectedSite, setSelectedSite] = useState<DiveSite | null>(null);

  return (
    <section className="section-space overflow-hidden border-y border-white/10 bg-[#090c0d]">
      <div className="site-container">
        <div className="max-w-5xl">
          <p className="eyebrow">
            <FormattedMessage id="diveSites.cartography" defaultMessage="Cartografía submarina" />
          </p>
          <h2 className="section-title mt-5 max-w-[22ch] text-white">
            <FormattedMessage id="home.diveSites.title" defaultMessage="Doce puntos. Un mar distinto en cada inmersión." />
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/58">
            <FormattedMessage
              id="home.diveSites.description"
              defaultMessage="Naufragios, parques naturales y arrecifes para distintos niveles. Conocé el mapa submarino de Puerto Madryn."
            />
          </p>
          <Link
            href="/buceo/puntos-de-buceo"
            className="group mt-6 inline-flex min-h-12 items-center gap-3 text-xs font-extrabold uppercase tracking-[.12em] text-white"
          >
            <FormattedMessage id="home.diveSites.button" defaultMessage="Explorar todos los puntos" />
            <ArrowUpRight className="size-4 text-rojo transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        </div>

        <LayoutGroup id="home-dive-sites">
          <motion.div
            className="mt-12 grid gap-3 lg:grid-cols-[1.2fr_.8fr] lg:grid-rows-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.14 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {featuredSites.map((site, index) => (
              <motion.div
                key={site.name}
                className={index === 0 ? "min-h-[27rem] lg:row-span-2 lg:min-h-[38rem]" : "min-h-[22rem] lg:min-h-0"}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedSite(site)}
                  className="group relative block h-full min-h-[inherit] w-full cursor-pointer overflow-hidden border border-white/10 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rojo"
                >
                  <motion.div
                    layoutId={getDetailTransitionName(`dive-site-${site.name}`, "image")}
                    transition={{ layout: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
                    className="absolute inset-0"
                  >
                  <Image
                    src={getSiteImage(site)}
                    alt=""
                    fill
                    sizes={index === 0 ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 38vw"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                  <div className={`absolute inset-x-0 bottom-0 ${index === 0 ? "p-6 sm:p-8 lg:p-10" : "p-6 sm:p-8"}`}>
                    <p className="flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-[.14em] text-white/68">
                      <MapPin className="size-4 text-rojo" aria-hidden />
                      {site.time} / {site.certification}
                    </p>
                    <div className="mt-4 flex items-end justify-between gap-6">
                      <motion.h3
                        layoutId={getDetailTransitionName(`dive-site-${site.name}`, "title")}
                        transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
                        className={`${index === 0 ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"} max-w-[14ch] font-display font-bold uppercase leading-[.92] tracking-[-.035em] text-white`}
                      >
                        <FormattedMessage id={site.name} />
                      </motion.h3>
                      <span className="grid size-11 shrink-0 place-items-center border border-white/25 text-white transition-colors group-hover:border-rojo group-hover:bg-rojo">
                        <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                      </span>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence onExitComplete={() => setSelectedSite(null)}>
            {selectedSite ? (
              <DiveSiteModal site={selectedSite} closeModal={() => setSelectedSite(null)} />
            ) : null}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}

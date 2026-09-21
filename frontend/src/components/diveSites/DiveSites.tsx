"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { diveSites } from "@/lib/data/ArrayDiveSites";
import DiveSitesCarousel from "./DiveSitesCarousel";
import DiveSiteModal from "./DiveSiteModal";
import { DiveSite } from "@/lib/data/ArrayDiveSites";
import HeroSection from "./HeroSection";
import { FormattedMessage } from "react-intl";
import ButtonRojo from "@/components/ui/button-rojo";

const DiveSitesMap = dynamic(() => import("./DiveSitesMap"), {
  ssr: false,
  loading: () => <div className="h-[380px] animate-pulse border border-white/10 bg-white/[.03] md:h-[580px]" aria-hidden />,
});

export default function DiveSitesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCoords, setSelectedCoords] = useState<[number, number]>([
    diveSites[0].coords[0],
    diveSites[0].coords[1],
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<DiveSite | null>(null);
  const [certificationFilter, setCertificationFilter] = useState<string | null>(
    null
  );
  const certifications = Array.from(new Set(diveSites.map((site) => site.certification)));

  const openModal = useCallback((site: DiveSite) => {
    setSelectedSite(site);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <main className="detail-page">
      <HeroSection
        title={<FormattedMessage id ={"diving.spots"}/>}
        heroImage={"https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/buceo/divesites_nprtbc.webp"}
        miniDescription={<FormattedMessage id ={"diving.des"}/>}
      />
      <section className="site-container py-28 md:py-36">
        <div className="mb-12">
          <h2 className="max-w-4xl text-4xl font-bold uppercase leading-[.94] tracking-[-.04em] text-white md:text-6xl">
            <FormattedMessage id="diveSites.choose" defaultMessage="Elegí tu próxima inmersión" />
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/60">
            <FormattedMessage id="diveSites.intro" defaultMessage="Explorá naufragios, parques submarinos y fondos naturales. Filtrá por certificación y abrí cada punto para conocer sus condiciones." />
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2" aria-label="Filtrar por certificación">
          {[null, ...certifications].map((certification) => {
            const active = certificationFilter === certification;
            return (
              <button
                key={certification ?? "all"}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setCertificationFilter(certification);
                  setActiveIndex(0);
                  const firstSite = certification ? diveSites.find((site) => site.certification === certification) : diveSites[0];
                  if (firstSite) setSelectedCoords(firstSite.coords);
                }}
                className={`min-h-12 cursor-pointer border px-5 text-xs font-bold uppercase tracking-[.1em] transition-colors ${active ? "border-rojo bg-rojo text-white" : "border-white/16 bg-transparent text-white/65 hover:border-white/40 hover:text-white"}`}
              >
                {certification ?? <FormattedMessage id="Todas" defaultMessage="Todas" />}
              </button>
            );
          })}
        </div>

        <LayoutGroup id="dive-sites">
          <DiveSitesMap
            selectedCoords={selectedCoords}
            sites={diveSites}
            certificationFilter={certificationFilter}
            onMarkerClick={openModal}
          />
          <DiveSitesCarousel
            sites={diveSites}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setSelectedCoords={setSelectedCoords}
            certificationFilter={certificationFilter}
            openModal={openModal}
            modalSiteName={isModalOpen ? selectedSite?.name : undefined}
          />
          <AnimatePresence onExitComplete={() => setSelectedSite(null)}>
            {selectedSite && isModalOpen ? (
              <DiveSiteModal
                key={selectedSite.name}
                site={selectedSite}
                closeModal={closeModal}
              />
            ) : null}
          </AnimatePresence>
        </LayoutGroup>
        <div className="mt-20 grid gap-8 border-t border-white/12 pt-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <h2 className="max-w-3xl text-3xl font-bold uppercase leading-[.95] tracking-[-.035em] text-white md:text-5xl">
            <FormattedMessage id="diveSites.cta" defaultMessage="Tu próxima historia empieza bajo el mar" />
          </h2>
          <ButtonRojo texto={<FormattedMessage id="requestInfo" defaultMessage="Consultar salida" />} href="/contacto" />
        </div>
      </section>
    </main>
  );
}

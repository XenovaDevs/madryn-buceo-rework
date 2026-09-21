"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { LocateFixed, MapPin, MoveUpRight } from "lucide-react";
import { MapContainer, Marker, ScaleControl, TileLayer, Tooltip, ZoomControl, useMap } from "react-leaflet";
import { createDiveSiteIcon } from "@/components/ui/customIcon";
import type { DiveSite } from "@/lib/data/ArrayDiveSites";
import "leaflet/dist/leaflet.css";
import { motion, useReducedMotion } from "framer-motion";
import L from "leaflet";
import { FormattedMessage, useIntl } from "react-intl";

interface Props {
  selectedCoords: [number, number];
  sites: DiveSite[];
  certificationFilter: string | null;
  onSiteSelect: (site: DiveSite) => void;
  onOpenSite: (site: DiveSite) => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function MapViewport({ coords, reduceMotion }: { coords: [number, number]; reduceMotion: boolean }) {
  const map = useMap();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (reduceMotion) {
      map.setView(coords, Math.max(map.getZoom(), 13), { animate: false });
      return;
    }

    map.flyTo(coords, Math.max(map.getZoom(), 13), {
      animate: true,
      duration: 1.15,
      easeLinearity: 0.22,
    });

    return () => {
      map.stop();
    };
  }, [coords, map, reduceMotion]);

  return null;
}

const DiveSitesMap: React.FC<Props> = ({
  selectedCoords,
  sites,
  certificationFilter,
  onSiteSelect,
  onOpenSite,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const intl = useIntl();

  useEffect(() => {
    const timer = window.setTimeout(() => mapRef.current?.invalidateSize(), 100);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredSites = useMemo(
    () => certificationFilter
      ? sites.filter((site) => site.certification === certificationFilter)
      : sites,
    [certificationFilter, sites],
  );
  const activeSite = filteredSites.find(
    (site) => site.coords[0] === selectedCoords[0] && site.coords[1] === selectedCoords[1],
  ) ?? filteredSites[0];

  const fitVisibleSites = () => {
    if (!mapRef.current || !filteredSites.length) return;

    const bounds = L.latLngBounds(filteredSites.map((site) => site.coords));
    mapRef.current.fitBounds(bounds, {
      animate: !reduceMotion,
      duration: reduceMotion ? 0 : 0.8,
      maxZoom: 13,
      paddingTopLeft: [44, 72],
      paddingBottomRight: [44, 180],
    });
  };

  return (
    <motion.section
      className="mb-1"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <div className="relative isolate z-0 h-[34rem] overflow-hidden border border-white/14 bg-[#071014] md:h-[38rem]">
        <MapContainer
          center={[-42.772, -65.005]}
          zoom={12}
          minZoom={10}
          maxZoom={17}
          zoomControl={false}
          scrollWheelZoom={false}
          className="dive-map"
          style={{ width: "100%", height: "100%", background: "#071014" }}
          dragging={true}
          ref={mapRef}
        >
          <MapViewport coords={selectedCoords} reduceMotion={reduceMotion} />
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='© <a href="https://www.esri.com/">Esri</a>'
          />
          <ZoomControl position="topright" />
          <ScaleControl position="bottomright" imperial={false} />
          {filteredSites.map((site) => {
            const sourceIndex = sites.indexOf(site);
            const active = site.name === activeSite?.name;

            return (
              <Marker
                key={site.name}
                position={site.coords}
                icon={createDiveSiteIcon(sourceIndex, site.certification, active)}
                riseOnHover
                title={intl.formatMessage({ id: site.name })}
                eventHandlers={{ click: () => onSiteSelect(site) }}
              >
                <Tooltip
                  key={`${site.name}-${active ? "active" : "idle"}`}
                  direction="top"
                  opacity={1}
                  permanent={active}
                  className="leaflet-tooltip-custom"
                >
                  <span className="block text-[.6rem] font-bold uppercase tracking-[.12em] text-rojo">
                    {site.time} / {site.certification}
                  </span>
                  <strong className="mt-1 block font-display text-base uppercase leading-none text-white">
                    <FormattedMessage id={site.name} />
                  </strong>
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>

        <div className="pointer-events-none absolute inset-0 z-[700] bg-[linear-gradient(180deg,rgba(3,8,10,.42),transparent_24%,transparent_68%,rgba(3,8,10,.42))]" aria-hidden />

        <div className="pointer-events-none absolute left-3 top-3 z-[800] border border-white/14 bg-[#090d0f]/92 px-4 py-3 backdrop-blur-sm sm:left-5 sm:top-5 sm:px-5">
          <p className="text-[.58rem] font-bold uppercase tracking-[.16em] text-rojo">
            <FormattedMessage id="diveSites.map.chart" defaultMessage="Carta de inmersiones" />
          </p>
          <div className="mt-1 flex items-baseline gap-3">
            <p className="font-display text-xl font-bold uppercase text-white sm:text-2xl">
              <FormattedMessage id="diveSites.map.area" defaultMessage="Golfo Nuevo" />
            </p>
            <p className="hidden text-[.62rem] font-bold uppercase tracking-[.12em] text-white/42 sm:block">
              <FormattedMessage id="diveSites.map.count" values={{ count: filteredSites.length }} defaultMessage="{count} puntos cartografiados" />
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fitVisibleSites}
          className="absolute right-[3.9rem] top-3 z-[1100] grid size-9 cursor-pointer place-items-center border border-white/25 bg-[#090d0f]/92 text-white transition-colors hover:border-rojo hover:bg-rojo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rojo sm:right-[4.4rem] sm:top-5 sm:size-10"
          aria-label={intl.formatMessage({ id: "diveSites.map.recenter", defaultMessage: "Ver todos los puntos" })}
          title={intl.formatMessage({ id: "diveSites.map.recenter", defaultMessage: "Ver todos los puntos" })}
        >
          <LocateFixed className="size-4" aria-hidden />
        </button>

        {activeSite ? (
          <div className="absolute inset-x-3 bottom-3 z-[900] border border-white/14 bg-[#090d0f]/94 p-4 backdrop-blur-md sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[25rem] sm:p-5" aria-live="polite">
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center border border-rojo/60 font-display text-sm font-bold text-white">
                {String(sites.indexOf(activeSite) + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[.58rem] font-bold uppercase tracking-[.15em] text-rojo">
                  <FormattedMessage id="diveSites.map.selected" defaultMessage="Punto seleccionado" />
                </p>
                <h3 className="mt-1 truncate font-display text-2xl font-bold uppercase leading-none text-white sm:text-3xl">
                  <FormattedMessage id={activeSite.name} />
                </h3>
              </div>
              <MapPin className="size-5 shrink-0 text-rojo" strokeWidth={1.7} aria-hidden />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-px bg-white/10">
              <div className="bg-[#0d1113] px-3 py-2.5">
                <span className="block text-[.52rem] font-bold uppercase tracking-[.13em] text-white/35"><FormattedMessage id="depth" /></span>
                <strong className="mt-1 block text-xs text-white"><FormattedMessage id={activeSite.depth} /></strong>
              </div>
              <div className="bg-[#0d1113] px-3 py-2.5">
                <span className="block text-[.52rem] font-bold uppercase tracking-[.13em] text-white/35"><FormattedMessage id="diveSite.time" /></span>
                <strong className="mt-1 block text-xs text-white">{activeSite.time}</strong>
              </div>
              <button
                type="button"
                onClick={() => onOpenSite(activeSite)}
                className="group flex cursor-pointer items-center justify-center gap-2 bg-rojo px-3 text-[.58rem] font-bold uppercase tracking-[.1em] text-white transition-colors hover:bg-[#c81720] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <FormattedMessage id="diveSites.map.open" defaultMessage="Abrir ficha" />
                <MoveUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </motion.section>
  );
};

export default DiveSitesMap;

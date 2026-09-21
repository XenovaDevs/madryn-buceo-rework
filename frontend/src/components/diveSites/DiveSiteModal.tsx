"use client";

import { useEffect, useRef } from "react";
import { BadgeCheck, Gauge, MapPinned, Ruler, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import type { DiveSite } from "@/lib/data/ArrayDiveSites";
import ButtonRojo from "@/components/ui/button-rojo";
import ImageGallery from "./ImageGallery";
import { getDetailTransitionName } from "@/components/detail/SharedDetailTransition";

interface DiveSiteModalProps {
  site: DiveSite;
  closeModal: () => void;
}

export default function DiveSiteModal({ site, closeModal }: DiveSiteModalProps) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal]);

  const transitionId = `dive-site-${site.name}`;
  const layoutTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
          className="fixed inset-0 z-[2000] grid place-items-center overflow-y-auto p-3 md:p-8"
        >
            <motion.button
              type="button"
              aria-label="Cerrar detalle"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 cursor-default bg-black/84 backdrop-blur-sm"
            />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dive-site-title"
            initial={{ opacity: 0.92 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.92 }}
            className="relative z-10 my-auto w-full max-w-7xl overflow-hidden border border-white/14 bg-[#0d1011]"
          >
            <button
              ref={closeButton}
              type="button"
              onClick={closeModal}
              aria-label="Cerrar detalle"
              className="absolute right-3 top-3 z-20 grid size-12 cursor-pointer place-items-center border border-white/25 bg-black/75 text-white transition-colors hover:border-rojo hover:bg-rojo md:right-5 md:top-5"
            >
              <X className="size-5" aria-hidden />
            </button>

            <div className="grid lg:grid-cols-[1.55fr_.8fr]">
              <motion.div
                layoutId={getDetailTransitionName(transitionId, "image")}
                transition={{ layout: layoutTransition }}
                className="relative overflow-hidden"
              >
                <ImageGallery media={site.media} />
              </motion.div>

              <div className="flex flex-col justify-between p-7 md:p-10 lg:p-12">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.15em] text-rojo">
                    <FormattedMessage id="diveSites.detailLabel" defaultMessage="Ficha de inmersión" />
                  </p>
                  <motion.h2
                    layoutId={getDetailTransitionName(transitionId, "title")}
                    transition={{ layout: layoutTransition }}
                    id="dive-site-title"
                    className="mt-5 text-4xl font-bold uppercase leading-[.92] tracking-[-.04em] text-white md:text-5xl"
                  >
                      <FormattedMessage id={site.name} />
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.18, duration: prefersReducedMotion ? 0 : 0.3 }}
                    className="mt-7 text-base leading-8 text-white/65"
                  >
                      <FormattedMessage id={site.description} />
                  </motion.p>

                  <dl className="mt-10 grid grid-cols-2 gap-px bg-white/10">
                    {[
                      [Gauge, "diveSite.difficulty", site.difficulty, true],
                      [Ruler, "depth", site.depth, true],
                      [BadgeCheck, "certification", site.certification, false],
                      [MapPinned, "diveSite.time", site.time, false],
                    ].map(([Icon, label, value, translated]) => {
                      const FactIcon = Icon as typeof Gauge;
                      return (
                        <div key={String(label)} className="min-h-32 bg-[#111416] p-5">
                          <FactIcon className="size-5 text-rojo" strokeWidth={1.8} aria-hidden />
                          <dt className="mt-4 text-[.67rem] font-bold uppercase tracking-[.13em] text-white/40"><FormattedMessage id={String(label)} /></dt>
                          <dd className="mt-1 text-sm font-semibold text-white">{translated ? <FormattedMessage id={String(value)} /> : String(value)}</dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>

                <div className="mt-9">
                  <ButtonRojo texto={<FormattedMessage id="requestInfo" defaultMessage="Consultar salida" />} href="/contacto" fullWidth />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
  );
}

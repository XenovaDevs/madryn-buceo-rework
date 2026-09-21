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
            className="relative z-10 my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl overflow-y-auto border border-white/14 bg-[#0d1011] lg:overflow-hidden"
          >
            <button
              ref={closeButton}
              type="button"
              onClick={closeModal}
              aria-label="Cerrar detalle"
              className="absolute right-3 top-3 z-20 grid size-10 cursor-pointer place-items-center border border-white/25 bg-black/75 text-white transition-colors hover:border-rojo hover:bg-rojo md:right-4 md:top-4"
            >
              <X className="size-5" aria-hidden />
            </button>

            <div className="grid lg:grid-cols-[1.4fr_.85fr]">
              <motion.div
                layoutId={getDetailTransitionName(transitionId, "image")}
                transition={{ layout: layoutTransition }}
                className="relative min-h-[18rem] overflow-hidden sm:min-h-[24rem] lg:min-h-0"
              >
                <ImageGallery media={site.media} className="h-full min-h-[18rem] sm:min-h-[24rem] lg:min-h-[34rem]" />
              </motion.div>

              <div className="flex flex-col justify-between p-6 md:p-8 lg:p-9">
                <div>
                  <p className="text-[.68rem] font-bold uppercase tracking-[.15em] text-rojo">
                    <FormattedMessage id="diveSites.detailLabel" defaultMessage="Ficha de inmersión" />
                  </p>
                  <motion.h2
                    layoutId={getDetailTransitionName(transitionId, "title")}
                    transition={{ layout: layoutTransition }}
                    id="dive-site-title"
                    className="mt-3 max-w-[15ch] text-3xl font-bold uppercase leading-[.94] tracking-[-.035em] text-white md:text-4xl lg:text-[2.6rem]"
                  >
                      <FormattedMessage id={site.name} />
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.18, duration: prefersReducedMotion ? 0 : 0.3 }}
                    className="mt-5 max-w-[38ch] text-sm leading-7 text-white/65"
                  >
                      <FormattedMessage id={site.description} />
                  </motion.p>

                  <dl className="mt-7 grid grid-cols-2 gap-px bg-white/10">
                    {[
                      [Gauge, "diveSite.difficulty", site.difficulty, true],
                      [Ruler, "depth", site.depth, true],
                      [BadgeCheck, "certification", site.certification, false],
                      [MapPinned, "diveSite.time", site.time, false],
                    ].map(([Icon, label, value, translated]) => {
                      const FactIcon = Icon as typeof Gauge;
                      return (
                        <div key={String(label)} className="min-h-24 bg-[#111416] p-4">
                          <FactIcon className="size-4 text-rojo" strokeWidth={1.8} aria-hidden />
                          <dt className="mt-3 text-[.6rem] font-bold uppercase tracking-[.13em] text-white/40"><FormattedMessage id={String(label)} /></dt>
                          <dd className="mt-1 text-sm font-semibold text-white">{translated ? <FormattedMessage id={String(value)} /> : String(value)}</dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>

                <div className="mt-6">
                  <ButtonRojo texto={<FormattedMessage id="requestInfo" defaultMessage="Consultar salida" />} href="/contacto" fullWidth />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
  );
}

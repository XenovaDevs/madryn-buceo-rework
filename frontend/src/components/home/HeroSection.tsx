"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

const VIDEO =
  "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/videos/inicio/video1--optimizado_ope7xh.mp4";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(min-width: 768px)").matches) return;
    const timer = window.setTimeout(() => setVideoReady(true), 1200);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <section className="relative isolate min-h-[calc(100dvh-5.25rem)] overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 -z-20">
        <Image
          src="https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/inicio/bautismo_fizpfd.jpg"
          alt="Buceador explorando el Golfo Nuevo"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {videoReady ? (
          <video autoPlay loop muted playsInline preload="none" aria-hidden="true" className="absolute inset-0 size-full object-cover">
            <source src={VIDEO} type="video/mp4" />
          </video>
        ) : null}
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,6,7,.92)_0%,rgba(4,6,7,.63)_48%,rgba(4,6,7,.12)_80%),linear-gradient(0deg,rgba(4,6,7,.78)_0%,transparent_45%)]" />

      <div className="site-container grid min-h-[calc(100dvh-5.25rem)] items-end gap-10 pb-10 pt-20 md:pb-14 lg:grid-cols-[1fr_auto] lg:items-center lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Capital nacional del buceo</p>
          <h1 className="display-title mt-6 text-white">
            <span className="block">Patagonia</span>
            <span className="block text-rojo">bajo el mar</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/72 md:text-lg md:leading-8">
            <FormattedMessage id="home.hero.description" /> Más de cuatro décadas guiando encuentros reales con la vida del Golfo Nuevo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://madrynbuceo.outtrip.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-13 items-center gap-3 bg-rojo px-6 text-sm font-extrabold uppercase tracking-[.1em] text-white transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[#f02b2b]"
            >
              Reservar experiencia
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link
              href="/cursos/padi"
              className="inline-flex min-h-13 items-center border border-white/25 bg-black/20 px-6 text-sm font-extrabold uppercase tracking-[.1em] text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/10"
            >
              Cursos PADI
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 border-y border-white/20 bg-black/20 text-white backdrop-blur-sm lg:w-44 lg:grid-cols-1 lg:border-x lg:border-y-0"
          initial={{ opacity: 0, x: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
        >
          {[
            ["1983", "Desde"],
            ["PADI", "Centro oficial"],
            ["365", "Días de mar"],
          ].map(([value, label]) => (
            <div key={label} className="border-white/15 px-3 py-4 text-center [&:not(:last-child)]:border-r lg:px-5 lg:py-6 lg:[&:not(:last-child)]:border-b lg:[&:not(:last-child)]:border-r-0">
              <strong className="block font-display text-2xl font-extrabold uppercase leading-none md:text-3xl">{value}</strong>
              <span className="mt-1.5 block text-[.58rem] font-bold uppercase tracking-[.15em] text-white/48">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => document.getElementById("actividades")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[.62rem] font-bold uppercase tracking-[.18em] text-white/55 transition-colors hover:text-white md:flex"
      >
        Explorar <ArrowDown className="size-4 animate-drift" />
      </button>
    </section>
  );
}

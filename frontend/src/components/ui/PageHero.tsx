"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  image: string;
  alt: string;
  eyebrow?: ReactNode;
  action?: ReactNode;
  immersive?: boolean;
  contentId?: string;
}

export default function PageHero({
  title,
  subtitle,
  image,
  alt,
  eyebrow = "Puerto Madryn · Patagonia",
  action,
  immersive = false,
  contentId,
}: PageHeroProps) {
  return (
    <section className={`relative isolate overflow-hidden border-b border-white/10 ${immersive ? "min-h-[76dvh]" : "min-h-[56dvh]"}`}>
      <Image src={image} alt={alt} fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,6,7,.92)_0%,rgba(4,6,7,.62)_54%,rgba(4,6,7,.32)_100%),linear-gradient(0deg,rgba(4,6,7,.72),transparent_58%)]" />

      <div className={`site-container flex items-end py-14 md:py-20 ${immersive ? "min-h-[76dvh]" : "min-h-[56dvh]"}`}>
        <motion.div className="w-full" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <p className="eyebrow">{eyebrow}</p>
          <div className="mt-5 grid items-end gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,.65fr)] lg:gap-16">
            <h1 className="max-w-[11ch] font-display text-[clamp(3.75rem,8vw,8rem)] font-extrabold uppercase leading-[.86] tracking-[-.05em] text-white">{title}</h1>
            {subtitle || action ? (
              <div className="max-w-xl border-l border-white/25 pl-6 lg:mb-2 lg:pl-8">
                {subtitle ? <p className="text-base leading-8 text-white/75 md:text-lg">{subtitle}</p> : null}
                {action ? <div className="mt-7">{action}</div> : null}
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>

      {contentId ? (
        <button type="button" onClick={() => document.getElementById(contentId)?.scrollIntoView({ behavior: "smooth" })} className="absolute bottom-0 right-0 hidden min-h-12 border-l border-t border-white/20 bg-black/30 px-6 text-[.62rem] font-bold uppercase tracking-[.18em] text-white/65 backdrop-blur-md hover:text-white md:block">
          Seguir explorando ↓
        </button>
      ) : null}
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SharedDetailTransition } from "@/components/detail/SharedDetailTransition";

interface DetailHeroProps {
  title: ReactNode;
  subtitle: ReactNode;
  image: string;
  alt: string;
  parentHref: string;
  parentLabel: ReactNode;
  actionHref?: string;
  actionLabel?: ReactNode;
  transitionId?: string;
}

export default function DetailHero({
  title,
  subtitle,
  image,
  alt,
  parentHref,
  parentLabel,
  actionHref,
  actionLabel,
  transitionId,
}: DetailHeroProps) {
  const external = actionHref?.startsWith("http");

  return (
    <section className="relative isolate min-h-[calc(100dvh-5.25rem)] overflow-hidden border-b border-white/10 bg-[#090b0c]">
      <div className="absolute inset-0 -z-20">
        <SharedDetailTransition id={transitionId} role="image">
          <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
        </SharedDetailTransition>
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,11,12,.76)_0%,rgba(9,11,12,.42)_38%,rgba(9,11,12,.12)_70%,rgba(9,11,12,.04)_100%),linear-gradient(0deg,rgba(9,11,12,.68)_0%,rgba(9,11,12,.12)_48%,transparent_72%)]" />

      <div className="site-container grid min-h-[calc(100dvh-5.25rem)] content-end gap-10 pb-14 pt-16 md:pb-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,.55fr)] lg:items-end lg:gap-20">
        <div>
          <Link href={parentHref} className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-white/65 transition-colors hover:text-white">
            <ArrowLeft className="size-4 text-rojo" aria-hidden="true" />
            {parentLabel}
          </Link>
          <SharedDetailTransition id={transitionId} role="title">
            <h1 className="mt-6 max-w-6xl text-[clamp(2.75rem,4.7vw,5rem)] font-extrabold uppercase leading-[.88] tracking-[-.052em] text-white">{title}</h1>
          </SharedDetailTransition>
        </div>

        <div className="border-l border-white/25 pl-6 lg:mb-1 lg:pl-8">
          <SharedDetailTransition id={transitionId} role="description">
            <p className="max-w-lg text-base leading-8 text-white/76 md:text-lg">{subtitle}</p>
          </SharedDetailTransition>
          {actionHref && actionLabel ? (
            <a
              href={actionHref}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group mt-7 inline-flex min-h-12 items-center gap-3 whitespace-nowrap bg-rojo px-6 text-sm font-extrabold uppercase tracking-[.08em] text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#f02b2b] active:translate-y-0"
            >
              {actionLabel}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

"use client";

import type { ReactNode } from "react";
import { Anchor, Award, Clock } from "lucide-react";
import { FormattedMessage } from "react-intl";
import DetailHero from "@/components/detail/DetailHero";

interface CursoIntroSectionProps {
  title: ReactNode;
  shortDescription: ReactNode;
  certification?: ReactNode;
  duration?: ReactNode;
  depth?: ReactNode;
  cardImage: string;
  level: ReactNode;
  slug: string;
}

export default function CursoIntroSection({ title, shortDescription, certification, duration, depth, cardImage, level, slug }: CursoIntroSectionProps) {
  const facts = [
    duration ? { id: "duration", icon: Clock, label: <FormattedMessage id="time" defaultMessage="Duración" />, value: duration } : null,
    depth ? { id: "depth", icon: Anchor, label: <FormattedMessage id="depth" defaultMessage="Profundidad" />, value: depth } : null,
    certification ? { id: "certification", icon: Award, label: <FormattedMessage id="certification" defaultMessage="Certificación" />, value: certification } : null,
  ].filter(Boolean) as { id: string; icon: typeof Clock; label: ReactNode; value: ReactNode }[];

  return (
    <>
      <DetailHero
        title={title}
        subtitle={shortDescription}
        image={cardImage}
        alt="Curso de buceo PADI en Puerto Madryn"
        parentHref="/cursos/padi"
        parentLabel={<FormattedMessage id="nav.courses" defaultMessage="Cursos PADI" />}
        actionHref="/contacto"
        actionLabel={<FormattedMessage id="requestInfo" defaultMessage="Consultar curso" />}
        transitionId={`course-${slug}`}
      />

      <section className="border-b border-white/10 bg-[#111416]">
        <div className="site-container grid gap-px bg-white/10 md:grid-cols-4">
          <div className="flex min-h-28 items-center bg-[#111416] px-6 py-6">
            <p className="text-xs font-extrabold uppercase tracking-[.13em] text-rojo">{level}</p>
          </div>
          {facts.map(({ id, icon: Icon, label, value }) => (
            <div key={id} className="grid min-h-28 grid-cols-[auto_1fr] items-center gap-4 bg-[#111416] px-6 py-6">
              <Icon className="size-5 text-rojo" strokeWidth={1.8} aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[.1em] text-white/40">{label}</p>
                <p className="mt-1 text-base font-semibold text-white">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

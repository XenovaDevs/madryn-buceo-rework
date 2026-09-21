"use client";

import { Award, Anchor, Check, Clock } from "lucide-react";
import { FormattedMessage } from "react-intl";
import ButtonRojo from "../ui/button-rojo";

interface CourseDetailsProps {
  duration?: string;
  depth?: string;
  certification?: string;
  requirements?: string[];
  slug?: string;
}

export default function CourseDetails({ duration, depth, certification, requirements, slug }: CourseDetailsProps) {
  const facts = [
    duration ? { icon: Clock, label: "time", value: duration } : null,
    depth ? { icon: Anchor, label: "depth", value: depth } : null,
    certification ? { icon: Award, label: "certification", value: certification } : null,
  ].filter(Boolean) as { icon: typeof Clock; label: string; value: string }[];

  return (
    <section className="detail-chapter grid overflow-hidden lg:grid-cols-[1.05fr_.95fr]">
      <div className="p-7 md:p-12 lg:p-16">
        <h2 className="max-w-xl text-4xl font-bold uppercase leading-[.92] tracking-[-.04em] text-white md:text-6xl">
          <FormattedMessage
            id={slug === "discover-scuba-diving" ? "courseDetails.title.program" : "courseDetails.title.course"}
            defaultMessage={slug === "discover-scuba-diving" ? "Detalles del programa" : "Detalles del curso"}
          />
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="border-l border-white/15 pl-5">
              <Icon className="size-6 text-rojo" strokeWidth={1.8} aria-hidden="true" />
              <p className="mt-5 text-xs font-bold uppercase tracking-[.1em] text-white/40"><FormattedMessage id={label} /></p>
              <p className="mt-2 text-lg font-semibold text-white"><FormattedMessage id={value} defaultMessage="Consultar" /></p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between border-t border-white/10 bg-[#0d1011] p-7 md:p-12 lg:border-l lg:border-t-0 lg:p-16">
        <div>
          <h3 className="text-2xl font-bold uppercase text-white"><FormattedMessage id="requirements" defaultMessage="Requisitos" /></h3>
          {requirements?.length ? (
            <div className="mt-7 space-y-5">
              {requirements.map((requirement) => (
                <p key={requirement} className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-7 text-white/65">
                  <Check className="mt-1 size-4 text-rojo" aria-hidden="true" />
                  <FormattedMessage id={requirement} defaultMessage="Consultar" />
                </p>
              ))}
            </div>
          ) : <p className="mt-6 text-white/60"><FormattedMessage id="courseDetails.consult" defaultMessage="Consultar" /></p>}
        </div>
        <div className="mt-10">
          <ButtonRojo texto={<FormattedMessage id="requestInfo" defaultMessage="Consultar curso" />} fullWidth href="/contacto" />
        </div>
      </div>
    </section>
  );
}

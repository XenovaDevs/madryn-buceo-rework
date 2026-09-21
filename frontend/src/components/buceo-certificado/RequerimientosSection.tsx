"use client";

import { BadgeCheck, Calendar, HeartPulse, Thermometer } from "lucide-react";
import { FormattedMessage } from "react-intl";

const items = [
  ["diveCertification.requirements.text1.title", "diveCertification.requirements.text1.text", Calendar],
  ["diveCertification.requirements.text2.title", "diveCertification.requirements.text2.text", Thermometer],
  ["diveCertification.requirements.text3.title", "diveCertification.requirements.text3.text", BadgeCheck],
  ["diveCertification.requirements.text4.title", "diveCertification.requirements.text4.text", HeartPulse],
] as const;

export default function RequerimientosSection() {
  return (
    <section className="detail-chapter p-7 md:p-10 lg:p-12">
      <h2 className="max-w-4xl text-3xl font-bold uppercase leading-[.95] tracking-[-.035em] text-white md:text-5xl">
        <FormattedMessage id="diveCertification.requirements.title" />
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {items.map(([title, description, Icon]) => (
          <article key={title} className="border-l border-white/15 pl-5">
            <Icon className="size-6 text-rojo" strokeWidth={1.8} aria-hidden="true" />
            <h3 className="mt-5 text-xl font-bold text-white"><FormattedMessage id={title} /></h3>
            <p className="mt-3 text-sm leading-7 text-white/60"><FormattedMessage id={description} /></p>
          </article>
        ))}
      </div>
    </section>
  );
}

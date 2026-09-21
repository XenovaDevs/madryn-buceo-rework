"use client";

import { Anchor, Clock, LifeBuoy, Ship, Speech } from "lucide-react";
import { FormattedMessage } from "react-intl";

const items = [
  ["diveCertification.whatToExpect.text1.title", "diveCertification.whatToExpect.text1.text", LifeBuoy],
  ["diveCertification.whatToExpect.text2.title", "diveCertification.whatToExpect.text2.text", Speech],
  ["diveCertification.whatToExpect.text3.title", "diveCertification.whatToExpect.text3.text", Anchor],
  ["diveCertification.whatToExpect.text4.title", "diveCertification.whatToExpect.text4.text", Ship],
  ["diveCertification.whatToExpect.text5.title", "diveCertification.whatToExpect.text5.text", Clock],
] as const;

export default function QueEsperarSection() {
  return (
    <section className="detail-chapter p-7 md:p-10 lg:p-12">
      <h2 className="max-w-4xl text-3xl font-bold uppercase leading-[.95] tracking-[-.035em] text-white md:text-5xl">
        <FormattedMessage id="diveCertification.whatToExpect.title" />
      </h2>
      <div className="mt-10 grid gap-x-14 md:grid-cols-2">
        {items.map(([title, description, Icon]) => (
          <article key={title} className="grid grid-cols-[auto_1fr] gap-4 border-t border-white/12 py-7">
            <Icon className="mt-1 size-5 text-rojo" strokeWidth={1.8} aria-hidden="true" />
            <div>
              <h3 className="text-lg font-bold text-white"><FormattedMessage id={title} /></h3>
              <p className="mt-2 text-sm leading-7 text-white/60"><FormattedMessage id={description} /></p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

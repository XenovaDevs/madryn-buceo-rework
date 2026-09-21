"use client";

import type { Excursion } from "@/lib/data/Excursiones";
import { Anchor, BookOpen, Clock, Fish, Ship, Shirt, Users, Waves } from "lucide-react";
import { FormattedMessage } from "react-intl";

const icons = [Shirt, BookOpen, Ship, Waves, Fish, Anchor, Clock, Users];

export default function QueEsperarSection({ excursion }: { excursion: Excursion }) {
  return (
    <section id="que-esperar" className="detail-chapter scroll-mt-28 p-7 md:p-10 lg:p-12">
      <h2 className="max-w-3xl text-3xl font-bold uppercase leading-[.95] tracking-[-.035em] text-white md:text-5xl">
        <FormattedMessage id="queEsperarSection.title" />
      </h2>

      <div className="mt-10 grid gap-x-14 gap-y-0 md:grid-cols-2">
        {excursion.whatToExpect.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article key={item.title} className="grid grid-cols-[auto_1fr] gap-4 border-t border-white/12 py-7">
              <Icon className="mt-1 size-5 text-rojo" strokeWidth={1.8} aria-hidden="true" />
              <div>
                <h3 className="text-lg font-bold text-white"><FormattedMessage id={item.title} /></h3>
                <p className="mt-2 text-sm leading-7 text-white/60"><FormattedMessage id={item.description} /></p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

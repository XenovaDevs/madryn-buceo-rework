"use client";

import Image from "next/image";
import { FormattedMessage } from "react-intl";
import type { Staff } from "@/lib/data/Staff";

export default function StaffCarousel({ staff }: { staff: Staff[] }) {
  return (
    <section className="section-space border-t border-white/10 bg-[#111416]">
      <div className="site-container">
        <p className="eyebrow">Quienes te acompañan</p>
        <h2 className="section-title mt-5 text-white"><FormattedMessage id="our.team" defaultMessage="Nuestro equipo" /></h2>

        <div className="mt-12 grid items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member, index) => (
            <article key={member.name} className="group h-full border border-white/10 bg-[#111416]">
              <div className="relative aspect-[4/4.5] overflow-hidden">
                <Image src={member.media.url} alt={member.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover grayscale-[20%] transition duration-500 group-hover:scale-[1.025] group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 text-[.6rem] font-bold uppercase tracking-[.18em] text-white/60">Equipo · 0{index + 1}</span>
                <h3 className="absolute bottom-5 left-5 right-5 font-display text-3xl font-bold uppercase text-white">{member.name}</h3>
              </div>
              <p className="min-h-32 p-6 text-sm leading-7 text-white/55"><FormattedMessage id={member.description} /></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Calendar, Activity, Heart, ArrowRight, Info } from "lucide-react";
import type { Excursion } from "@/lib/data/Excursiones";
import Image from "next/image";
import { FormattedMessage } from "react-intl";

interface RequerimientosSectionProps {
  excursion: Excursion;
}

export default function RequirementsSection({
  excursion,
}: RequerimientosSectionProps) {
  if (!excursion.requirements || excursion.requirements.length === 0) {
    let imageSrc = excursion.cardImage;

    if (excursion.slug.includes("salidas")) {
      imageSrc =
        "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/excursiones/salidas/salidas-5_tadnaz.webp";
    } else if (excursion.slug.includes("delfines")) {
      imageSrc =
        "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/excursiones/delfines/delfines-2_dtop9v.webp";
    }

    return (
      <section id="requisitos" className="detail-chapter scroll-mt-28 grid overflow-hidden lg:grid-cols-2">
          <div className="relative min-h-[24rem]">
            <Image
              src={imageSrc}
              alt="Paisaje submarino de la experiencia"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.035]"
            />
          </div>
          <div className="flex flex-col justify-end p-8 md:p-12">
            <h2 className="text-4xl font-bold uppercase leading-none text-white md:text-6xl">Lista para vos</h2>
            <p className="mt-6 max-w-md text-base leading-8 text-white/62">Esta experiencia se adapta al grupo y no exige requisitos adicionales antes de reservar.</p>
          </div>
      </section>
    );
  }

  const getIcon = (reqKey: string) => {
    if (reqKey.includes("minAge")) {
      return <Calendar className="h-6 w-6 text-rojo" />;
    } else if (reqKey.includes("physicalCondition")) {
      return <Activity className="h-6 w-6 text-rojo" />;
    } else if (reqKey.includes("health")) {
      return <Heart className="h-6 w-6 text-rojo" />;
    } else {
      return <Info className="h-6 w-6 text-rojo" />;
    }
  };

  return (
    <section id="requisitos" className="detail-chapter scroll-mt-28 p-7 md:p-10 lg:p-12">
        <h2 className="flex items-center gap-3 text-3xl font-bold uppercase tracking-[-.03em] text-white md:text-5xl">
          <ArrowRight className="h-8 w-8 text-rojo" />
          <FormattedMessage id="requerimientosSection.title" />
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {excursion.requirements.map((req, index) => (
            <article key={`${req.title}-${index}`} className="border-l border-white/15 pl-5">
              <div className="text-rojo">{getIcon(req.title)}</div>
              <h3 className="mt-5 text-xl font-bold text-white"><FormattedMessage id={req.title} /></h3>
              <p className="mt-3 text-sm leading-7 text-white/60"><FormattedMessage id={req.description} /></p>
            </article>
          ))}
        </div>
    </section>
  );
}

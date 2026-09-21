"use client";

import Image from "next/image";
import { Award, Globe2 } from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";
import ButtonNegro from "../ui/button-negro";
import ButtonRojo from "../ui/button-rojo";

export default function PadiSection() {
  const intl = useIntl();

  return (
    <section className="section-space overflow-hidden">
      <div className="site-container">
        <div className="grid items-stretch gap-7 lg:grid-cols-[1.02fr_.98fr]">
          <div className="relative min-h-[28rem] overflow-hidden lg:min-h-[42rem]">
            <Image
              src="https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/inicio/bautismo_fizpfd.jpg"
              alt="Buceador formándose con Madryn Buceo"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <p className="max-w-[12rem] font-display text-3xl font-bold uppercase leading-none text-white">Formación que abre el mundo</p>
              <span className="relative size-20 overflow-hidden rounded-full bg-white p-2 md:size-24">
                <Image
                  src="https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/footer/pngwing.com_1_kbr7nw.png"
                  alt="PADI"
                  fill
                  sizes="96px"
                  className="object-contain p-2"
                />
              </span>
            </div>
          </div>

          <div className="surface-panel flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <p className="eyebrow">Centro autorizado PADI</p>
            <h2 className="section-title mt-5 text-white">
              <FormattedMessage id="home.padi.subTitle" />
            </h2>
            <p
              className="mt-7 text-base leading-8 text-white/62 [&_span]:!font-semibold [&_span]:!text-rojo"
              dangerouslySetInnerHTML={{ __html: String(intl.messages["home.padi.paragraph.1"] ?? "") }}
            />
            <p
              className="mt-4 text-base leading-8 text-white/62 [&_span]:!font-semibold [&_span]:!text-rojo"
              dangerouslySetInnerHTML={{ __html: String(intl.messages["home.padi.paragraph.2"] ?? "") }}
            />

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 border border-white/10 p-4 text-sm text-white/65">
                <Award className="size-5 shrink-0 text-rojo" /> Certificación internacional
              </div>
              <div className="flex items-center gap-3 border border-white/10 p-4 text-sm text-white/65">
                <Globe2 className="size-5 shrink-0 text-rojo" /> Todos los niveles
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonRojo texto={<FormattedMessage id="home.padi.button.1" />} href="/cursos/padi" />
              <ButtonNegro texto={<FormattedMessage id="home.padi.button.2" />} href="/cursos/checkout" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { FormattedMessage, useIntl } from "react-intl";

const image = "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/buceo/GaleriaBuceo/galeria1_elkzuh.webp";

export default function IntroSection() {
  const intl = useIntl();
  const lead = intl.formatMessage({ id: "diveCertification.description2.text6.1" });
  const narrative = ["diveCertification.description2.text6.2", "diveCertification.description2.text6.3"].map((id) =>
    intl.formatMessage({ id }),
  );
  const highlights = [1, 2, 3, 4].map((number) =>
    String(intl.messages[`diveCertification.description.text${number}`] ?? ""),
  );

  return (
    <section id="descripcion" className="py-24 md:py-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow"><FormattedMessage id="diveCertification.audience" defaultMessage="Para buzos certificados" /></p>
          <h2 className="mt-5 max-w-3xl text-4xl font-bold uppercase leading-[.94] tracking-[-.04em] text-white md:text-6xl">
            <FormattedMessage id="diveCertification.description.subTitle" />
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/68">{lead}</p>
        </div>

        <div className="relative min-h-[28rem] overflow-hidden lg:col-span-7 lg:min-h-[38rem]">
          <Image
            src={image}
            alt={intl.formatMessage({ id: "diveCertification.imageAlt", defaultMessage: "Buzo certificado explorando las aguas de Puerto Madryn" })}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-transparent" />
        </div>
      </div>

      <div className="mt-14 grid gap-8 border-y border-white/14 py-10 lg:grid-cols-12 lg:gap-16">
        <p className="text-xl leading-9 tracking-[-.015em] text-white/82 lg:col-span-5">
          {narrative[0]}
        </p>
        <p className="max-w-2xl text-base leading-8 text-white/62 lg:col-span-6 lg:col-start-7">
          {narrative[1]}
        </p>
      </div>

      <div className="mt-4 grid gap-x-12 md:grid-cols-2">
        {highlights.map((highlight, index) => (
          <div key={index} className="border-t border-white/14 py-7">
            <p
              className="max-w-xl text-base leading-8 text-white/68 [&_a]:font-semibold [&_a]:text-rojo [&_a]:underline-offset-4 hover:[&_a]:underline"
              dangerouslySetInnerHTML={{ __html: highlight }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

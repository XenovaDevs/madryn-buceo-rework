"use client";

import { FormattedMessage } from "react-intl";
import ButtonRojo from "../ui/button-rojo";

const pricingOptions = [
  {
    id: "single-dive",
    option: "diveCertification.tablePrice.text",
    cost: "$ 150000",
    reserveLink: "https://madrynbuceo.outtrip.com/experiences/674f57531750a62ddd20d8fc/salidas-para-buzos-certificados-",
  },
  {
    id: "two-dives",
    option: "diveCertification.tablePrice.text2",
    cost: "$ 220000",
    reserveLink: "https://madrynbuceo.outtrip.com/experiences/682661fe810540d31a9d08cd/2-salidas-para-buzos-certificados",
  },
  {
    id: "sea-lions",
    option: "diveCertification.tablePrice.text3",
    cost: "$ 230000",
    reserveLink: "https://madrynbuceo.outtrip.com/experiences/682666f7ab220b5cafcac9fa/buceo-con-lobos-marinos",
  },
  {
    id: "sea-lions-plus",
    option: "diveCertification.tablePrice.text4",
    cost: "$ 360000",
    reserveLink: "https://madrynbuceo.outtrip.com/experiences/682672e2819c650e78093dd9/1-buceo-con-lobos-+-1-buceo-extra",
  },
  {
    id: "diving-snorkel",
    option: "diveCertification.tablePrice.text5",
    cost: "$ 250000",
    reserveLink: "https://madrynbuceo.outtrip.com/experiences/6826771a810540be359d1a07/1-buceo-+-snorkeling-con-lobos",
  },
] as const;

export default function PricingSection() {
  return (
    <section className="pb-28 pt-10 md:pb-40 md:pt-16">
      <div className="mb-12">
        <h2 className="max-w-4xl text-4xl font-bold uppercase leading-[.94] tracking-[-.04em] text-white md:text-6xl">
          <FormattedMessage id="diveCertification.tablePrice.title" />
        </h2>
        <p className="mt-7 max-w-2xl text-base leading-8 text-white/60">
          <FormattedMessage id="diveCertification.tablePrice.intro" defaultMessage="Elegí la salida que mejor encaje con tu viaje. Todos los valores se muestran en pesos argentinos y la reserva se confirma en Outtrip." />
        </p>
      </div>

      <div className="grid grid-flow-dense gap-1 bg-white/10 lg:grid-cols-12">
        {pricingOptions.map((item, index) => (
          <article
            key={item.id}
            className={`group flex min-h-[17rem] flex-col justify-between bg-[#111416] p-7 transition-colors duration-300 hover:bg-[#171b1d] md:p-9 ${index < 2 ? "lg:col-span-6" : "lg:col-span-4"}`}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-rojo"><FormattedMessage id="diveCertification.tablePrice.departure" defaultMessage="Salida" /></p>
              <h3 className="mt-8 max-w-md text-2xl font-bold uppercase leading-[1.03] tracking-[-.025em] text-white md:text-3xl">
                <FormattedMessage id={item.option} />
              </h3>
            </div>
            <div className="mt-12 flex flex-col gap-6 border-t border-white/12 pt-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="font-mono text-2xl font-semibold tabular-nums text-white">{item.cost}</p>
              <ButtonRojo texto={<FormattedMessage id="book" />} href={item.reserveLink} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

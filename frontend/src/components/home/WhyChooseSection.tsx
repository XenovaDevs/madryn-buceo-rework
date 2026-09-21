"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Anchor, Clock3, Heart, ShieldCheck, ThumbsUp, Users } from "lucide-react";
import { FormattedMessage } from "react-intl";
import ButtonRojo from "../ui/button-rojo";

const features = [
  { icon: Clock3, title: "home.whychoose.feature1.title", description: "home.whychoose.feature1.description" },
  { icon: Users, title: "home.whychoose.feature2.title", description: "home.whychoose.feature2.description" },
  { icon: ShieldCheck, title: "home.whychoose.feature3.title", description: "home.whychoose.feature3.description" },
  { icon: ThumbsUp, title: "home.whychoose.feature4.title", description: "home.whychoose.feature4.description" },
  { icon: Heart, title: "home.whychoose.feature5.title", description: "home.whychoose.feature5.description" },
  { icon: Anchor, title: "home.whychoose.feature6.title", description: "home.whychoose.feature6.description" },
];

const credentials = [
  { value: "1983", label: "home.whychoose.stat1" },
  { value: "2", label: "home.whychoose.stat2" },
  { value: "12", label: "home.whychoose.stat3" },
  { value: "PADI", label: "home.whychoose.stat4" },
];

export default function WhyChooseSection() {
  return (
    <section className="section-space border-y border-white/10 bg-[#111416]">
      <div className="site-container">
        <div className="max-w-6xl">
          <p className="eyebrow">Una historia en el agua</p>
          <h2 className="section-title mt-5 max-w-[22ch] text-white">
            <FormattedMessage id="home.whychoose.title" />
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-8 text-white/58">
            <FormattedMessage id="home.whychoose.description" />
          </p>
        </div>

        <div className="mt-14 grid gap-3 lg:grid-cols-[1.42fr_.58fr]">
          <div className="relative min-h-[28rem] overflow-hidden lg:min-h-[35rem]">
            <Image
              src="https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/nosotros/terranovaa_lsleg4.webp"
              alt="Equipo de Madryn Buceo navegando en el Golfo Nuevo"
              fill
              sizes="(max-width: 1024px) 100vw, 68vw"
              className="object-cover grayscale-[12%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-end sm:p-9">
              <p className="max-w-lg font-display text-3xl font-bold uppercase leading-[.98] tracking-[-.025em] text-white md:text-4xl">
                <FormattedMessage id="home.whychoose.visualCaption" defaultMessage="Conocemos este mar porque crecimos en él." />
              </p>
              <ButtonRojo texto={<FormattedMessage id="home.whychoose.button" />} href="https://madrynbuceo.outtrip.com/" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/10">
            {credentials.map((credential, index) => (
              <div
                key={credential.label}
                className={`flex min-h-40 flex-col justify-between p-6 sm:p-8 lg:min-h-0 ${index === 0 ? "bg-rojo" : "bg-[#0c0f10]"}`}
              >
                <span className={`text-[.62rem] font-bold uppercase tracking-[.18em] ${index === 0 ? "text-white/65" : "text-rojo"}`}>
                  0{index + 1}
                </span>
                <div>
                  <p className="font-display text-4xl font-bold uppercase tracking-[-.035em] text-white sm:text-5xl">
                    {credential.value}
                  </p>
                  <p className={`mt-2 text-[.68rem] font-bold uppercase leading-5 tracking-[.14em] ${index === 0 ? "text-white/78" : "text-white/45"}`}>
                    <FormattedMessage id={credential.label} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-14 grid gap-px border-y border-white/10 bg-white/10 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {features.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              className="group grid gap-5 bg-[#111416] px-5 py-8 sm:grid-cols-[3.25rem_1fr] sm:px-7 sm:py-10 lg:px-9"
              variants={{ hidden: { opacity: 0, x: 18 }, visible: { opacity: 1, x: 0 } }}
            >
              <span className="grid size-12 place-items-center border border-white/15 text-rojo transition-colors group-hover:border-rojo group-hover:bg-rojo group-hover:text-white">
                <Icon className="size-5" strokeWidth={1.7} aria-hidden />
              </span>
              <div>
                <p className="text-[.6rem] font-bold uppercase tracking-[.18em] text-white/30">0{index + 1}</p>
                <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-none text-white md:text-3xl">
                  <FormattedMessage id={title} />
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
                  <FormattedMessage id={description} />
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

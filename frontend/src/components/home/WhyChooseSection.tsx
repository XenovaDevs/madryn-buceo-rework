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

export default function WhyChooseSection() {
  return (
    <section className="section-space border-y border-white/10 bg-[#111416]">
      <div className="site-container grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Una historia en el agua</p>
          <h2 className="section-title mt-5 text-white">
            <FormattedMessage id="home.whychoose.title" />
          </h2>
          <p className="mt-7 max-w-xl text-sm leading-7 text-white/58 md:text-base md:leading-8">
            <FormattedMessage id="home.whychoose.description" />
          </p>

          <div className="relative mt-9 aspect-[5/3] overflow-hidden">
            <Image
              src="https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/nosotros/terranovaa_lsleg4.webp"
              alt="Equipo de Madryn Buceo navegando en el Golfo Nuevo"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover grayscale-[18%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="absolute bottom-4 left-4 bg-[#a80f17] px-3 py-2 text-xs font-extrabold uppercase tracking-[.15em] text-white">Desde 1983</span>
          </div>

          <div className="mt-7">
            <ButtonRojo texto={<FormattedMessage id="home.whychoose.button" />} href="https://madrynbuceo.outtrip.com/" />
          </div>
        </div>

        <motion.div
          className="divide-y divide-white/10 border-y border-white/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {features.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              className="group grid gap-4 py-7 sm:grid-cols-[3rem_1fr] sm:py-9"
              variants={{ hidden: { opacity: 0, x: 18 }, visible: { opacity: 1, x: 0 } }}
            >
              <span className="grid size-11 place-items-center border border-white/15 text-rojo transition-colors group-hover:border-rojo group-hover:bg-rojo group-hover:text-white">
                <Icon className="size-5" strokeWidth={1.7} />
              </span>
              <div>
                <p className="text-[.6rem] font-bold uppercase tracking-[.18em] text-white/30">0{index + 1}</p>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase text-white md:text-3xl">
                  <FormattedMessage id={title} />
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/55">
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

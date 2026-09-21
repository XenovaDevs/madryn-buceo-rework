"use client";

import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { excursiones } from "@/lib/data/Excursiones";
import ExcursionCard from "../excursiones/ExcursionCard";

export default function ActivitySection() {
  return (
    <section className="section-space relative" id="actividades">
      <div className="site-container">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="eyebrow">Experiencias en el Golfo Nuevo</p>
            <h2 className="section-title mt-5 max-w-[10ch] text-white">
              <FormattedMessage id="home.activity.title" />
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-white/58 lg:col-span-5 lg:col-start-8 lg:justify-self-end">
            <FormattedMessage id="home.activity.description" /> Elegí cómo querés conocer un mar que cambia con cada estación.
          </p>
        </div>

        <motion.div
          className="mt-14 grid items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {excursiones.slice(0, 3).map((excursion, index) => (
            <motion.div
              key={excursion.slug}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
              }}
            >
              <ExcursionCard
                title={excursion.title}
                description={excursion.miniDescription}
                image={excursion.cardImage}
                link={`/excursiones/${excursion.slug}`}
                slug={excursion.slug}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

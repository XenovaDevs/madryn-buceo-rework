"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import { reseñas } from "@/lib/data/Reseñas";

export default function ReseñasSection() {
  const intl = useIntl();

  return (
    <section className="section-space border-t border-white/10 bg-[#111416]">
      <div className="site-container">
        <div className="grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="eyebrow">Experiencias verificadas</p>
            <h2 className="section-title mt-5 max-w-[22ch] text-white">
              <FormattedMessage id="home.reseñas.title" />
            </h2>
          </div>
          <Link
            href="https://www.google.com/search?q=madryn+buceo"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 items-center gap-3 text-xs font-extrabold uppercase tracking-[.12em] text-white"
          >
            <Image src="https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/inicio/google_bx9cwm.png" alt="Google" width={22} height={22} />
            <FormattedMessage id="home.reseñas.button" />
            <ArrowUpRight className="size-4 text-rojo transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <motion.div
          className="mt-14 grid items-stretch gap-7 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {reseñas.map((review, index) => (
            <motion.article
              key={review.id}
              className="relative flex min-h-[22rem] flex-col border border-white/10 bg-[#111416] p-7 md:p-9"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <Quote className="absolute right-7 top-7 size-10 text-rojo/20" />
              <div className="flex gap-1 text-[#f2bd4d]" role="img" aria-label={`${review.rating} de 5 estrellas`}>
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star key={star} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-7 flex-1 text-base leading-8 text-white/72">
                “<FormattedMessage id={review.text} />”
              </blockquote>
              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
                <Image
                  src={review.image}
                  alt=""
                  width={42}
                  height={42}
                  className="size-10 rounded-sm object-cover"
                />
                <div>
                  <p className="font-display text-lg font-bold uppercase text-white"><FormattedMessage id={review.name} /></p>
                  <p className="text-[.65rem] uppercase tracking-[.12em] text-white/38">{intl.formatMessage({ id: review.date })} · Google</p>
                </div>
              </div>
              <span className="absolute bottom-7 right-7 font-display text-lg font-bold text-white/12">0{index + 1}</span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

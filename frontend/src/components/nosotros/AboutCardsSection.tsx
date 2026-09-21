"use client";

import Image from "next/image";
import { FormattedMessage } from "react-intl";

const stories = [
  {
    number: "01",
    title: "our.store",
    description: "our.store2",
    media: "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/nosotros/GaleriaLocal/galeriaLocal2_nxa28x.webp",
    type: "image",
  },
  {
    number: "02",
    title: "our.history",
    description: "our.history2",
    media: "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/videos/nosotros/docu_wtmto4.mp4",
    type: "video",
  },
  {
    number: "03",
    title: "our.staff",
    description: "our.staff2",
    media: "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/nosotros/staff_nrcxj9.jpg",
    type: "image",
  },
] as const;

export function AboutCardsSection() {
  return (
    <section className="section-space">
      <div className="site-container">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_.75fr]">
          <div>
            <p className="eyebrow">Dos generaciones, un mismo mar</p>
            <h2 className="section-title mt-5 max-w-[12ch] text-white">Nuestra forma de vivir el buceo</h2>
          </div>
          <p className="text-base leading-8 text-white/55">El centro de buceo más antiguo de la zona sigue siendo una casa abierta para quienes quieren conocer el Golfo Nuevo.</p>
        </div>

        <div className="mt-14 space-y-8">
          {stories.map((story, index) => (
            <article key={story.title} className="grid overflow-hidden border border-white/10 bg-[#0d1011] lg:grid-cols-2">
              <div className={`relative min-h-[24rem] overflow-hidden ${index % 2 ? "lg:order-2" : ""}`}>
                {story.type === "image" ? (
                  <Image src={story.media} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                ) : (
                  <video controls preload="metadata" className="size-full object-cover" aria-label="Documental sobre la historia de Madryn Buceo">
                    <source src={story.media} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <span className="font-display text-2xl font-bold text-rojo">{story.number}</span>
                <h3 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl"><FormattedMessage id={story.title} /></h3>
                <p className="mt-6 whitespace-pre-line text-sm leading-7 text-white/58 md:text-base md:leading-8"><FormattedMessage id={story.description} /></p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

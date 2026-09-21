"use client"

import { excursiones } from "@/lib/data/Excursiones"
import { Excursion } from "@/lib/data/Excursiones"
import ExcursionCard from "./ExcursionCard"
import { FormattedMessage } from "react-intl"

interface OtrasExcursioesSectionProps {
  excursion: Excursion
}

export default function OtrasExcursioesSection({ excursion }: OtrasExcursioesSectionProps) {
  return (
    <section className="border-t border-white/10 bg-negro-secundario py-28 md:py-36">
      <div className="site-container">
        <h2 className="max-w-3xl text-4xl font-bold uppercase leading-none text-white md:text-6xl">
          <FormattedMessage id="otrasExcursionesSection.title" />
        </h2>
        <div className="mt-12 grid items-stretch gap-7 md:grid-cols-2 lg:grid-cols-[1.2fr_.9fr_.9fr]">
          {excursiones
            .filter((e) => e.slug !== excursion.slug)
            .slice(0, 3)
            .map((relatedExcursion, key) => (
              <ExcursionCard
                key={key}
                title={relatedExcursion.title} 
                description={relatedExcursion.miniDescription}
                image={relatedExcursion.cardImage}
                link={`/excursiones/${relatedExcursion.slug}`}
                slug={relatedExcursion.slug}
                bg={true}
              />
            ))}
        </div>
      </div>
    </section>
  )
}

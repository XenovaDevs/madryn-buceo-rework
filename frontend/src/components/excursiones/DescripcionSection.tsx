"use client"

import ButtonRojo from "@/components/ui/button-rojo"
import { FormattedMessage, useIntl } from "react-intl"
import { ScrubText } from "@/components/detail/DetailMotion"

interface DescripcionSectionProps {
  slug: string
  description: string[]
}

export default function DescripcionSection({ slug, description }: DescripcionSectionProps) {
  const intl = useIntl()
  const [lead, ...rest] = description.map((key) => intl.formatMessage({ id: key }))
  const isBaptism = slug === "bautismo-buceo"
  const supportingCopy = isBaptism ? rest.slice(0, -1) : rest
  const nextStepCopy = isBaptism ? rest.at(-1) : null

  return (
    <section id="descripcion" className="scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto max-w-4xl text-center text-4xl font-bold uppercase leading-[.95] tracking-[-.04em] text-white md:text-6xl">
          <FormattedMessage id="descripcionSection.title" />
        </h2>
        <ScrubText text={lead} className="mx-auto mt-10 max-w-5xl text-center text-[clamp(1.35rem,2.45vw,2.5rem)] font-medium leading-[1.3] tracking-[-.025em] text-white" />

        {supportingCopy.length > 0 ? (
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 border-t border-white/12 pt-10 text-base leading-8 text-white/66 md:grid-cols-2 md:gap-14">
            {supportingCopy.map((text, index) => <p key={`${text}-${index}`}>{text}</p>)}
          </div>
        ) : null}

        {isBaptism && nextStepCopy ? (
          <div className="mx-auto mt-12 grid max-w-5xl gap-7 border-l-2 border-rojo bg-[#111416] p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9">
            <p className="max-w-2xl text-base leading-8 text-white/68">{nextStepCopy}</p>
            <ButtonRojo texto={<FormattedMessage id="descripcionSection.button.discoverScubaDiving" />} href="/cursos/padi/discover-scuba-diving" />
          </div>
        ) : null}
      </div>
    </section>
  )
}

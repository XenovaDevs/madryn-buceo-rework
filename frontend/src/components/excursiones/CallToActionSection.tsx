"use client"

import ButtonRojo from "@/components/ui/button-rojo"
import { FormattedMessage } from "react-intl"

interface CallToActionSectionProps {
  callToAction: { text: string; href: string }
  buttonText: string 
}

export default function CallToActionSection({ callToAction, buttonText }: CallToActionSectionProps) {
  return (
    <div id="reservar" className="border border-rojo bg-rojo p-8 text-center shadow-[0_24px_70px_rgba(100,0,0,.2)] md:p-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-4xl font-bold uppercase leading-none text-white md:text-5xl">
          <FormattedMessage id="hero.button.bookNow" />
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white">
          <FormattedMessage id={callToAction.text} />
        </p>
      </div>
      <div className="mt-7">
        <ButtonRojo onAccent texto={<FormattedMessage id={buttonText} />} href={callToAction.href} />
      </div>
    </div>
  )
}

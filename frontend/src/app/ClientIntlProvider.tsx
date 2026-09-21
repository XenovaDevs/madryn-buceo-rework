"use client"

import { IntlProvider } from "react-intl"
import es from "@/app/locales/es.json"
import en from "@/app/locales/en.json"
import { useEffect, useState } from "react"

const messages = { es, en }

export default function ClientIntlProvider({
  children,
  locale = "es",
}: {
  children: React.ReactNode
  locale?: "es" | "en"
}) {
  const [currentLocale, setCurrentLocale] = useState(locale)

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale") || locale
    if (storedLocale !== currentLocale) {
      const frame = requestAnimationFrame(() => setCurrentLocale(storedLocale as "es" | "en"))
      return () => cancelAnimationFrame(frame)
    }
  }, [locale, currentLocale])

  return (
    <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
      {children}
    </IntlProvider>
  )
}

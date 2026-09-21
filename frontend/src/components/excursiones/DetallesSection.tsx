"use client"

import { Clock, Users, LifeBuoy, Award, Fish, UserPlus, Anchor, Star, Shuffle, Map, ThumbsUp, User, ArrowRight } from "lucide-react"
import { FormattedMessage } from "react-intl"
import type { ExcursionDetail } from "@/lib/data/Excursiones"

interface DetallesSectionProps {
  details: ExcursionDetail[]
}

export default function DetallesSection({ details }: DetallesSectionProps) {
  const getIcon = (detail: ExcursionDetail) => {
    if (detail.icon) {
      switch (detail.icon.toLowerCase()) {
        case "clock":
          return <Clock className="h-6 w-6 text-rojo" />
        case "users":
          return <Users className="h-6 w-6 text-rojo" />
        case "lifebuoy":
          return <LifeBuoy className="h-6 w-6 text-rojo" />
        case "award":
          return <Award className="h-6 w-6 text-rojo" />
        case "fish":
          return <Fish className="h-6 w-6 text-rojo" />
        case "userplus":
          return <UserPlus className="h-6 w-6 text-rojo" />
        case "anchor":
          return <Anchor className="h-6 w-6 text-rojo" />
        case "star":
          return <Star className="h-6 w-6 text-rojo" />
        case "shuffle":
          return <Shuffle className="h-6 w-6 text-rojo" />
        case "map":
          return <Map className="h-6 w-6 text-rojo" />
        case "thumbsup":
          return <ThumbsUp className="h-6 w-6 text-rojo" />
        case "user":
          return <User className="h-6 w-6 text-rojo" />
        default:
          return <Award className="h-6 w-6 text-rojo" />
      }
    }

    return <Award className="h-6 w-6 text-rojo" />
  }

  return (
    <section id="detalles" className="detail-chapter scroll-mt-28 p-7 md:p-10 lg:p-12">
        <h2 className="flex items-center gap-3 text-3xl font-bold uppercase tracking-[-.03em] text-white md:text-5xl">
          <ArrowRight className="h-8 w-8 text-rojo" />
          <FormattedMessage id="detallesSection.title" />
        </h2>
        <div className="mt-10 grid gap-x-12 gap-y-9 md:grid-cols-2">
          {details.map((detail, index) => (
            <article key={`${detail.title}-${index}`} className="grid grid-cols-[auto_1fr] items-start gap-4 border-l border-white/15 pl-5">
              <div className="mt-0.5 flex-shrink-0">{getIcon(detail)}</div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-white">
                  <FormattedMessage id={detail.title} />
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/60">
                  <FormattedMessage id={detail.description} />
                </p>
              </div>
            </article>
          ))}
        </div>
    </section>
  )
}

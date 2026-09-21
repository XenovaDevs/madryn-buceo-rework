"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cursos, allCursos } from "@/lib/data/Cursos";
import { useIntl, FormattedMessage } from "react-intl";
import { SharedDetailTransition } from "@/components/detail/SharedDetailTransition";

const filters = [
  ["todos", "cursos.filters.todos"],
  ["cursos.filters.iniciacion", "cursos.filters.iniciacion"],
  ["cursos.filters.avanzados", "cursos.filters.avanzados"],
  ["cursos.filters.profesional", "cursos.filters.profesional"],
] as const;

export default function CursoFiltro() {
  const intl = useIntl();
  const [activeFilter, setActiveFilter] = useState<string>("todos");
  const filteredCursos = activeFilter === "todos" ? allCursos : cursos[activeFilter as keyof typeof cursos] || [];

  return (
    <section className="section-space w-full">
      <div className="grid items-end gap-7 md:grid-cols-[1fr_auto]">
        <div>
          <p className="eyebrow">Ruta de formación</p>
          <h2 className="section-title mt-5 text-white"><FormattedMessage id="cursos.section.title" /></h2>
          <p className="mt-5 text-white/55"><FormattedMessage id="cursos.section.subtitle" /></p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar cursos por nivel">
          {filters.map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setActiveFilter(value)}
              aria-pressed={activeFilter === value}
              className={`min-h-11 border px-4 text-[.68rem] font-extrabold uppercase tracking-[.12em] transition-colors ${activeFilter === value ? "border-rojo bg-rojo text-white" : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"}`}
            >
              <FormattedMessage id={label} />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
        {filteredCursos.map((course, index) => (
          <article key={course.slug} className="group flex h-full flex-col border border-white/10 bg-[#111416]">
            <Link href={`/cursos/padi/${course.slug}`} className="relative block aspect-[4/3] overflow-hidden">
              <SharedDetailTransition id={`course-${course.slug}`} role="image">
                <Image src={course.cardImage} alt={intl.formatMessage({ id: course.title })} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </SharedDetailTransition>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 border border-white/25 bg-black/35 px-3 py-1.5 text-[.6rem] font-bold uppercase tracking-[.16em] text-white backdrop-blur-sm"><FormattedMessage id={course.level} /></span>
            </Link>
            <div className="flex flex-1 flex-col p-6 md:p-7">
              <span className="text-[.6rem] font-bold uppercase tracking-[.18em] text-white/28">Curso 0{index + 1}</span>
              <SharedDetailTransition id={`course-${course.slug}`} role="title">
                <h3 className="mt-2 min-h-[3.75rem] font-display text-3xl font-bold uppercase leading-none text-white"><FormattedMessage id={course.title} /></h3>
              </SharedDetailTransition>
              <SharedDetailTransition id={`course-${course.slug}`} role="description">
                <p className="mt-4 flex-1 text-sm leading-7 text-white/55"><FormattedMessage id={course.shortDescription} /></p>
              </SharedDetailTransition>
              <Link href={`/cursos/padi/${course.slug}`} className="mt-6 flex min-h-11 items-center justify-between border-t border-white/10 pt-5 text-xs font-extrabold uppercase tracking-[.11em] text-white">
                <FormattedMessage id="cursos.button.details" />
                <span className="grid size-9 place-items-center bg-rojo"><ArrowUpRight className="size-4" /></span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

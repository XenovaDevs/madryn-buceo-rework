"use client";

import { Award, Briefcase, Check, Package, type LucideIcon } from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";
import { DetailStack, ScrubText } from "@/components/detail/DetailMotion";

interface CourseDescriptionProps {
  description: string;
  learningOutcomes?: string[];
  includes?: string[];
  qualifications?: string[];
}

function CourseChapter({ titleId, defaultTitle, items, icon: Icon }: { titleId: string; defaultTitle: string; items: string[]; icon: LucideIcon }) {
  return (
    <section className="detail-chapter p-7 md:p-10 lg:p-12">
      <div className="flex items-start gap-4">
        <Icon className="mt-1 size-7 shrink-0 text-rojo" strokeWidth={1.7} aria-hidden />
        <h2 className="max-w-4xl text-3xl font-bold uppercase leading-[.95] tracking-[-.035em] text-white md:text-5xl">
          <FormattedMessage id={titleId} defaultMessage={defaultTitle} />
        </h2>
      </div>
      <div className="mt-12 grid gap-x-14 md:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="grid grid-cols-[auto_1fr] gap-4 border-t border-white/12 py-6">
            <Check className="mt-1 size-5 text-rojo" strokeWidth={2} aria-hidden="true" />
            <p className="text-base leading-7 text-white/68"><FormattedMessage id={item} /></p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CourseDescription({ description, learningOutcomes, includes, qualifications }: CourseDescriptionProps) {
  const intl = useIntl();
  const chapters = [
    learningOutcomes?.length ? <CourseChapter key="learning" titleId="cursos.learningOutcomes.title" defaultTitle="Lo que aprenderás" items={learningOutcomes} icon={Award} /> : null,
    includes?.length ? <CourseChapter key="includes" titleId="cursos.includes.title" defaultTitle="Qué incluye" items={includes} icon={Package} /> : null,
    qualifications?.length ? <CourseChapter key="qualifications" titleId="cursos.qualifications.title" defaultTitle="Tu certificación te permite" items={qualifications} icon={Briefcase} /> : null,
  ].filter(Boolean);

  return (
    <>
      <section className="py-28 md:py-36">
        <h2 className="max-w-3xl text-4xl font-bold uppercase leading-[.95] tracking-[-.04em] text-white md:text-6xl">
          <FormattedMessage id="cursos.description.title" defaultMessage="Descripción" />
        </h2>
        <ScrubText text={intl.formatMessage({ id: description })} className="mt-10 max-w-6xl whitespace-pre-line text-[clamp(1.4rem,2.55vw,2.65rem)] font-medium leading-[1.3] tracking-[-.025em] text-white" />
      </section>

      {chapters.length ? (
        <section className="pb-28 md:pb-40">
          <DetailStack>{chapters}</DetailStack>
        </section>
      ) : null}
    </>
  );
}
